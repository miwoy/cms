const Router = require("koa-router");
const fs = require("fs");
const path = require("path");
const mongo = require("lib/service/mongo")
const objectId = require('mongodb').ObjectId
const menu = require("project/menu")
const pages = require("project/pages")

/**
 * 如果不设置prefix: "/"，则为默认路由配置
 * 所有未找到的地址都将匹配到index处理器上
 * @type {[type]}
 */
const basename = path.basename(module.filename);
let router = new Router({});



fs
    .readdirSync(__dirname)
    .filter(function (file) {
        return (file.indexOf(".") !== 0) && (file !== basename);
    })
    .forEach(function (file) {
        var _router = require(path.join(__dirname, file));
        router.use("/" + file.split(".js")[0], _router.routes(), _router.allowedMethods());
    });


/**
 * 路由示例
 * 127.0.0.1:3000
 */
router.get("/", async (ctx) => {
    let site =  await mongo.run("cms", async(db)=>{
        return await db.collection("site").findOne({
            path: "/",
            enabled: true
        })
    })
    if(!site) throw new IsNullDataGeneralityError("未匹配到相关站点")
    await ctx.render("index", site)
});


router.get("/:path", async (ctx) => {
    let site =  await mongo.run("cms", async(db)=>{
        return await db.collection("site").findOne({
            path: path.join("/", ctx.params.path),
            enabled: true
        })
    })
    if(!site) throw new IsNullDataGeneralityError("未匹配到相关站点")
    await ctx.render("index", site)
});

/**
 * 菜单配置，为了可以动态刷新
 */
router.get("/pages/:siteId", async (ctx)=> {
    let site =  await mongo.run("cms", async(db)=>{
        return await db.collection("site").findOne({
            _id: objectId(ctx.params.siteId),
            enabled: true
        })
    })
    ctx.sbody = site.menu
})

module.exports = router;