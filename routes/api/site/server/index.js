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

module.exports = router