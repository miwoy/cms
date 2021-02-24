const Router = require("koa-router");
const fs = require("fs");
const path = require("path");

const basename = path.basename(module.filename);
let router = new Router();
let files = []

router.get("/test", async (ctx) => {
	await ctx.render("test")
})


files = fs
	.readdirSync(__dirname)
	.filter(function (file) {
		return (file.indexOf(".") !== 0) && (file !== basename);
	})
files = files.map(function (file) {
	file = file.split(".js")[0]
	var _router = require(path.join(__dirname, file));
	router.use(_router.routes(), _router.allowedMethods());
	return file
});

module.exports = router;