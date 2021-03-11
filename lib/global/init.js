const fs = require('fs')
const path = require('path')
const config = require("../config");


if (config.uploadDir) { // 初始化上传目录
    if (!fs.existsSync(config.uploadDir)) {
        fs.mkdirSync(config.uploadDir)
    }
}

if (config.downloadDir) { // 初始化下载目录
    if (!fs.existsSync(config.downloadDir)) {
        fs.mkdirSync(config.downloadDir)
    }
}


if (config.storeDir) { // 初始化存储目录
    if (!fs.existsSync(config.storeDir)) {
        fs.mkdirSync(config.storeDir)
    }
}

if (config.deployDir) { // 初始化存储目录
    if (!fs.existsSync(config.deployDir)) {
        fs.mkdirSync(config.deployDir)
    }
}