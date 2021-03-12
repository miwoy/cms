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

/**
 * 获取数据
 */
router.get("/", async (ctx) => {
    const DIR_MAP = {
        asc: 1,
        desc: -1
    }
    let sortData = {
        "sequence": 1,
        "_id": -1
    }
    let query = {}
    if (ctx.q.orderBy) {
        sortData = {
            [ctx.q.orderBy]: DIR_MAP[ctx.q.orderDir] !== undefined ? DIR_MAP[ctx.q.orderDir] : 1
        }
    }

    // 按字段搜索
    let collection = await mongo.run("cms", async (db) => {
        return await db.collection("collection").findOne({
            name: "site",
            siteId: objectId(ctx.params.siteId)
        })
    })

    _.keys(ctx.q).forEach(key => {
        if (ctx.q[key] && collection.properties[key]) {
            // 对不同类型进行独立构建搜索方式
            if (collection.properties[key].type == "chained-select") {
                ctx.q[key] = ctx.q[key].replace(/全部/img, `[^${collection.properties[key].delimiter || ","}]+`)
                query[key] = {
                    $regex: new RegExp(`.*${ctx.q[key]}.*`, "img")
                }
            } else {
                query[key] = {
                    $regex: new RegExp(`.*${ctx.q[key]}.*`, "img")
                }
            }
        }
    })

    let result
    ctx.q.pageSize = ctx.q.pageSize > 1000 ? 1000 : ctx.q.pageSize
    if (ctx.query._all !== undefined) {
        ctx.q.pageSize = 1000
        result = await mongo.run("server", async (db) => {
            let items = await db.collection("site")
                .find(query)
                .sort(sortData)
                .limit(ctx.q.pageSize)
                .toArray()
            return items
        })
    } else {
        result = await mongo.run("server", async (db) => {
            let items = await db.collection("site")
                .find(query)
                .sort(sortData)
                .limit(ctx.q.pageSize)
                .skip(ctx.q.pageSize * ctx.q.pageIndex)
                .toArray()
            let total = await db.collection("site").countDocuments()

            return {
                items,
                total
            }
        })
    }

    (result.items || result).map(item => {
        _.keys(item).forEach((key) => {
            let value = item[key]
            delete item[key]
            key = convertCode2Dot(key)
            item[key] = value
        })
    })

    ctx.sbody = result
})

router.post("/", async (ctx) => {

    // 初始化配置
    let data = ctx.rbody
    await mongo.run("server", async db => {
        // let env = await db.collection("env").findOne({
        //     _id: objectId(data.envId)
        // })
        // let site = await db.collection("site").findOne({
        //     _id: objectId(data.sid)
        // })

        let services = await db.collection("service").find({
            _id: {
                $in: data.serviceIds.map(id => objectId(id))
            }
        }).toArray()

        let {insertedId: siteEnvId} = await db.collection("siteEnv").insertOne(data)
        let docs = services.map(service => {
            return {
                serviceId: service._id.toString(),
                siteEnvId: siteEnvId.toString(),
                label: data.label + "-" + service.label,
                env: "# 站点-环境-服务级 \n",
                afterPost: `# ${data.label + "-" + service.label} \n`
            }
        })

        await db.collection("etcd").insertMany(docs)
    })

    ctx.sbody = data
})

/**
 * 修改数据
 */
router.put("/:id", async (ctx) => {
    let data = ctx.rbody
    data.updatedAt = Math.round(Date.now() / 1000)
    delete data._id
    await mongo.run("server", async (db) => {
        let siteEnv = await db.collection("siteEnv").findOne({
            _id: objectId(ctx.params.id)
        })
        await db.collection("siteEnv").updateOne({
            _id: objectId(ctx.params.id)
        }, {
            $set: data
        })
        let removeItems = siteEnv.serviceIds.filter(id => !data.serviceIds.includes(id))
        let insertItems = data.serviceIds.filter(id => !siteEnv.serviceIds.includes(id))

        if (insertItems.length > 0) {
            let services = await db.collection("service").find({
                _id: {
                    $in: insertItems.map(id => objectId(id))
                }
            }).toArray()
            let docs = services.map(service => {
                return {
                    serviceId: service._id.toString(),
                    siteEnvId: siteEnv._id.toString(),
                    label: siteEnv.label + "-" + service.label
                }
            })

            let result = await db.collection("etcd").insertMany(docs)
        }
        if (removeItems.length > 0) {
            await db.collection("etcd").deleteMany({
                siteEnvId: siteEnv._id.toString(),
                serviceId: {
                    $in: removeItems
                }
            })
        }

    })
    data._id = objectId(ctx.params.id)
    ctx.sbody = data
})

/**
 * 删除数据
 */
router.delete("/:id", async (ctx) => {

    let result = await mongo.run("server", async (db) => {
        await db.collection("etcd").deleteMany({
            siteEnvId: ctx.params.id
        })
        return await db.collection("siteEnv").deleteOne({
            _id: objectId(ctx.params.id)
        })
    })

    ctx.sbody = !!result.result.ok
})

module.exports = router