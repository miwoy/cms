const Router = require("koa-router");
const fs = require("fs");
const path = require("path");
let files = [];
const basename = path.basename(module.filename);
const mongo = require("lib/service/mongo")
const objectId = require('mongodb').ObjectId;
const md5 = require('md5')
const {
    getAmis,
    execAsync
} = require("lib/common/util")
const {
    task
} = require("lib/common")
const {
    exec
} = require("child_process")
const {
    exportFile
} = require("lib/middleware")
const uuid = require("uuid")
const {
    server
} = require("application")
let router = new Router({});

let tasks = []

router.get("/:id/log/", async (ctx) => {
    let task = await mongo.run("server", async db => {
        return db.collection("task").findOne({
            _id: objectId(ctx.params.id)
        })
    })
    if (!task) throw new IsNullDataGeneralityError("任务不存在")
    ctx.sbody = task
})
/**
 * 表单 amis schema
 */
router.get("/schema", async (ctx, next) => {
    ctx.site = await mongo.run("cms", async (db) => {
        return await db.collection("site").findOne({
            _id: objectId(ctx.params.siteId)
        })
    })

    await next()
}, async (ctx) => {
    let services = await mongo.run("server", async (db) => {
        if (!ctx.q.siteId) return []
        console.log()
        let siteEnv = await db.collection("siteEnv").findOne({
            sid: ctx.q.siteId,
            envId: ctx.q.envId
        })
        if (!siteEnv) return ctx.sbody = []
        let versions = await db.collection("version").find({
            serviceId: {
                $in: siteEnv.serviceIds
            }
        }).sort({
            sequence: 1
        }).toArray()

        let services = await db.collection("service").find({
            _id: {
                $in: siteEnv.serviceIds.map(id => objectId(id))
            }
        }).toArray()

        return services.map(service => {
            service.versions = versions.filter(ver => ver.serviceId == service._id.toString())
            return service
        })

    })
    ctx.sbody = {
        controls: [{
            category: "基础服务",
            key: "basic",
            services: services.filter(p => p.category == "basic")
        }, {
            category: "业务服务",
            key: "business",
            services: services.filter(p => p.category == "business")
        }].map(item => {
            return {
                "type": "combo",
                "label": item.category,
                "name": item.key,
                "labelClassName": "text-md",
                "mode": "horizontal",
                "multiLine": true,
                "horizontal": {
                    "left": 1,
                    "right": 11
                },
                "controls": [{
                    "name": "isSelect",
                    "type": "switch",
                    "label": "全部导出",
                    "visible": item.key == "basic"
                }].concat(item.services.map(p => {
                    return {
                        "type": "combo",
                        "name": p.name,
                        "label": false,
                        "multiLine": true,
                        "visibleOn": `!this.isSelect`,
                        "controls": [{
                                "type": "checkbox",
                                "label": p.label,
                                "name": "isSelect",
                                "className": "w-sm",
                                "mode": "inline",
                                "value": false
                            }, {
                                "type": "select",
                                "name": "versionId",
                                "label": "版本",
                                "mode": "inline",
                                "required": true,
                                "searchable": true,
                                "options": p.versions,
                                "labelField": "name",
                                "valueField": "_id",
                                "requiredOn": "this.isSelect"
                            },
                            // {
                            //     "type": "select",
                            //     "name": "reversionId",
                            //     "label": "配置修订号",
                            //     "mode": "inline",
                            //     "required": false,
                            //     "searchable": true,
                            //     "source": {
                            //         "method": "get",
                            //         "url": `/api/site/${ctx.params.siteId}/collection/getByName/reversion/data?_all&document.projectId=${p._id}&document.envId=\${envId}`
                            //     },

                            //     "labelRemark": {
                            //         "icon": "fa fa-question-circle",
                            //         "trigger": [
                            //             "hover",
                            //             "focus"
                            //         ],
                            //         "className": "Remark--warning",
                            //         "content": "设置后将使用指定修订版本的配置，不设置则使用最新的配置"
                            //     },
                            //     "labelField": "code",
                            //     "valueField": "_id",
                            //     "requiredOn": "this.isSelect"
                            // }
                        ]
                    }
                }))
            }
        })

    }
})

/**
 * 导出
 */
