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

router.get("/:id/log/", async (ctx) => {
    let taskD = tasks.find(t => t.id == ctx.params.id)
    if (!taskD) throw new IsNullDataGeneralityError("任务不存在")
    ctx.sbody = taskD
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

/**
 * 导出
 */
router.post("/", async (ctx)=> {
    // build 流程
    /**
     * 1. 整理需要导出的项目
     * 2. 整理与项目对应的配置库
     * 3. 将项目镜像与配置压缩至文件
     * 4. 编写项目清单
     *      1. 环境信息
     *      2. 日期
     *      3. hash
     *      4. 项目@版本号@配置库版本
     * 5. 文件命名规则
     *      1. 项目组合+日期+环境
     *      2. 项目组合，单项目时-项目@版本
     *      3. 项目组合，多项目时-projects
     *      4. 项目组合，项目组时-分组名@latest
     */
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

/**
 * 下载导出文件
 */
router.get("/build/file", async (ctx)=> {
    ctx.set("Content-Type", "application/pdf");
	ctx.set("Content-Disposition", "attachment; filename=README.md");    
    ctx.body = fs.createReadStream(`README.md`)
})

/**
 * 增加版本控制管理
 */


module.exports = router;