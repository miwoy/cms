require("lib/global")
const mongo = require('lib/service/mongo')
let collectionSchema = require('data/collectionSchema')
let property = require('data/property')

let run = async () => {
    await mongo.run("cms", async (db) => {
        await db.collection("property").deleteMany({})
        await db.collection("property").insertMany(property)
        await db.collection("collectionSchema").deleteMany({})
        await db.collection("collectionSchema").insertMany(collectionSchema)
        
    })
}

run().catch(console.dir)