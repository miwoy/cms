const mongo = require("lib/service/mongo")
const objectId = require('mongodb').ObjectId;
const fs = require("fs");
const path = require("path");
const moment = require("moment-timezone")
const uuid = require("uuid")
const YAML = require("yamljs")
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

        let space = 2
        let isService = false
        let serviceNames = []
        site.dockerCompose = site.dockerCompose.split("\n").map(row => {
            if (row && row.trim()[0] != "#" && row.slice(0, space) != "  ") isService = false
            if (row.trimEnd() == "services:") isService = true
            if (isService && new RegExp(`^\\s{${space}}\\w+:$`).test(row.trimEnd())) {
                row = row.replace(/(\w+:)/, dirname + "-$1")
                serviceNames.push(row.trim().slice(0,-1))
            }
            return row
        }).join("\n")

        // 释放配置文件
        let etcd = {
            ".env": "\n",
            "before_post.sh": "\n" +
                ". ./.env\n" +
                "error_exit() {\n" +
                "    echo \"$1\" 1>&2\n" +
                "    exit 1\n" +
                "}\n",
            "after_post.sh": "\n" +
                ". ./.env\n" +
                "error_exit() {\n" +
                "    echo \"$1\" 1>&2\n" +
                "    exit 1\n" +
                "}\n",
            "install.sh": "\n" +
                "#!/bin/bash\n" +
                "\n" +
                ". ./.env\n" +
                "\n" +
                "error_exit() {\n" +
                "    echo \"$1\" 1>&2\n" +
                "    exit 1\n" +
                "}\n" +
                "\n" +
                "\n" +
                "echo \"重启容器\"\n" +
                `docker-compose up  -d --force-recreate ${services.map(ser=>dirname + "-" + ser.name).filter(name=>serviceNames.includes(name)).join(" ")} || error_exit \"启动容器失败\"\n` +
                "\n" +
                "echo \"清理空镜像\"\n" +
                "docker image prune -f > /dev/null 2>&1\n" +
                "\n" +
                "echo \"完成\"\n" +
                "exit 0\n",
            "docker-compose.yml": site.dockerCompose
        }

        // 注入本地导出的服务信息 环境变量
        for (let service of services) {
            etcd[".env"] += `\n# ${service.name}\n`
            etcd[".env"] += `${service.name}_version=${service.version}\n`
            etcd[".env"] += `${service.name}_image=${service.image}\n`
            etcd[".env"] += `${service.name}_container_name=${site.name}-${env.name}-${service.name}\n`
            etcd[".env"] += `${service.name}_port=${(service.etcd.port?service.etcd.port+":" : "") + service.defaultPort}\n`
            etcd[".env"] += (service.appconf || "") + "\n" + service.etcd["env"] + "\n"
        }

        // 注入环境与站点 环境变量。SITE与appid等价，为了兼容
        etcd[".env"] += `env=${env.name}\n`
        etcd[".env"] += `SITE=${site.name}\n`
        etcd[".env"] += `appid=${site.name}\n`
        etcd[".env"] += `servicePrefix=${dirname}\n`

        // 附加站点级别环境变量配置
        etcd[".env"] += site.env + "\n"

        await pushLog("开始构建批量部署包内项目部署文件")
        await x.eachSync(services, async (service, i) => {
            let imageName = `./${service.name}@${service.version}.tar.gz` // 镜像文件

            etcd["before_post.sh"] += (service.beforePost || "") + "\n" + (service.etcd["beforePost"] || "") + "\n"
            etcd["after_post.sh"] += (service.afterPost || "") + "\n" + (service.etcd["afterPost"] || "") + "\n"

            if (task.onlyEtcd) return
            etcd["before_post.sh"] += "\n" +
            `echo "加载镜像「${imageName}」"\n` +
            `docker load < ./${path.join("images", imageName)} || error_exit "加载镜像文件失败"\n`
            if (service.type == "REPO") {
                await execAsyncAndLog(pushLog, `${service.auth && service.auth.username && service.auth.password?`docker logout && docker login -u ${service.auth.username} -p ${service.auth.password} chaozhou-docker.pkg.coding.net &&`:""} docker pull ${service.image}:${service.version}`, {
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


        fs.writeFileSync(path.join(filepath, "install.sh"), etcd["install.sh"])
        fs.writeFileSync(path.join(filepath, "docker-compose.yml"), etcd["docker-compose.yml"])
        fs.writeFileSync(path.join(filepath, ".env"), etcd[".env"])
        fs.writeFileSync(path.join(filepath, "after_post.sh"), etcd["after_post.sh"])
        fs.writeFileSync(path.join(filepath, "before_post.sh"), etcd["before_post.sh"])

        // 部署包内容说明配置
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