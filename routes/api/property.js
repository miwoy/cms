const Router = require("koa-router")
const {
    authenticate
} = require("../../lib/middleware")
const qs = require("qs")
const uuid = require("uuid")
const mongo = require("lib/service/mongo")
const objectId = require('mongodb').ObjectId
const {
    getAmis
} = require("lib/common/util")
let router = new Router()


/**
 * 获取属性
 */
router.get("/:name", async (ctx) => {
    let property = require("data/property").find(prop => prop.name == ctx.params.name)

    ctx.sbody = ctx.query.type == "amis" ? getAmis(property) : property
})


module.exports = router