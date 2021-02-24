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


router.post("/deploy", async (ctx)=> {
    let site = await mongo.run("cms", async(db)=> {
        return db.collection("site").findOne({
            _id: objectId(ctx.params.siteId),
            name: "deployment"
        })
    })

    if (!site) throw new InvalidArgsGeneralityError(`无效的siteId:${ctx.params.siteId}`)
    ctx.sbody = "部署成功"

})


module.exports = router;