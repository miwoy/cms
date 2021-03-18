const Router = require("koa-router");
const fs = require("fs");
const path = require("path");
const os = require("os");
const uuid = require("uuid");
const debug = require("debug")("deployment:docker:");
const {
    formatDate,
    execAsync,
    execFileAsync
} = require("lib/common/util");
const {
    exportFile
} = require("lib/middleware")

let router = new Router()

router.get("/list", async (ctx) => {

    let result = await execAsync(`docker ps -a --format "{{.ID}},{{.Names}},{{.Status}},{{.Image}},{{.Ports}}"`)
    let data = [
    ]

    result = result.trim().split("\n").map(r => r.split(","))
    result = result.filter(row=>new RegExp(ctx.q.keywords).test(row[1]))
    for (let row of result) {
        row[2] = await execAsync(`docker inspect ${row[0]} --format="{{.State.Status}}"`)
    }
    data = data.concat(result)
    data.map((row,i)=>{
        data[i] = row.reduce((row, col, i)=>{row[i+""]=col;return row;},{})
    })
    ctx.body = {
        items: data,
        total: 100
    }
})

router.get("/:id/restart", async (ctx) => {
    let result = await execAsync(`docker restart ${ctx.params.id}`)
    ctx.body = result
})

router.get("/:id/start", async (ctx) => {
    let result = await execAsync(`docker start ${ctx.params.id}`)
    ctx.body = result
})

router.get("/:id/stop", async (ctx) => {
    let result = await execAsync(`docker stop ${ctx.params.id}`)
    ctx.body = result
})

router.get("/:id/delete", async (ctx) => {
    let result = await execAsync(`docker rm -f ${ctx.params.id}`)
    ctx.body = result
})

let task = {
    status: "end",
    data: "",
    download: "",
    pushLog(log) {
        debug(log)
        this.data += `[${formatDate(new Date())}]: ${log}\n`
    },
    clean() {
        this.data = ""
    }
}
router.get("/:id/backup", async (ctx) => {
    if (task.status !== "end") throw new DataGeneralityError("任务已存在")
    task.clean()
    backup(ctx.params.id)
    // ctx.sbody = {
    //     buffer: fs.createReadStream(r),
    //     filename: `container_${ctx.params.id}.tar.gz`
    // }
    ctx.body = "/api/docker/backup/process"
})


router.get("/backup/process", async (ctx) => {
    ctx.body = task
})



async function backup(id) {
    task.status = "pending"
    let option = await execAsync(`docker container inspect ${id}`)
    option = JSON.parse(option)
    let tmpDir = os.tmpdir()
    let workDir = path.join(tmpDir, uuid.v4())
    let exportDir = path.join(workDir, "container_" + id)
    fs.mkdirSync(workDir)
    fs.mkdirSync(exportDir)
    try {
        task.pushLog(`docker export ${id} | gzip > ${option[0].Name.replace("/","")}.tar.gz`)
        await execAsync(`docker export ${id} | gzip > ${option[0].Name.replace("/","")}.tar.gz`, {
            cwd: exportDir
        }, function (childProcess) {
            childProcess.stdout.on('data', (data) => {
                task.pushLog(`stdout: ${data}`);
            });
        })

        task.pushLog("导出 volumes")
        await Promise.all(option[0].Mounts.map(mount => {
            return execAsync(`cp -rf ${mount.Source} ./`, {
                cwd: exportDir
            })
        }))

        task.pushLog(`tar -zcf container_${id}.tar.gz  container_${id}`)
        await execAsync(`tar -zcf ${path.join(process.cwd(), conf.downloadDir)}/container_${id}.tar.gz  container_${id}`, {
            cwd: workDir
        })
        // await execAsync(`cp -rf ${workDir}/container_${id}.tar.gz ${conf.downloadDir}/`)
        task.pushLog("finished.")
    } catch (err) {
        throw err
    } finally {
        fs.unlink(workDir, () => {})
        task.status = "end"
    }
    task.download = `${conf.downloadDir}/container_${id}.tar.gz`.replace("src/", "")
}

router.get("/:id/ls/", async (ctx) => {
    let result = await execAsync(`docker exec  ${ctx.params.id} ls -R ${ctx.query.path}`)
    ctx.body = result
})

module.exports = router