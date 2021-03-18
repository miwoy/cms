
require("lib/global")
const mongo = require("lib/service/mongo")
const objectId = require('mongodb').ObjectId;
const moment = require('moment-timezone')
const fs = require("fs");
const path = require("path");
const {
    client
} = require("application")

const run = async () => {
    let limit = parseInt(process.argv[2]) || 10

    let result = await mongo.run("client", async (db) => {
        return db.collection("task").find().sort({_id: -1}).limit(limit).toArray()
    })
    console.log(`Hash   状态   部署包  创建时间`)
    result.map(row=>{
        console.log(`${row.hash}   ${row.finished}   ${row.deploymentFile}  ${moment(new Date(row.createdAt*1000)).tz("Asia/Shanghai").format("YYYY-MM-DD HH:mm:ss")}`)
    })
}

run().then(console.log).catch(console.error)