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

router.post("/data", async (ctx, next) => {
    await next()

    // 初始化配置
    let site = ctx.sbody.data
    
    if (site.initable) {
        await mongo.run("server", async(db)=> {
            let envs = await db.collection("env").find().sort({
                sequence: 1
            }).toArray()
            let project = await db.collection("project").findOne({
                _id: objectId(site.projectId)
            })

            let services = await db.collection("service").find({
                _id: {
                    $in: project.serviceIds.map(id=>objectId(id))
                }
            }).toArray()

            let bulkData = services.reduce((bulkData, service) => {
                bulkData = bulkData.concat(envs.map(env=>{
                    return {
                        updateOne: {
                            filter: {
                                serviceId: service._id.toString(),
                                siteId: site._id.toString(),
                                envId: env._id.toString()
                            },
                            update: {
                                "$set": {
                                    serviceId:  service._id.toString(),
                                    siteId: site._id.toString(),
                                    envId: env._id.toString(),
                                    appconf: "",
                                    label: [project.label, site.label, env.label, service.label].join("-")
                                }
                            },
                            upsert: true
                        }
                    }
                }))

                return bulkData
            }, [{
                updateOne: {
                    filter: {
                        serviceId: service._id.toString(),
                        siteId: site._id.toString()
                    },
                    update: {
                        "$set": {
                            serviceId:  service._id.toString(),
                            siteId: site._id.toString(),
                            appconf: "",
                            label: [project.label, site.label, service.label].join("-")
                        }
                    },
                    upsert: true
                }
            }])

            await db.collection("etcd").bulkWrite(bulkData)
        })
    }
})

router.delete("/data/:id", async (ctx, next)=> {
    await next()
    await mongo.run("server", async(db)=> {
        await db.collection("etcd").deleteMany({
            siteId: ctx.params.id
        })
    })
})


module.exports = router