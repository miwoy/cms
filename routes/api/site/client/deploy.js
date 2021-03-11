const Router = require("koa-router");
const fs = require("fs");
const path = require("path");
let files = [];
const basename = path.basename(module.filename);
const mongo = require("lib/service/mongo")
const objectId = require('mongodb').ObjectId;
const {
    client
} = require("application")


const uuid = require("uuid")
let router = new Router({});

router.post("/", async (ctx) => {
    let hash = ctx.rbody.deploymentFile.split("/").slice(2, -1).join("")
    let task = {
        createdAt: Date.now() / 1000,
        updatedAt: Date.now() / 1000,
        sequence: -Date.now() / 1000,
        finished: false,
        hash: hash,
        deploymentFile: ctx.rbody.deploymentFile,
        log: ["开始部署"]
    }
    let file = await mongo.run("cms", async db => {
        return await db.collection("file").findOne({
            "hash": hash
        })
    })
    
    let result = await mongo.run("client", async (db) => {
        return db.collection("task").insertOne(task)
    })
    task = _.assign({}, task, {
        _id: result.insertedId
    })

    
    client.deployGroup(task, file).then(async (url) => {
        mongo.run("client", async db => {
            await db.collection("task").updateOne({
                _id: task._id
            }, {
                "$set": {
                    finished: true
                }
            })
        })
    }).catch(async (err) => {
        console.log("error", err)
        mongo.run("client", async db => {
            await db.collection("task").updateOne({
                _id: task._id
            }, {
                "$set": {
                    finished: true,
                    error: err.message
                }
            })
        })
    })

    ctx.sbody = {
        "taskId": task._id
    }
})

router.get("/:id/log/", async (ctx) => {
    let task = await mongo.run("client", async db => {
        return db.collection("task").findOne({
            _id: objectId(ctx.params.id)
        })
    })
    if (!task) throw new IsNullDataGeneralityError("任务不存在")
    ctx.sbody = task
})

module.exports = router;