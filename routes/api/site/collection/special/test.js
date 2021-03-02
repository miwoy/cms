const Router = require("koa-router");
const fs = require("fs");
const path = require("path");
let files = [];
const basename = path.basename(module.filename);
const mongo = require("lib/service/mongo")
const objectId = require('mongodb').ObjectId;
const {
    convertCode2Dot,
    getAmis
} = require("lib/common/util")
let router = new Router({});

router.post("/data", async (ctx, next) => {
    await next()

    // 增加修订记录
   await mongo.run(ctx.site.name, async (db)=> {
        await db.collection("reversion").insertOne({
            code: ctx.body.data.updatedAt,
            collectionId: ctx.collection._id,
            docId: ctx.body.data._id,
            document: ctx.body.data
        })
    })
})

router.put("/data/:id", async (ctx, next) => {
    
    await next()
    console.log("debug")
    // 增加修订记录
    await mongo.run(ctx.site.name, async (db)=> {
        let document = await db.collection(ctx.collection.name).findOne({
            _id: objectId(ctx.params.id)
        })
        await db.collection("reversion").insertOne({
            code: document.updatedAt,
            collectionId: ctx.collection._id,
            docId: document._id,
            document: document
        })
    })
})

module.exports = router