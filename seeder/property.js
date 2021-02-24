require("lib/global")
const mongo = require('lib/service/mongo')
let collection = require('data/collection')
let collectionSchema = require('data/collectionSchema')
let property = require('data/property')

let run = async () => {
    await mongo.run("cms", async (db) => {
        await db.collection("property").deleteMany({})
        await db.collection("property").insertMany(property)
        
    })
}

run().catch(console.dir)