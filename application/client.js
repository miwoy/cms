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

function convertT2J(text) {
    return text.split("\n").reduce((acc, cur) => {
        if (cur[0] && cur[0] !== "#")
            acc[cur.split("=")[0]] = cur.split("=").slice(1).join("=")
        return acc
    }, {})
}

function convertJ2T(json) {
    return _.keys(json).map(key => {
        return key + "=" + json[key]
    }).join("\n")
}

let taskPushLog = async (taskId, content) => {
    await mongo.run("client", async db => {
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
 * 批量部署
 */
async function deployGroup(task, file) {
    if (!conf.deployDir) throw new Error("未配置部署目录")
    file.name = file.name.replace(/ \(\d+\)/, "")
    file.path = file.path.replace(/(\s+)(\(\d)(\))/g, '\\$1\\$2\\$3')
    let now = Date.now()
    let workDir = conf.deployDir
    let filename = file.name.split(".")[0].split("-").slice(1).join("-")
    let filepath = path.join(workDir, filename)
    taskPushLog(task._id, "创建临时目录")
    let pushLog = (log) => {
        return taskPushLog(task._id, _.isArray(log) ? log.map(l => `(Group):${l}`) : `(Group):${log}`)
    }

    let pushErr = (err) => {
        return taskPushLog(task._id, `(Group): <span style="color: red">${err}</span>`)
    }
    try {

        let env1 = fs.existsSync(path.join(filepath, ".env")) && fs.readFileSync(path.join(filepath, ".env")).toString()
        env1 = env1 || ""
        
        await execAsyncAndLog(pushLog, `openssl des3 -d -md sha256 -k ${conf.secret}${file.name} -in ${file.path} | tar xzf - -C ${workDir}`, {}, function (childProcess) {
            childProcess.stdout.on('data', (data) => {
                pushLog(`${data}`);
            });
        })
        
        let env2 = fs.readFileSync(path.join(filepath, ".env")).toString()
        let env = _.assign(convertT2J(env1), convertT2J(env2))
        env = convertJ2T(env)
        fs.writeFileSync(path.join(filepath, ".env"), env)

        let buildTask = require(`${filepath}/config.json`)
        task = _.assign(task, buildTask)
        await mongo.run("client", async db => {
            await db.collection("task").updateOne({
                _id: objectId(task._id)
            }, {
                "$set": buildTask
            })
        })

        pushLog(["待部署的服务:\n" + task.services.map(ser => ser.name + "@" + ser.version).join("\n"), "部署任务开始执行:"])
        // 1. 执行预设脚本
        await execAsyncAndLog(pushLog, `sh before_post.sh`, {
            cwd: filepath
        }, function (childProcess) {
            childProcess.stdout.on('data', (data) => {
                pushLog(`${data}`);
            });
        })
        // 2. 启动脚本
        await execAsyncAndLog(pushLog, `sh install.sh`, {
            cwd: filepath
        }, function (childProcess) {
            childProcess.stdout.on('data', (data) => {
                pushLog(`${data}`);
            });
        })
        // 3. 执行后置脚本
        await execAsyncAndLog(pushLog, `sh after_post.sh`, {
            cwd: filepath
        }, function (childProcess) {
            childProcess.stdout.on('data', (data) => {
                pushLog(`${data}`);
            });
        })
        // 4. 清理工作
        await execAsyncAndLog(pushLog, `rm -rf ${filepath}/images/*`, {}, function (childProcess) {
            childProcess.stdout.on('data', (data) => {
                pushLog(`${data}`);
            });
        })
        pushLog("部署成功!")
        console.log("部署成功!")
    } catch (err) {
        pushErr(err.message)
        throw err
    } finally {
        execAsync(`rm -rf ${file.path}`)
        pushLog(`部署总耗时: ${Date.now()-now}ms`)
        console.log(`部署总耗时: ${Date.now()-now}ms`)
    }
}


async function execAsyncAndLog(logger, ...args) {
    logger(args[0])
    await execAsync(...args)
}

module.exports = {
    deployGroup
}