router.post("/", async (ctx) => {
    // build 流程
    /**
     * 1. 整理需要导出的项目
     * 2. 整理与项目对应的配置库
     * 3. 将项目镜像与配置压缩至文件
     * 4. 编写项目清单
     *      1. 环境信息
     *      2. 日期
     *      3. hash
     *      4. 项目@版本号@配置库修订版本
     * 5. 文件命名规则
     *      1. 项目组合+日期+环境
     *      2. 项目组合，单项目时-项目_环境
     *      3. 项目组合，多项目时-services
     *      4. 项目组合，项目组时-分组名@latest
     */

    let {
        force,
        envId,
        _siteId: siteId,
        basic,
        business
    } = ctx.rbody
    let services = []

    async function getServices(key, value) {
        if (value.isSelect) {
            let _services = await mongo.run("server", async (db) => {
                return await db.collection("service").find({
                    category: key
                }, {
                    fields: {
                        "_id": 1,
                        "name": 1,
                        "code": 1,
                        "category": 1,
                        "type": 1,
                        "image": 1,
                        "imageUrl": 1,
                        "auth": 1
                    }

                }).toArray()
            })
            services = services.concat(_services)
        } else {
            let codes = _.keys(value).filter(key => _.isObject(value[key]) && value[key].isSelect)
            let _services = await mongo.run("server", async (db) => {
                return await db.collection("service").find({
                    name: {
                        "$in": codes
                    }
                }).toArray()
            })

            services = services.concat(_services)
        }
    }

    await getServices("basic", basic)
    await getServices("business", business)
    
    if (services.length == 0) throw new RequiredArgsGeneralityError("请选择要导出的项目")

    let env
    let site
    let siteEnv

    await mongo.run("server", async (db) => {
        env = await db.collection("env").findOne({
            _id: objectId(envId)
        })
        site = await db.collection("site").findOne({
            _id: objectId(siteId)
        })

        siteEnv = await db.collection("siteEnv").findOne({
            envId: envId,
            sid: siteId
        })

        site.dockerCompose = siteEnv.dockerCompose
        site.env = site.env || ""
        site.env += siteEnv.env
    })
    
    // 整理
    for (let service of services) {
        service.versionId = ctx.rbody[service.category][service.name] && ctx.rbody[service.category][service.name].versionId
        if (!service.versionId) {
            let versions = await mongo.run("server", async (db) => {
                return await db.collection("version").find({
                    serviceId: service._id.toString()
                }, {
                    fields: {
                        _id: 1
                    }
                }).sort({
                    sequence: 1,
                    _id: -1
                }).limit(1).toArray()
            })

            service.versionId = versions[0]._id.toString()
        }

        let etcd
        await mongo.run("server", async (db) => { 
            etcd = await db.collection("etcd").findOne({
                siteEnvId: siteEnv._id.toString(),
                serviceId: service._id.toString()
            })
        })
        
        if (service.category == "business" && !etcd) throw new InvalidArgsGeneralityError(`项目「${service.name}」未找到「${env.name}」环境的配置信息`)
        etcd = etcd || {}
        service.etcd = {
            "env": etcd.env || "",
            "before_post":  etcd.before_post || "",
            "afterPost": etcd.afterPost || "",
            "port": etcd.port
        }
    }

    let versions = await mongo.run("server", async (db) => {
        return await db.collection("version").find({
            _id: {
                "$in": services.map(service => objectId(service.versionId))
            }
        }, {
            fields: {
                _id: 1,
                name: 1
            }
        }).toArray()
    })

    // 追加版本信息
    services.map(service => {
        service.version = versions.find(v => v._id.toString() == service.versionId).name
    })

    let hash = md5(JSON.stringify({
        envId: envId,
        site,
        services
    }))

    if (!force) { // 缓存检测
        let tasks = await mongo.run("server", async db => {
            return db.collection("task").find({
                hash: hash
            }).limit(1).sort({
                "sequence": 1,
                "_id": -1
            }).toArray()
        })
        let task = tasks[0]
        if (task) {
            return ctx.sbody = {
                "taskId": task._id
            }
        }
    }
    let task = {
        createdAt: Date.now() / 1000,
        updatedAt: Date.now() / 1000,
        sequence: -Date.now() / 1000,
        envId: envId,
        env: env.label,
        site: site.label,
        siteId: siteId,
        finished: false,
        hash: hash,
        services: services,
        log: []
    }

    let result = await mongo.run("server", async (db) => {
        return db.collection("task").insertOne(task)
    })
    task = _.assign({}, task, {
        _id: result.insertedId
    })

    server.buildGroup(task, site, env, services).then(async (url) => {
        mongo.run("server", async db => {
            await db.collection("task").updateOne({
                _id: task._id
            }, {
                "$set": {
                    finished: true,
                    downloadUrl: url.replace("src", "")
                }
            })
        })
    }).catch(async (err) => {
        console.log("error", err)
        mongo.run("server", async db => {
            await db.collection("task").updateOne({
                _id: task._id
            }, {
                "$set": {
                    finished: true,
                    error: err.message
                }
            })
        })
    })

    // 开始构建
    ctx.sbody = {
        "taskId": task._id
    }
})


/**
 * 下载导出文件
 */
router.get("/file", async (ctx) => {

    let task = await mongo.run("server", async db => {
        return await db.collection("task").findOne({
            _id: objectId(ctx.q.taskId)
        })
    })
    if (!task || !task.downloadUrl) throw new IsNullDataGeneralityError("文件不存在")
    ctx.set("Content-Type", "application/octet-stream");
    ctx.set("Content-Disposition", "attachment; filename=" + encodeURIComponent(task.downloadUrl.split("/").pop()));
    ctx.body = fs.createReadStream(path.join("src", task.downloadUrl))
})

/**
 * 增加版本控制管理
 */


module.exports = router;