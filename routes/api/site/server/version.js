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

router.post("/:serviceName", async (ctx) => {
    if (!ctx.params.serviceName) throw new RequiredArgsGeneralityError("服务简称")
    if (!ctx.rbody.version) throw new RequiredArgsGeneralityError("version")
    let result = await mongo.run("server", async db => {
        let service = await db.collection("service").findOne({
            name: ctx.params.serviceName
        })

        if (!service) throw new RequiredDataGeneralityError("service")
        let versionExists = await db.collection("version").count({
            name: ctx.rbody.version,
            serviceId: service._id.toString()
        })

        if (!versionExists) {
            let now = Date.now() / 1000;
            return await db.collection("version").insertOne({
                createdAt: now,
                updatedAt: now,
                sequence: -Date.now(),
                name: ctx.rbody.version,
                serviceId: service._id.toString()
            })
        }

    })
    ctx.sbody = "ok"
})

module.exports = router