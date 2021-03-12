const json = require('./payload.json')

require("lib/global")
const mongo = require("lib/service/mongo")
const objectId = require('mongodb').ObjectId;
const fs = require("fs");
const path = require("path");
const {
    client
} = require("application")


let run = async () => {

    let bulkData = json.map(data=>{
        return {
            label: data.name,
            name: data.name,
            category: "business", 
            description: data.desc,
            type: data.type,
            auth: data.auth,
            image: data.image
        }
    })

    await mongo.run("server", async db=> {
        await db.collection("service").insertMany(bulkData)
        let services = await db.collection("service").find().toArray()
        let versions = []
        
        services.forEach(service=>{
            let data = json.find(d=>d.name==service.name)
            versions = versions.concat(data.versions.map(v=>({name:v,serviceId:service._id.toString()})))
        })
        await db.collection("version").insertMany(versions)
    })

    return "ok"
}

run().then(console.log).catch(console.error)
