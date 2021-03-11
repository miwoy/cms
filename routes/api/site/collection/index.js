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
			name: ctx.params.collectionName,
            siteId: objectId(ctx.params.siteId)
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
			name: ctx.params.collectionName,
            siteId: objectId(ctx.params.siteId)
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
            "sortable": true,
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
            "sortable": true,
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
            "sortable": true,
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
            "sortable": true,
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


module.exports = router