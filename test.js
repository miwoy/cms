

require("lib/global")
const mongo = require("lib/service/mongo")
const objectId = require('mongodb').ObjectId;
const fs = require("fs");
const path = require("path");
const {
    client
} = require("application")


let run = async () => {

    await mongo.run("server", async db=> {
        let versions = await db.collection("version").find().sort({
            serviceId: 1,
            name: -1
        }).toArray()
        for(let i =0;i<versions.length;i++) {
            await db.collection("version").updateOne({
                _id: versions[i]._id
            }, {
                "$set": {
                    name: versions[i].name,
                    serviceId: versions[i].serviceId,
                    sequence: i,
                    createdAt: Date.now() / 1000,
                    updatedAt: Date.now() / 1000
                }
            })
        }
    })

    return "ok"
}

run().then(console.log).catch(console.error)
