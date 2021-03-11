const Router = require("koa-router")
const {
    authenticate
} = require("lib/middleware")
const qs = require("qs")
const uuid = require("uuid")
const mongo = require("lib/service/mongo")
const objectId = require('mongodb').ObjectId
const {
    getAmis,
    convertCode2Dot,
    convertDot2Code
} = require("lib/common/util")

module.exports = () => {
    let router = new Router({})

    /**
     * 获取模型属性
     */
    router.get("/", async (ctx) => {
        let result = ctx.collection
        let properties = require("data/property")

        let items = (result ? _.values(result.properties) : []).map(p => {
            p._property = properties.find(prop => prop.name == p._ref)
            return p
        })
        result = {
            items: items.map(item => {
                item.name = convertCode2Dot(item.name)
                return item
            })
        }

        ctx.sbody = result
    })


    /**
     * 获取模型属性
     */
    router.get("/:name", async (ctx) => {
        ctx.params.name = convertDot2Code(ctx.params.name)
        let properties = require("data/property")

        let property = ctx.collection.properties[ctx.params.name]

        property._property = properties.find(prop => prop.name == property._ref)
        property.name = convertCode2Dot(property.name)
        ctx.sbody = property
    })

    /**
     * 修改顺序
     */
    router.put("/setSequence", async (ctx) => {
        ctx.rbody.rows = ctx.rbody.rows.map(row => {
            row.name = convertDot2Code(row.name)
            return row
        })
        let properties = ctx.rbody.rows.reduce((acc, cur) => {
            acc[cur.name] = cur
            return acc
        }, {})

        let result = await mongo.run("cms", async (db) => {
            return db.collection("collection").updateOne({
                _id: objectId(ctx.collection._id)
            }, {
                $set: {
                    properties,
                    updatedAt: Date.now()
                }
            })
        })
        ctx.sbody = result
    })


    function convert2Amis(data, options) {
        if (data._ref == "related") {
            data.source = {
                method: "get",
                "cache": 3000,
                url: `/api/site/${options.siteId}/collection/${data.related.collection}/data?${(data.related.filter?["_all",data.related.filter ]:["_all"]).join("&")}`,
                adaptor: `return {\n    ...payload,\n    data:{options:payload.data.map(v=>({label:v.label || v.name,value: v.${data.related.property}}))}\n}`
            }
        } else if (data._ref == "custom") {
            let schema
            try {
                schema = JSON.parse(data._schema)
            } catch (err) {
                throw new InvalidArgsGeneralityError("表单结构必须是json格式")
            }
            if (!schema.name) throw new RequiredArgsGeneralityError("必须配置name")
            if (!schema.type) throw new RequiredArgsGeneralityError("必须配置type")
            if (!schema.label) throw new RequiredArgsGeneralityError("必须配置label")
            data = {
                ...schema,
                ...data
            }
        }

        return {
            ...data,
            name: convertDot2Code(data.name)
        }
    }

    /**
     * 新增模型属性
     */
    router.post("/", async (ctx) => {
        let data = ctx.rbody
        let col = ctx.collection
        let result = await mongo.run("cms", async (db) => {
            data = convert2Amis(data, {
                siteId: ctx.params.siteId
            })
            col.properties[data.name] = data
            await db.collection("collection").updateOne({
                _id: objectId(col._id)
            }, {
                $set: {
                    properties: col.properties
                }
            })

            return col.properties[data.name]
        })

        ctx.sbody = result
    })

    /**
     * 修改模型属性
     */
    router.put("/:name", async (ctx) => {
        let data = ctx.rbody
        let col = ctx.collection
        data.name = ctx.params.name
        let result = await mongo.run("cms", async (db) => {

            data = convert2Amis(data, {
                siteId: ctx.params.siteId
            })
            col.properties[data.name] = data
            await db.collection("collection").updateOne({
                _id: objectId(col._id)
            }, {
                $set: {
                    properties: col.properties
                }
            })

            return col.properties[data.name]
        })

        ctx.sbody = result
    })

    /**
     * 移除模型属性
     */
    router.delete("/:name", async (ctx) => {
        let col = ctx.collection
        ctx.params.name = convertDot2Code(ctx.params.name)
        let result = await mongo.run("cms", async (db) => {
            let value = col.properties[ctx.params.name]
            delete col.properties[ctx.params.name]
            await db.collection("collection").updateOne({
                _id: objectId(col._id)
            }, {
                $set: {
                    properties: col.properties
                }
            })

            return value
        })

        ctx.sbody = result
    })


    return router
}