module.exports = [{
    "name": "site",
    "label": "站点",
    "properties": {
        "label": {
            "label": "站点别名",
            "name": "label",
            "type": "text",
            "required": true,
            "mode": "horizontal",
            "validations": {
                "minLength": 1,
                "maxLength": 20
            }
        },
        "name": {
            "label": "站点名(不重复)",
            "name": "name",
            "type": "text",
            "required": true,
            "mode": "horizontal",
            "validations": {
                "minLength": 1,
                "maxLength": 20
            }
        },
        "path": {
            "label": "路径",
            "name": "path",
            "type": "text",
            "required": true,
            "mode": "horizontal",
            "validations": {
                "minLength": 1,
                "maxLength": 100
            }
        },
        "icon": {
            "label": "图标",
            "name": "icon",
            "type": "text",
            "mode": "horizontal"
        }
    }
}]