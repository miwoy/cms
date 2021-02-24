const Router = require("koa-router")
const {
	authenticate
} = require("lib/middleware")
const qs = require("qs")
const uuid = require("uuid")
const mongo = require("lib/service/mongo")
const objectId = require('mongodb').ObjectId
const {
	getAmis
} = require("lib/common/util")
let router = new Router()

router.all("*", async (ctx, next) => {
	ctx.site = await mongo.run("cms", async (db) => {
		return await db.collection("site").findOne({
			_id: objectId(ctx.params.siteId)
		})
	})

	await next()
})

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
			_id: objectId(ctx.params.collectionId)
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

	/**
	 * 依赖转换，从_id转到到可转到可读性的label或name上
	 */
	async function related(collection, items) {
		let arry = []

		_.values(collection.properties).forEach(function (prop) {
			if (prop._ref == "related" && prop.related.property == "_id") {
				arry.push({
					...prop,
					values: items.map(item => prop.related.property == "_id" && item[prop.name] && item[prop.name].length==24 ? objectId(item[prop.name]) : item[prop.name])
				})
			}
		})

		await Promise.all(arry.map(obj => {
			return (async () => {
				let collection = await mongo.run("cms", async (db) => {
					return await db.collection("collection").findOne({
						_id: objectId(obj.related.collection)
					}, {
						projection: {
							name: 1
						}
					})
				})
				
				let datas = await mongo.run(ctx.site.name, async (db) => {
					return await db.collection(collection.name).find({
						[obj.related.property]: {
							$in: obj.values
						}
					}).project({
						[obj.related.property]: 1,
						name: 1,
						label: 1
					}).toArray()
				})

				items.forEach(item => {
					let data = datas.find(d => d[obj.related.property] == item[obj.name])
					item[obj.name] = data ? data.label || data.name : item[obj.name]
				})
			})()
		}))

	}

	let result
	if (ctx.query.all !== undefined) {
		result = await mongo.run(ctx.site.name, async (db) => {
			let items = await db.collection(collection.name)
				.find(query)
				.sort(sortData)
				.toArray()
			// if (ctx.query.related !== undefined) {
			// 	await related(collection, items)
			// }
			return items
		})
	} else {
		result = await mongo.run(ctx.site.name, async (db) => {
			let items = await db.collection(collection.name)
				.find(query)
				.sort(sortData)
				.limit(ctx.q.pageSize)
				.skip(ctx.q.pageSize * ctx.q.pageIndex)
				.toArray()
			let total = await db.collection(collection.name).countDocuments()
			// if (ctx.query.related !== undefined) {
			// 	await related(collection, items)
			// }
			return {
				items,
				total
			}
		})
	}

	ctx.sbody = result
})

/**
 * 获取某条数据根据name
 */
router.get("/getByName", async (ctx) => {
	let collection = await mongo.run("cms", async (db) => {
		return await db.collection("collection").findOne({
			_id: objectId(ctx.params.collectionId)
		})
	})
	let result = await mongo.run(ctx.site.name, async (db) => {
		return await db.collection(collection.name).findOne({
			name: ctx.q.name
		})
	})

	ctx.sbody = result
})

/**
 * 获取某条数据
 */
router.get("/:id", async (ctx) => {
	let collection = await mongo.run("cms", async (db) => {
		return await db.collection("collection").findOne({
			_id: objectId(ctx.params.collectionId)
		})
	})
	let result = await mongo.run(ctx.site.name, async (db) => {
		return await db.collection(collection.name).findOne({
			_id: ctx.params.id
		})
	})

	ctx.sbody = result
})



/**
 * 新增数据
 */
router.post("/", async (ctx) => {
	let collection = await mongo.run("cms", async (db) => {
		return await db.collection("collection").findOne({
			_id: objectId(ctx.params.collectionId)
		})
	})


	_.values(collection.properties).map(prop => {
		try {
			if (prop.type == "editor" && prop.language == "json") {
				ctx.rbody[prop.name] = ctx.rbody[prop.name] && _.isString(ctx.rbody[prop.name]) ? JSON.parse(ctx.rbody[prop.name]) : ctx.rbody[prop.name]
			}
		} catch (e) {
			throw new AbstractError(`内容不合法，属性:「${prop.label}」必须是json格式数据`)
		}

	})


	ctx.rbody.createdAt = ctx.rbody.updatedAt = Math.round(Date.now() / 1000)
	let result = await mongo.run(ctx.site.name, async (db) => {
		return await db.collection(collection.name).insertOne(ctx.rbody)
	})
	ctx.sbody = _.assign({}, ctx.rbody, {
		_id: result.insertedId
	})
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
	let collection = await mongo.run("cms", async (db) => {
		return await db.collection("collection").findOne({
			_id: objectId(ctx.params.collectionId)
		})
	})
	await mongo.run(ctx.site.name, async (db) => {
		return db.collection(collection.name).bulkWrite(bulkData)
	})
	ctx.sbody = true
})

/**
 * 修改数据
 */
router.put("/:id", async (ctx) => {
	let collection = await mongo.run("cms", async (db) => {
		return await db.collection("collection").findOne({
			_id: objectId(ctx.params.collectionId)
		})
	})

	_.values(collection.properties).map(prop => {
		if (prop.type == "editor" && prop.language == "json") {
			ctx.rbody[prop.name] = ctx.rbody[prop.name] && _.isString(ctx.rbody[prop.name]) ? JSON.parse(ctx.rbody[prop.name]) : ctx.rbody[prop.name]
		}
	})
	ctx.rbody.updatedAt = Math.round(Date.now() / 1000)
	delete ctx.rbody._id
	let result = await mongo.run(ctx.site.name, async (db) => {
		return await db.collection(collection.name).update({
			_id: objectId(ctx.params.id)
		}, {
			$set: ctx.rbody
		})
	})

	ctx.sbody = !!result.result.ok
})

/**
 * 删除数据
 */
router.delete("/:id", async (ctx) => {
	let collection = await mongo.run("cms", async (db) => {
		return await db.collection("collection").findOne({
			_id: objectId(ctx.params.collectionId)
		})
	})
	let result = await mongo.run(ctx.site.name, async (db) => {
		return await db.collection(collection.name).deleteOne({
			_id: objectId(ctx.params.id)
		})
	})
	ctx.sbody = !!result.result.ok
})

module.exports = router