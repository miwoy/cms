const Router = require("koa-router");
const fs = require("fs");
const path = require("path");
let files = [];
const basename = path.basename(module.filename);
const mongo = require("lib/service/mongo")
const objectId = require('mongodb').ObjectId;
const {
	getAmis,
    convertCode2Dot,
    convertDot2Code
} = require("lib/common/util")
let router = new Router({});

files = fs
    .readdirSync(path.join(__dirname, "special"))
    .filter(function (file) {
        return (file.indexOf(".") !== 0) && (file !== basename);
    });
files.map(function (file) {
    var _router = require(path.join(__dirname,  "special",  file));
    file = file.split(".js")[0];
    router.use("/getByName/" + file, _router.routes());
    return file;
});


let propertyRouter = require("./property")
let dataRouter = require("./data")
router.use("/getByName/:collectionName/property", async function(ctx, next){
    ctx.collection = await mongo.run("cms", async (db) => {
		return await db.collection("collection").findOne({
			name: ctx.params.collectionName
		})
	})
    await next()
}, propertyRouter().routes());
router.use("/:collectionId/property", async function(ctx, next){
    ctx.collection = await mongo.run("cms", async (db) => {
		return await db.collection("collection").findOne({
			_id: objectId(ctx.params.collectionId)
		})
	})
    await next()
}, propertyRouter().routes());

