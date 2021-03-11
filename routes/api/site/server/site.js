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
        let {
            insertedId: siteId
        } = await db.collection("site").insertOne(ctx.rbody)
        let services = await db.collection("service").find({
            _id: {
                $in: ctx.rbody.serviceIds.map(id => objectId(id))
            }
        }).toArray()
        data._id = siteId
        let docs = services.map(service => {
            return {
                serviceId: service._id.toString(),
                siteId: siteId.toString(),
                label: ctx.rbody.label + "-" + service.label,
                env: "# 站点服务级 \n",
                afterPost: `# ${ctx.rbody.label + "-" + service.label} \n`
            }
        })
        let result = await db.collection("siteService").insertMany(docs)

        let env = await db.collection("env").findOne({
            name: "dev"
        })

        await db.collection("etcd").insertMany(_.values(result.insertedIds).map((id, i) => {
            return {
                siteServiceId: id.toString(),
                envId: env._id.toString(),
                label: docs[i].label + "-" + env.label,
                env: "# 配置级 \n",
                afterPost: `# ${docs[i].label + "-" + env.label} \n`
            }
        }))
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
        let site = await db.collection("site").findOne({
            _id: objectId(ctx.params.id)
        })
        await db.collection("site").updateOne({
            _id: objectId(ctx.params.id)
        }, {
            $set: data
        })
        let removeItems = site.serviceIds.filter(id => !data.serviceIds.includes(id))
        let insertItems = data.serviceIds.filter(id => !site.serviceIds.includes(id))

        if (insertItems.length > 0) {
            let services = await db.collection("service").find({
                _id: {
                    $in: insertItems.map(id => objectId(id))
                }
            }).toArray()
            let docs = services.map(service => {
                return {
                    serviceId: service._id.toString(),
                    siteId: site._id.toString(),
                    label: site.label + "-" + service.label
                }
            })

            let result = await db.collection("siteService").insertMany(docs)
            let env = await db.collection("env").findOne({
                name: "dev"
            })

            await db.collection("etcd").insertMany(_.values(result.insertedIds).map((id, i) => {
                return {
                    siteServiceId: id.toString(),
                    envId: env._id.toString(),
                    label: docs[i].label + "-" + env.label
                }
            }))
        }
        if (removeItems.length > 0) {
            let siteServices = await db.collection("siteService").find({
                siteId: site._id.toString(),
                serviceId: {
                    $in: removeItems
                }
            }).toArray()
            await db.collection("etcd").deleteMany({
                siteServiceId: {
                    $in: siteServices.map(ss => ss._id.toString())
                }
            })
            await db.collection("siteService").deleteMany({
                _id: {
                    $in: siteServices.map(ss => ss._id)
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
        let siteServices = await db.collection("siteService").find({
            siteId: ctx.params.id
        }).toArray()
        await db.collection("etcd").deleteMany({
            siteServiceId: {
                $in: siteServices.map(ss=>ss._id.toString())
            }
        })
        await db.collection("siteService").deleteMany({
            siteId: ctx.params.id
        })
        return await db.collection("site").deleteOne({
            _id: objectId(ctx.params.id)
        })

    })

    ctx.sbody = !!result.result.ok
})

module.exports = router