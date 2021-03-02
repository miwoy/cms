const Router = require("koa-router");
const fs = require("fs");
const path = require("path");
const inflection = require("inflection"); // 复数转化
let files = [];
let routes = null;
const basename = path.basename(module.filename);
const mongo = require("lib/service/mongo")
const {
	getAmis
} = require("lib/common/util")
let router = new Router({
	prefix: "/api"
});


files = fs
	.readdirSync(__dirname)
	.filter(function (file) {
		return (file.indexOf(".") !== 0) && (file !== basename);
	});
files.map(function (file) {
	var _router = require(path.join(__dirname, file));
	file = file.split(".js")[0];
	router.use("/" + file.split(".js")[0], _router.routes());
	return file;
});

router.post("/upload", async (ctx) => {
	ctx.sbody = {
		value: ctx.request.files.file,
		url: `${ctx.request.origin}${ctx.request.files.file}`
	}
})

async function upload(ctx, next) {
	let files = _.keys(ctx.request.files).map(key => ctx.request.files[key].toJSON())
	// 转存
	let filePath = conf.storeDir
	const charLen = 2
	if (!filePath) throw new RequiredDataGeneralityError("未配置存储目录")
	for (let i = 0; i < files.length; i++) {
		let file = files[i]
		try {
			for (let j = 0; j < file.hash.length; j += charLen) {

				filePath = path.join(filePath, file.hash.slice(j, j + charLen))
				if (!fs.existsSync(filePath)) {
					fs.mkdirSync(filePath)
				}
			}
			filePath = path.join(filePath, file.name)
			fs.renameSync(path.resolve(file.path), path.resolve(filePath))
			file.path = filePath.replace("src", "")
		} catch (e) {
			fs.unlink(file.path)
			throw e
		}
	}
	let bulkData = files.map(file => {
		file = {
			updateOne: {
				filter: {
					hash: file.hash
				},
				update: {
					$set: file
				},
				upsert: true
			}
		}

		return file
	})
	await mongo.run("cms", async (db) => {
		return await db.collection("file").bulkWrite(bulkData)
	})
	_.keys(ctx.request.files).forEach((key, i) => {
		ctx.request.files[key] = files[i]
	})
	await next()
}

router.post("/upload/file", upload, async (ctx) => {
	ctx.sbody = {
		value: ctx.request.files.file.path,
		url: `${ctx.request.origin}${ctx.request.files.file}`
	}
})

router.get("/", async (ctx) => {
	if (!routes) {

		routes = files.reduce((t, i) => {
			let key = i.indexOf(".js") >= 0 ? inflection.pluralize(i.split(".js")[0]) : i;
			t[key] = `${ctx.request.origin}${path.resolve(ctx.path, key)}`;
			return t;
		}, {});
	}

	ctx.sbody = routes;
});

module.exports = router;