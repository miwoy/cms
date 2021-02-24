const Router = require("koa-router");
const fs = require("fs");
const path = require("path");
const mongo = require("lib/service/mongo")
const objectId = require('mongodb').ObjectId


/**
 * 如果不设置prefix: "/"，则为默认路由配置
 * 所有未找到的地址都将匹配到index处理器上
 * @type {[type]}
 */
const basename = path.basename(module.filename);
let router = new Router({});


router.get("/", async (ctx) => {
    await ctx.render("admin")
})

/**
 * 获取pages 菜单配置
 */
router.get("/pages", async (ctx) => {
    let collections = await mongo.run("cms", async (db) => {
        return await db.collection("collection").find()
            .sort({
                sequence: 1,
                _id: 1
            }).toArray()
    })
    let collectionSchema = await mongo.run("cms", async (db) => {
        return await db.collection("collectionSchema").findOne()
    })

    let sites = await mongo.run("cms", async (db) => {
        return await db.collection("site").find().sort({
            sequence: 1
        }).toArray()
    })
   
    sites = sites.map(site => {
        site.collections = collections.filter(col => String(col.siteId) == String(site._id))
        return site
    })
    ctx.sbody = {
        pages: require("components/menu")(collectionSchema, sites)
    }
})

/**
 * 获取站点页面配置
 */
router.get("/pages/site", async (ctx) => {
    let siteSchema = require("data/siteSchema")[0]
    let page = require("components/site")
    ctx.sbody = page(siteSchema)
})

/**
 * 获取站点页面配置
 */
router.get("/pages/site/:id/page", async (ctx)=> {
    let pageSchema = require("data/pageSchema")[0]
    pageSchema.siteId = ctx.params.id
    let page = require("components/page")
    ctx.sbody = page(pageSchema)
})


/**
 * 获取指定模型页面配置
 */
router.get("/pages/site/:siteId/collection/:collectionId", async (ctx) => {
    let collection = await mongo.run("cms", async (db) => {
        return await db.collection("collection").findOne({
            _id: objectId(ctx.params.collectionId),
            siteId: objectId(ctx.params.siteId)
        })
    })
    let collectionSchema = await mongo.run("cms", async (db) => {
        return await db.collection("collectionSchema").findOne()
    })
    let properties = await mongo.run("cms", async (db) => {
        return await db.collection("property").find().sort().toArray()
    })
    let page = require("components/collection")
    ctx.sbody = page(ctx.params.siteId, collectionSchema, collection, properties)
})


/**
 * 获取指定数据页面配置
 */
router.get("/pages/site/:siteId/collection/:collectionId/data", async (ctx) => {
    let collection = await mongo.run("cms", async (db) => {
        return await db.collection("collection").findOne({
            _id: objectId(ctx.params.collectionId),
            siteId: objectId(ctx.params.siteId)
        })
    })
    let page = require("components/data")
    ctx.sbody = page(ctx.params.siteId, collection)
})

module.exports = router;