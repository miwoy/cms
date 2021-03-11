
require("lib/global")
const mongo = require("lib/service/mongo")
const objectId = require('mongodb').ObjectId;
const fs = require("fs");
const path = require("path");
const {
    client
} = require("application")

const run = async () => {
    let filePath = path.resolve(process.argv[2]) 
    let file = {
        name: filePath.split("/").pop(),
        path: filePath
    }
    let task = {
        createdAt: Date.now() / 1000,
        updatedAt: Date.now() / 1000,
        sequence: -Date.now() / 1000,
        finished: false,
        deploymentFile: filePath,
        log: ["开始部署"]
    }

    let result = await mongo.run("client", async (db) => {
        return db.collection("task").insertOne(task)
    })
    task = _.assign({}, task, {
        _id: result.insertedId
    })


    await client.deployGroup(task, file).then(async (url) => {
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

}

run().then(console.log).catch(console.error)