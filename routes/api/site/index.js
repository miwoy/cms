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


files = fs
    .readdirSync(__dirname)
    .filter(function (file) {
        return (file.indexOf(".") !== 0) && (file !== basename);
    });
files.map(function (file) {
    var _router = require(path.join(__dirname, file));
    file = file.split(".js")[0];
    router.use("/:siteId/" + file.split(".js")[0], _router.routes());
    return file;
});


const DIR_MAP = {
    asc: 1,
    desc: -1
}

router.get("/", async (ctx) => {

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

    let result
    if (ctx.query.all !== undefined) {
        result = await mongo.run("cms", async (db) => {
            let items = await db.collection("site")
                .find(query)
                .sort(sortData)
                .toArray()
            return items
        })
    } else {
        result = await mongo.run("cms", async (db) => {
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

    ctx.sbody = result
})

/**
 * 获取站点根据name
 */
router.get("/getByName", async (ctx) => {
    let result = await mongo.run("cms", async (db) => {
        return await db.collection("site").findOne({
            name: ctx.q.name
        })
    })
    ctx.sbody = ctx.query.type == "amis" ? getAmis(result.properties) : result
})

/**
 * 获取站点
 */
router.get("/:id", async (ctx) => {
    let result = await mongo.run("cms", async (db) => {
        return await db.collection("site").findOne({
            _id: objectId(ctx.params.id)
        })
    })
    ctx.sbody = ctx.query.type == "amis" ? getAmis(result.properties) : result
})

/**
 * 修改顺序
 */
router.put("/sequence", async (ctx) => {
	let rows = ctx.rbody.rows
	let seed = rows.reduce((acc, cur) => {
		return Math.min(cur.sequence, acc)
	}, 0) || 0
	let bulkData = rows.map(row => {
		row = {
			updateOne: {
				filter: {
					_id: objectId(row._id)
				},
				update: {
					"$set": {
						sequence: seed
					}
				}
			}
		}
		seed++
		return row
	})

	await mongo.run("cms", async (db) => {
		return db.collection("site").bulkWrite(bulkData)
	})
	ctx.sbody = true
})



/**
 * 新增站点
 */
router.post("/", async (ctx) => {
    ctx.rbody.createdAt = Date.now()
    ctx.rbody.updatedAt = Date.now()
    ctx.rbody.sequence = Date.now()
    ctx.rbody.path = path.join("/", ctx.rbody.path)
    let result = await mongo.run("cms", async (db) => {
        return await db.collection("site").insertOne(ctx.rbody)
    })
    ctx.sbody = _.assign({}, ctx.rbody, {
        _id: result.insertedId
    })
})



/**
 * 修改站点
 */
router.put("/:id", async (ctx) => {
    ctx.rbody.updatedAt = Date.now()
    delete ctx.rbody._id
    if (ctx.rbody.path !== undefined) {
        ctx.rbody.path = path.join("/", ctx.rbody.path)
    }
    if (_.isString(ctx.rbody.pages)) {
        try {
            ctx.rbody.pages = JSON.parse(ctx.rbody.pages)
        } catch (e) {
            throw new TypeArgsGeneralityError("pages 必须是json类型字符串")
        }
        
    }
    function toJSON(arry) {
        if (!arry) return
        arry.map(page=>{
            if (page.schema && _.isString(page.schema)) page.schema = JSON.parse(page.schema)
            if (page.children && page.children.length > 0) {
                toJSON(page.children)
            }
        })
    }

    try {
        toJSON(ctx.rbody.pages)
    } catch (e) {
        throw new TypeArgsGeneralityError("存在一个非法的schema json字符串")
    }

    
    
    let result = await mongo.run("cms", async (db) => {
        return db.collection("site").updateOne({
            _id: objectId(ctx.params.id)
        }, {
            $set: ctx.rbody
        })
    })

    ctx.sbody = !!result.result.ok
})

/**
 * 删除站点
 */
router.delete("/:id", async (ctx) => {
    let result = await mongo.run("cms", async (db) => {
        return await db.collection("site").deleteOne({
            _id: objectId(ctx.params.id)
        })
    })
    ctx.sbody = !!result.result.ok
})





module.exports = router;