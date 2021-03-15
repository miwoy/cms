const mongo = require("lib/service/mongo")
const objectId = require('mongodb').ObjectId;
const fs = require("fs");
const path = require("path");
const moment = require("moment-timezone")
const uuid = require("uuid")
const os = require("os")
const {
    execAsync,
    execFileAsync,
    convertCode2Dot,
    convertDot2Code
} = require("lib/common/util");
const {
    x
} = require("lib/common")

let taskPushLog = async (taskId, content) => {
    await mongo.run("server", async db => {
        return await db.collection("task").updateOne({
            _id: objectId(taskId)
        }, {
            $push: {
                log: _.isArray(content) ? {
                    $each: content
                } : content
            }
        })
    })
}

/**
 * 批量导出部署文件
 */
async function buildGroup(task, site, env, services) {
    let datetime = moment.tz("Asia/Shanghai").format("YYYYMMDDHHmmss")
    let dirname = `${site.name}-${env.name}`
    let filename = `${datetime}-${dirname}.tar.gz`
    let downloadDir = path.join(process.cwd(), conf.downloadDir) // store
    let tmpDir = os.tmpdir()
    let workDir = path.join(tmpDir, uuid.v4())
    let filepath = path.join(workDir, dirname)
    let imageDirName = "images"
    let imageDirPath = path.join(filepath, imageDirName)

    let pushLog = (log) => {
        return taskPushLog(task._id, _.isArray(log) ? log.map(l => `(批量部署包):${l}`) : `(批量部署包):${log}`)
    }

    let pushErr = (err) => {
        return taskPushLog(task._id, `(批量部署包): <span style="color: red">${err}</span>`)
    }

    try {
        await pushLog("创建工作目录")
        await execAsyncAndLog(pushLog, `mkdir ${workDir}`, {
            cwd: tmpDir
        })
        await execAsyncAndLog(pushLog, `mkdir ${filepath}`, {
            cwd: tmpDir
        })
        await execAsyncAndLog(pushLog, `mkdir ${imageDirPath}`, {
            cwd: tmpDir
        })

        // 释放配置文件
        let etcd = {
            ".env": site.env + "\n",
            "before_post.sh": `
. ./.env
error_exit() {
    echo "$1" 1>&2
    exit 1
}
            `,
            "after_post.sh": `
. ./.env
error_exit() {
    echo "$1" 1>&2
    exit 1
}
            `,
            "install.sh": `
#!/bin/bash

. ./.env

error_exit() {
    echo "$1" 1>&2
    exit 1
}


echo "销毁历史容器"
docker-compose down 2>&1

echo "启动新容器"
docker-compose up -d || error_exit "启动容器失败"

echo "清理空镜像"
docker image prune -f > /dev/null 2>&1

echo "完成"
exit 0
            `,
            "docker-compose.yml": site.dockerCompose
        }

        await pushLog("开始构建批量部署包内项目部署文件")
        await x.each(services, async (service, i) => {
            let imageName = `./${service.name}@${service.version}.tar.gz` // 镜像文件
            etcd["before_post.sh"] += `
echo "加载镜像「${imageName}」"
docker load < ./${path.join("images", imageName)} || error_exit "加载镜像文件失败"\n
            `
            etcd["before_post.sh"] += (service.beforePost || "") + "\n" + (service.etcd["beforePost"] || "") + "\n"
            etcd["after_post.sh"] += (service.afterPost || "") + "\n" + (service.etcd["afterPost"] || "") + "\n"
            if (service.type == "REPO") {
                await execAsyncAndLog(pushLog, `${service.auth && service.auth.username && service.auth.password?`docker login -u ${service.auth.username} -p ${service.auth.password} chaozhou-docker.pkg.coding.net &&`:""} docker pull ${service.image}:${service.version}`, {
                    cwd: imageDirPath
                }, function (childProcess) {
                    childProcess.stdout.on('data', (data) => {
                        pushLog(`${data}`);
                    });
                })

                await execAsyncAndLog(pushLog, `docker save ${service.image}:${service.version}  | gzip > ${imageName}`, {
                    cwd: imageDirPath
                }, function (childProcess) {
                    childProcess.stdout.on('data', (data) => {
                        pushLog(`${data}`);
                    });
                })
            } else {
                await execAsyncAndLog(pushLog, `curl -L -u ${service.auth && service.auth.username && service.auth.password?`${service.auth.username}:${service.auth.password}`:""} ${service.imageUrl}?version=${service.version} -o ${imageName}`, {
                    cwd: imageDirPath
                }, function (childProcess) {
                    childProcess.stdout.on('data', (data) => {
                        pushLog(`${data}`);
                    });
                })
            }
        })

        for (let service of services) {
            
            etcd[".env"] += `\n# ${service.name}\n`
            etcd[".env"] += `${service.name}_version=${service.version}\n`
            etcd[".env"] += `${service.name}_image=${service.image}\n`
            etcd[".env"] += `${service.name}_container_name=${site.name}-${env.name}-${service.name}\n`
            etcd[".env"] += `${service.name}_port=${(service.etcd.port?service.etcd.port+":" : "") + service.defaultPort}\n`
            etcd[".env"] += (service.appconf || "") + "\n" + service.etcd["env"] + "\n"
           
        }

        etcd[".env"] += `env=${env.name}\n`
        etcd[".env"] += `SITE=${site.name}\n`
        etcd[".env"] += `appid=${site.name}\n`

        fs.writeFileSync(path.join(filepath, "install.sh"), etcd["install.sh"])
        fs.writeFileSync(path.join(filepath, "docker-compose.yml"), etcd["docker-compose.yml"])
        fs.writeFileSync(path.join(filepath, ".env"), etcd[".env"])
        fs.writeFileSync(path.join(filepath, "after_post.sh"), etcd["after_post.sh"])
        fs.writeFileSync(path.join(filepath, "before_post.sh"), etcd["before_post.sh"])
        fs.writeFileSync(path.join(filepath, "config.json"), JSON.stringify({
            services: task.services,
            site: site,
            env: env,
            hash: task.hash
        }))
        await execAsyncAndLog(pushLog, `cp -aR ./etcd ${filepath}/`)
        await execAsyncAndLog(pushLog, `tar -zcf - ${dirname} | openssl des3 -md sha256 -salt -k ${conf.secret}${filename} -out ${downloadDir}/${filename}`, {
            cwd: workDir
        })

        pushLog("批量部署包构建完成.")
    } catch (err) {
        pushErr(err.message)
        throw err
    } finally {
        execAsync(`rm -rf ${workDir}`)
    }

    return path.join(conf.downloadDir, filename)
}

async function execAsyncAndLog(logger, ...args) {
    logger(args[0])
    await execAsync(...args)
}

module.exports = {
    buildGroup
}