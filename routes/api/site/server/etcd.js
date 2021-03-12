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

router.post("/clone", async ctx => {
    if (!ctx.rbody._siteId) throw new RequiredArgsGeneralityError("_siteId")
    if (!ctx.rbody.envId) throw new RequiredArgsGeneralityError("envId")
    if (!ctx.rbody.targetEnvId) throw new RequiredArgsGeneralityError("targetEnvId")

    let result = await mongo.run("server", async db => {
        let siteServices = await db.collection("siteService").find({
            siteId: ctx.rbody._siteId
        }).toArray();
        let etcds = await db.collection("etcd").find({
            siteServiceId: {
                $in: siteServices.map(ss=>ss._id.toString())
            },
            envId: ctx.rbody.envId
        }).toArray()

        if (etcds && etcds.length > 0) {
            let exists = await db.collection("etcd").count({
                siteServiceId: {
                    $in: siteServices.map(ss=>ss._id.toString())
                },
                envId: ctx.rbody.targetEnvId
            })

            if (exists) throw new InvalidArgsGeneralityError("目标环境配置已存在")
            let env = await db.collection("env").findOne({
                _id: objectId(ctx.rbody.targetEnvId)
            })

            let now =  Date.now() / 1000
            return await db.collection("etcd").insertMany(etcds.map(etcd=>{
                delete etcd._id
                return {
                    ...etcd,
                    createdAt: now,
                    updatedAt: now,
                    sequence: now,
                    envId: ctx.rbody.targetEnvId,
                    label: etcd.label.split("-").slice(0, -1).concat([env.label]).join("-")
                }
            }))
        } else {
            throw new InvalidArgsGeneralityError("原环境配置不存在")
        }
    })

    ctx.sbody = result && result.insertedIds
})

router.post("/", async (ctx) => {})

router.put("/:id", async (ctx) => {})
router.delete("/:id", async (ctx) => {})

module.exports = router