router.use("/getByName/:collectionName/data", async function(ctx, next){
    ctx.collection = await mongo.run("cms", async (db) => {
		return await db.collection("collection").findOne({
			name: ctx.params.collectionName
		})
	})
    await next()
}, dataRouter().routes());
router.use("/:collectionId/data", async function(ctx, next){
    ctx.collection = await mongo.run("cms", async (db) => {
		return await db.collection("collection").findOne({
			_id: objectId(ctx.params.collectionId)
		})
	})
    await next()
}, dataRouter().routes());


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
    let collectionSchema = require("data/collectionSchema")[0]

    _.keys(ctx.q).forEach(key => {
        if (ctx.q[key] && collectionSchema.properties[key]) {
            // 对不同类型进行独立构建搜索方式
            if (collectionSchema.properties[key].type == "chained-select") {
                ctx.q[key] = ctx.q[key].replace(/全部/img, `[^${collectionSchema.properties[key].delimiter || ","}]+`)
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
    if (ctx.query._all !== undefined) {
        result = await mongo.run("cms", async (db) => {
            let items = await db.collection("collection")
                .find(query)
                .sort(sortData)
                .toArray()
            return items
        })
    } else {
        result = await mongo.run("cms", async (db) => {
            let items = await db.collection("collection")
                .find(query)
                .sort(sortData)
                .limit(ctx.q.pageSize)
                .skip(ctx.q.pageSize * ctx.q.pageIndex)
                .toArray()
            let total = await db.collection("collection").countDocuments()
            return {
                items,
                total
            }
        })
    }
    ctx.sbody = result
})


/**
 * 获取模型根据name
 */
router.get("/getByName", async (ctx) => {
    let result = await mongo.run("cms", async (db) => {
        return await db.collection("collection").findOne({
            siteId: objectId(ctx.params.siteId),
            name: ctx.q.name
        })
    })
    ctx.sbody = ctx.query.type == "amis" ? getAmis(result.properties) : result
})

/**
 * 获取模型
 */
router.get("/:id", async (ctx) => {
    let result = await mongo.run("cms", async (db) => {
        return await db.collection("collection").findOne({
            _id: objectId(ctx.params.id)
        })
    })
    ctx.sbody = ctx.query.type == "amis" ? getAmis(result.properties) : result
})



/**
 * 新增模型
 */
router.post("/", async (ctx) => {
    ctx.rbody.properties = {
        "_id": {
            "_ref": "text",
            "type": "text",
            "label": "_id",
            "name": "_id",
            "hidden": true,
            "mode": "horizontal",
            "clearValueOnHidden": true,
            "system": true
        },
        "sequence": {
            "_ref": "number",
            "type": "number",
            "name": "sequence",
            "label": "排序字段",
            "hidden": true,
            "mode": "horizontal",
            "clearValueOnHidden": true,
            "system": true
        },
        "createdAt": {
            "_ref": "datetime",
            "type": "datetime",
            "label": "创建时间",
            "name": "createdAt",
            "hidden": true,
            "mode": "horizontal",
            "clearValueOnHidden": true,
            "system": true
        },
        "updatedAt": {
            "_ref": "datetime",
            "type": "datetime",
            "label": "修改时间",
            "name": "updatedAt",
            "hidden": true,
            "mode": "horizontal",
            "clearValueOnHidden": true,
            "system": true
        }
    }
    ctx.rbody.createdAt = Date.now()
    ctx.rbody.updatedAt = Date.now()
    ctx.rbody.sequence = Date.now()
    ctx.rbody.siteId = objectId(ctx.params.siteId)
    let result = await mongo.run("cms", async (db) => {
        return await db.collection("collection").insertOne(ctx.rbody)
    })

    ctx.sbody = _.assign({}, ctx.rbody, {
        _id: result.insertedId
    })
})



/**
 * 修改模型
 */
router.put("/:id", async (ctx) => {
    ctx.rbody.updatedAt = Date.now()
    let result = await mongo.run("cms", async (db) => {
        return db.collection("collection").updateOne({
            _id: objectId(ctx.params.id)
        }, {
            $set: ctx.rbody
        })
    })

    ctx.sbody = !!result.result.ok
})

/**
 * 删除模型
 */
router.delete("/:id", async (ctx) => {
    let result = await mongo.run("cms", async (db) => {
        return await db.collection("collection").deleteOne({
            _id: objectId(ctx.params.id)
        })
    })
    ctx.sbody = !!result.result.ok
})



// /**
//  * 获取模型属性
//  */
// router.get("/:id/property", async (ctx) => {
//     let properties = []
//     let result = await mongo.run("cms", async (db) => {
//         properties = await db.collection("property").find().toArray()
//         return await db.collection("collection").findOne({
//             _id: objectId(ctx.params.id)
//         })
//     })



//     let items = (result ? _.values(result.properties) : []).map(p => {
//         p._property = properties.find(prop => prop.name == p._ref)
//         return p
//     })
//     result = {
//         items: items.map(item=> {
//             item.name = convertCode2Dot(item.name)
//             return item
//         })
//     }

//     ctx.sbody = result
// })

// /**
//  * 获取模型属性
//  */
// router.get("/:id/property/:name", async (ctx) => {
//     let properties = []
//     let result = await mongo.run("cms", async (db) => {
//         properties = await db.collection("property").find().toArray()
//         return await db.collection("collection").findOne({
//             _id: objectId(ctx.params.id)
//         })
//     })

//     ctx.params.name = convertDot2Code(ctx.params.name)
//     result = result.properties[ctx.params.name]
//     result._property = properties.find(prop => prop.name == result._ref)

//     ctx.sbody = result
// })

// /**
//  * 修改顺序
//  */
// router.put("/:id/property/setSequence", async (ctx) => {
//     ctx.rbody.rows = ctx.rbody.rows.map(row=>{
//         row.name=convertDot2Code(row.name)
//         return row
//     })
//     let properties = ctx.rbody.rows.reduce((acc, cur) => {
//         acc[cur.name] = cur
//         return acc
//     }, {})

//     let result = await mongo.run("cms", async (db) => {
//         return db.collection("collection").updateOne({
//             _id: objectId(ctx.params.id)
//         }, {
//             $set: {
//                 properties,
//                 updatedAt: Date.now()
//             }
//         })
//     })
//     ctx.sbody = result
// })


// function convert2Amis(data, options) {
//     if (data._ref == "related") {
//         data.source = {
//             method: "get",
//             "cache": 3000,
//             url: `/api/site/${options.siteId}/collection/${data.related.collection}/data?${(data.related.filter?["_all",data.related.filter ]:["_all"]).join("&")}`,
//             adaptor: `return {\n    ...payload,\n    data:{options:payload.data.map(v=>({label:v.label || v.name,value: v.${data.related.property}}))}\n}`
//         }
//     } else if (data._ref == "custom") {
//         let schema
//         try {
//             schema = JSON.parse(data._schema)
//         } catch (err) {
//             throw new InvalidArgsGeneralityError("表单结构必须是json格式")
//         }
//         if (!schema.name) throw new RequiredArgsGeneralityError("必须配置name")
//         if (!schema.type) throw new RequiredArgsGeneralityError("必须配置type")
//         if (!schema.label) throw new RequiredArgsGeneralityError("必须配置label")
//         data = {
//             ...schema,
//             ...data
//         }
//     }

//     return {
//         ...data,
//         name: convertDot2Code(data.name)
//     }
// }

// /**
//  * 新增模型属性
//  */
// router.post("/:id/property", async (ctx) => {
//     let data = ctx.rbody
//     let result = await mongo.run("cms", async (db) => {
//         let col = await db.collection("collection").findOne({
//             _id: objectId(ctx.params.id)
//         }, {
//             properties: 1
//         })

//         data = convert2Amis(data, {
//             siteId: ctx.params.siteId
//         })

//         col.properties[data.name] = data

//         await db.collection("collection").updateOne({
//             _id: objectId(ctx.params.id)
//         }, {
//             $set: {
//                 properties: col.properties
//             }
//         })

//         return col.properties[data.name]
//     })

//     ctx.sbody = result
// })

// /**
//  * 修改模型属性
//  */
// router.put("/:id/property/:name", async (ctx) => {
//     let data = ctx.rbody
//     data.name = ctx.params.name
//     let result = await mongo.run("cms", async (db) => {
//         let col = await db.collection("collection").findOne({
//             _id: objectId(ctx.params.id)
//         }, {
//             properties: 1
//         })

//         data = convert2Amis(data, {
//             siteId: ctx.params.siteId
//         })
//         col.properties[data.name] = data
//         await db.collection("collection").updateOne({
//             _id: objectId(ctx.params.id)
//         }, {
//             $set: {
//                 properties: col.properties
//             }
//         })

//         return col.properties[data.name]
//     })

//     ctx.sbody = result
// })

// /**
//  * 移除模型属性
//  */
// router.delete("/:id/property/:name", async (ctx) => {
//     ctx.params.name = convertDot2Code(ctx.params.name)
//     let result = await mongo.run("cms", async (db) => {
//         let col = await db.collection("collection").findOne({
//             _id: objectId(ctx.params.id)
//         }, {
//             properties: 1
//         })

//         let value = col.properties[ctx.params.name]
//         delete col.properties[ctx.params.name]
//         await db.collection("collection").updateOne({
//             _id: objectId(ctx.params.id)
//         }, {
//             $set: {
//                 properties: col.properties
//             }
//         })

//         return value
//     })

//     ctx.sbody = result
// })



module.exports = router