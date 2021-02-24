module.exports = [{
    name: "page",
    label: "页面",
    properties: {
        "_id": {
            "type": "text",
            "label": "_id",
            "name": "_id",
            "hidden": true,
            "sortable": true,
            "searchable": true,
            "mode": "horizontal",
            "clearValueOnHidden": true
        },
        "sequence": {
            "type": "number",
            "name": "sequence",
            "label": "排序字段",
            "hidden": true,
            "mode": "horizontal",
            "clearValueOnHidden": true
        },
        "createdAt": {
            "type": "datetime",
            "label": "创建时间",
            "name": "createdAt",
            "hidden": true,
            "value": "+0days",
            "mode": "horizontal",
            "clearValueOnHidden": true
        },
        "updatedAt": {
            "type": "datetime",
            "label": "修改时间",
            "name": "updatedAt",
            "hidden": true,
            "value": "+0days",
            "mode": "horizontal",
            "clearValueOnHidden": true
        },
        "type": {
            "type": "text",
            "label": "类型",
            "name": "type",
            "value": "page",
            "hidden": true
        },
        "title": {
            "label": "Title",
            "name": "title",
            "type": "text",
            "required": true,
            "mode": "horizontal",
            "sortable": true,
            "searchable": true,
            "validations": {
                "minLength": 1,
                "maxLength": 20
            }
        },
        "name": {
            "label": "Name",
            "name": "name",
            "type": "text",
            "required": true,
            "mode": "horizontal",
            "sortable": true,
            "searchable": true,
            "validations": {
                "minLength": 1,
                "maxLength": 20
            }
        },
        "body": {
            "label": "Body",
            "name": "body",
            "type": "editor",
            "language": "json",
            "value": {},
            "required": true,
            "mode": "horizontal"
        },
        "toolbar": {
            "label": "Toolbar",
            "name": "toolbar",
            "type": "editor",
            "language": "json",
            "value": {},
            "required": true,
            "mode": "horizontal"
        }
    }
}]