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

router.post("/", async (ctx) => {
})

router.put("/:id", async(ctx)=> {
})
router.delete("/:id", async(ctx)=> {
})

module.exports = router