const Router = require("koa-router");
const fs = require("fs");
const path = require("path");
let files = [];
const basename = path.basename(module.filename);
const mongo = require("lib/service/mongo")
const objectId = require('mongodb').ObjectId;
const {
    getAmis
} = require("lib/common/util")
let router = new Router({});

/**
 * 获取站点页面根据name
 */
router.get("/getByName", async (ctx) => {
    let result = await mongo.run("cms", async (db) => {
        return await db.collection("page").findOne({
            name: ctx.q.name,
            siteId: objectId(ctx.params.siteId)
        })
    })
    if (!result) throw new IsNullDataGeneralityError("页面不存在")
    ctx.sbody = ctx.query.type == "amis" ? getAmis(result.properties) : result
})


/**
 * 获取站点页面
 */
router.get("/", async (ctx) => {
    let sortData = {
        "sequence": -1,
        "_id": -1
    }
    let query = {}
    if (ctx.q.orderBy) {
        sortData = {
            [ctx.q.orderBy]: DIR_MAP[ctx.q.orderDir] !== undefined ? DIR_MAP[ctx.q.orderDir] : 1
        }
    }

    // 按字段搜索
    let siteSchema = require("data/siteSchema")[0]

    _.keys(ctx.q).forEach(key => {
        if (ctx.q[key] && siteSchema.properties[key]) {
            // 对不同类型进行独立构建搜索方式
            if (siteSchema.properties[key].type == "chained-select") {
                ctx.q[key] = ctx.q[key].replace(/全部/img, `[^${siteSchema.properties[key].delimiter || ","}]+`)
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

    query.siteId = objectId(ctx.params.siteId)
    let result
    if (ctx.query.all !== undefined) {
        result = await mongo.run("cms", async (db) => {
            let items = await db.collection("page")
                .find(query)
                .sort(sortData)
                .toArray()
            return items
        })
    } else {
        result = await mongo.run("cms", async (db) => {
            let items = await db.collection("page")
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

    ctx.sbody = result
})

/**
 * 新增页面
 */
router.post("/", async (ctx) => {
    ctx.rbody.createdAt = Date.now()
    ctx.rbody.updatedAt = Date.now()
    ctx.rbody.sequence = Date.now()
    ctx.rbody.siteId = objectId(ctx.params.siteId)
    ctx.rbody.data = {
        siteId: ctx.params.siteId
    }
    let schema = require("data/pageSchema")[0]
    _.values(schema.properties).map(prop => {
        if (prop.type == "editor" && prop.language == "json") {
            try {
                ctx.rbody[prop.name] = ctx.rbody[prop.name] && _.isString(ctx.rbody[prop.name]) ? JSON.parse(ctx.rbody[prop.name]) : ctx.rbody[prop.name]
            } catch (e) {
                throw new TypeArgsGeneralityError(`属性${prop.label}含有非法json字符串，${e.message}`)
            }

        }
    })

    let result = await mongo.run("cms", async (db) => {
        return await db.collection("page").insertOne(ctx.rbody)
    })
    ctx.sbody = _.assign({}, ctx.rbody, {
        _id: result.insertedId
    })
})

/**
 * 修改页面
 */
router.put("/:id", async (ctx) => {
    ctx.rbody.updatedAt = Date.now()
    ctx.rbody.siteId = objectId(ctx.params.siteId)
    ctx.rbody.data = {
        siteId: ctx.params.siteId
    }
    delete ctx.rbody._id
    let schema = require("data/pageSchema")[0]
    _.values(schema.properties).map(prop => {
        if (prop.type == "editor" && prop.language == "json") {
            try {
                ctx.rbody[prop.name] = ctx.rbody[prop.name] && _.isString(ctx.rbody[prop.name]) ? JSON.parse(ctx.rbody[prop.name]) : ctx.rbody[prop.name]
            } catch (e) {
                throw new TypeArgsGeneralityError(`属性${prop.label}含有非法json字符串，${e.message}`)
            }

        }
    })

    let result = await mongo.run("cms", async (db) => {
        return await db.collection("page").updateOne({
            _id: objectId(ctx.params.id)
        }, {
            $set: ctx.rbody
        })
    })

    ctx.sbody = !!result.result.ok
})

/**
 * 删除页面
 */
router.delete("/:id", async (ctx) => {
    delete ctx.rbody._id
    let result = await mongo.run("cms", async (db) => {
        return await db.collection("page").deleteOne({
            _id: objectId(ctx.params.id),
            siteId: objectId(ctx.params.siteId)
        })
    })

    ctx.sbody = !!result.result.ok
})


module.exports = router;