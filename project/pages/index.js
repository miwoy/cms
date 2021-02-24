const fs = require("fs");
const path = require("path");

const basename = path.basename(module.filename);
let pages;

if (!pages) {
	pages = {};
	fs
		.readdirSync(__dirname)
		.filter(function(file) {
			return (file.indexOf(".") !== 0) && (file !== basename);
		})
		.forEach(function(file) {
			pages[file.split(".js")[0]] = require(path.join(__dirname, file));
		});
}

module.exports = pages;
