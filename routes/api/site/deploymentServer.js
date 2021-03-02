const Router = require("koa-router");
const fs = require("fs");
const path = require("path");
let files = [];
const basename = path.basename(module.filename);
const mongo = require("lib/service/mongo")
const objectId = require('mongodb').ObjectId;
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
const { exportFile } = require("lib/middleware")
const uuid = require("uuid")
let router = new Router({});

let tasks = []

router.get("/log/:taskId", async (ctx) => {
    let taskD = tasks.find(t => t.id == ctx.params.taskId)
    if (!taskD) throw new IsNullDataGeneralityError("任务不存在")
    ctx.sbody = taskD
})

router.get("/build/schema", async (ctx, next) => {
	ctx.site = await mongo.run("cms", async (db) => {
		return await db.collection("site").findOne({
			_id: objectId(ctx.params.siteId)
		})
	})

	await next()
}, async (ctx) => {
    let projects = await mongo.run(ctx.site.name, async (db) => {
        return await db.collection("project").find().sort({
            sequence: 1
        }).toArray()
    })
    ctx.sbody = {
        controls: [{
            category: "基础服务",
            key: "basic",
            projects: projects.filter(p=>p.category=="basic")
        }, {
            category: "业务服务",
            key: "business",
            projects: projects.filter(p=>p.category=="business")
        }].map(item=> {
            return {
                "type": "container",
                "label": item.category,
                "labelClassName": "text-md",
                "inputClassName": "b-a p-t p-r",
                "mode": "horizontal",
                "horizontal": {
                    "left":1,
                    "right":11
                },
                "controls": [{
                    "name": item.key,
                    "type": "switch",
                    "label": "全部导出",
                    "visible": item.key == "basic"
                }].concat(item.projects.map(p=>{
                    return {
                        "type": "combo",
                        "name": p.code,
                        "label": p.name,
                        "multiLine": true,
                        "visibleOn": `!this.${item.key}`,
                        "controls": [{
                            "type": "switch",
                            "label": "导出",
                            "name": "isSelect",
                            "mode": "inline",
                            "value": false
                        }, {
                            "type": "select",
                            "name": "versionId",
                            "label": "版本",
                            "mode": "inline",
                            "required": true,
                            "searchable": true,
                            "source": {
                                "method": "get",
                                "url": `/api/site/${ctx.params.siteId}/collection/getByName/version/data?_all&projectId=${p._id}`
                            },
                            "labelField": "name",
                            "valueField": "_id",
                            "visibleOn": "this.isSelect"
                        }, {
                            "type": "service",
                            "data": {
                                "count": 1
                            },
                            "api": `/api/site/$siteId/collection/getByName/etcd/data/count?projectId=${p._id}&envId=$envId&versionId=$versionId`,
                            "controls": [{
                                "type": "switch",
                                "name": "useParent",
                                "label": "使用父级配置",
                                "required": true,
                                "value": false,
                                "visibleOn": "!this.count"
                            }, {
                                "type": "tpl",
                                "tpl": "<span style='color:red'>*不存在该版本配置信息,是否使用父级配置</span>",
                                "visibleOn": "!this.count && !this.useParent"
                            }],
                            "mode": "inline",
                            "visibleOn": "this.versionId"
                        }]
                    }
                }))
              }
        })
         
    }
})

router.post("/build", async (ctx)=> {
    let id = Math.random().toString()
    let taskD = task.createTasker(id)
    tasks.push(taskD)
    taskD.start()
    let i = 5
    let t = setInterval(()=> {
        taskD.pushLog("asd"+i--)
        if (i==0) {
            clearInterval(t)
            taskD.finish()
        }
    }, 1000)
    ctx.sbody = {
        "taskId": id
    }
})

router.get("/build/file", async (ctx)=> {
    ctx.set("Content-Type", "application/pdf");
	ctx.set("Content-Disposition", "attachment; filename=README.md");    
    ctx.body = fs.createReadStream(`README.md`)
})

module.exports = router;