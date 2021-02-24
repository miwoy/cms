const Router = require("koa-router")
const {
    authenticate
} = require("../../lib/middleware")
let router = new Router()

router.get("/city", async (ctx) => {
    const CITIES = [{
        label: "北京",
        value: "北京"
    }, {
        level: 1,
        parentId: "北京",
        label: "密云",
        value: "密云"
    }, {
        level: 2,
        label: "全部",
        value: "全部"
    }, {
        level: 2,
        parentId: "密云",
        label: "大城子镇",
        value: "大城子镇"
    }, {
        level: 2,
        parentId: "密云",
        label: "北庄镇",
        value: "北庄镇"
    }, {
        level: 3,
        label: "全部",
        value: "全部"
    }, {
        level: 3,
        parentId: "大城子镇",
        label: "二寨子村",
        value: "二寨子村"
    }]
    ctx.q.level = ctx.q.level ? ctx.q.level : undefined
    let result = CITIES.filter(city => {
        return (city.parentId == ctx.q.parentId || !city.parentId || ctx.q.parentId == "全部") && city.level == ctx.q.level
    })
    ctx.sbody = result.length == 0 ? null : result
})

router.get("/shape", async (ctx) => {
    ctx.sbody = ["矩形", "圆形", "其它"]
})

router.get("/material", async (ctx) => {
    ctx.sbody = ["砖", "石", "土"]
})

router.get("/buildShape", async (ctx) => {
    ctx.sbody = ["实心", "空心", "其它"]
})

router.get("/craft", async (ctx) => {
    ctx.sbody = ["砖石堆砌", "毛石干垒", "土石混筑", "包土", "包石"]
})

router.get("/basic", async (ctx) => {
    ctx.sbody = ["自然基础", "人工基础", "混合基础", "情况不明"]
})

router.get("/years", async (ctx) => {
    ctx.sbody = ["1997", "1998", "1999"]
})

module.exports = router