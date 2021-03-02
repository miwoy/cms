const Router = require("koa-router");
const fs = require("fs");
const path = require("path");
let files = [];
const basename = path.basename(module.filename);
const mongo = require("lib/service/mongo")
const objectId = require('mongodb').ObjectId;
const {
    getAmis,
    execAsync
} = require("lib/common/util")
const {
    task
} = require("lib/common")
const {
    exec
} = require("child_process")
const uuid = require("uuid")
let router = new Router({});

let tasks = []

router.post("/deploy", async (ctx) => {
    let id = uuid.v4()
    let taskD = task.createTasker(id)
    taskD.start()
    execAsync("du -h", {}, (childProcess) => {
        childProcess.stdout.on("data", (data) => {
            taskD.pushLog(data)
        })
        childProcess.stderr.on("data", (data) => {
            taskD.pushLog(data)
        })
    }).then(d=>{
        taskD.finish()
    }).catch (e=>{
        // taskD.pushError(e.message)
        taskD.finish()
    })
    tasks.push(taskD)
    ctx.sbody = {
        "taskId": id
    }
})

router.get("/log/:taskId", async (ctx) => {
    let taskD = tasks.find(t => t.id == ctx.params.taskId)
    if (!taskD) throw new IsNullDataGeneralityError("任务不存在")
    ctx.sbody = taskD
})


router.get("/")

module.exports = router;