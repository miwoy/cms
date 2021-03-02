
function convert(prop) {
    let result = prop
    switch (prop) {
        case "textarea":
        case "select":
        case "number":
        case "file":
        case "rich-text":
        case "chained-select":
            result = "tpl"
            break;
        case "editor":
            result = "json"
            break;

    }
    return result
}
module.exports = (siteId, collectionSchema, collection, properties) => {
    return {
        "type": "page",
        "title": `模型-${collection.label}`,
        "data": {
            "siteId": siteId
        },
        "body": {
            "type": "hbox",
            "columns": [{
                "type": "panel",
                "title": "字段列表",
                "name": "list",
                "className": "no-border m-r-lg",
                "columnClassName": "w-md",
                "body": [{
                    "type": "form",
                    "wrapWithPanel": false,
                    "target": "properties",
                    "controls": [{
                        "type": "switch",
                        "option": "显示系统字段",
                        "name": "showSystem",
                        "value": false
                    }, {
                        "type": "crud",
                        "name": "properties",
                        "draggable": true,
                        "saveOrderApi": `put:/api/site/${siteId}/collection/${collection._id}/property/setSequence`,
                        "syncLocation": false,
                        "mode": "cards",
                        "itemClassName": "w-xxl m-xs",
                        "api": `get:/api/site/${siteId}/collection/${collection._id}/property`,
                        "card": {
                            "header": {
                                "title": "${label}",
                                "subTitle": "#$_property.label",
                                "description": "$description",
                                // "avatarClassName": "pull-left thumb-md avatar b-3x m-r",
                                "avatarText": "$type",
                                "avatar": "$_property.avatar"
                            },
                            // "className": "w-lg",
                            "actions": [{
                                "type": "button",
                                "level": "link",
                                "label": "编辑",
                                "actionType": "dialog",
                                "reload": "properties",
                                "dialog": {
                                    "title": "编辑",
                                    "size": "lg",
                                    "body": {
                                        "type": "form",
                                        "debug": conf.debug,
                                        "api": `put:/api/site/${siteId}/collection/${collection._id}/property/$name`,
                                        "controls": [{
                                            "type": "service",
                                            "schemaApi": {
                                                "method": "get",
                                                "url": "/api/property/$_ref?type=amis"
                                            }
                                        }]
                                    }
                                }
                            }, {
                                "type": "button",
                                "label": "删除",
                                "actionType": "ajax",
                                "confirmText": "您确认要删除?",
                                "reload": "properties",
                                "api": `delete:/api/site/${siteId}/collection/${collection._id}/property/$name`
                            }],
                            "visibleOn": "!this.system || this.showSystem"
                        }
    
                    }]
                }]
            }, {
                "type": "panel",
                "title": "属性类型",
                "className": "no-border m-r-lg",
                "columnClassName": "w-xs",
                "body": {
                    "type": "button-group",
                    "vertical": true,
                    "buttons": properties.map(prop => {
                        return {
                            "type": "button",
                            "label": prop.label,
                            "size": "lg",
                            "level": "light",
                            "icon": prop.icon,
                            "iconClassName": "pull-left",
                            "className": "m-b no-border",
                            "actionType": "dialog",
                            "reload": "list.properties",
                            "dialog": {
                                "title": "新增属性",
                                "size": "lg",
                                "body": {
                                    "type": "form",
                                    "debug": conf.debug,
                                    "api": `post:/api/site/${siteId}/collection/${collection._id}/property`,
                                    "controls": _.values(prop.properties)
                                }
                            }
                        }
                    })
                }
            }]
        },
        "toolbar": [{
            "type": "button-group",
            "buttons": [{
                    "type": "button",
                    "label": "修改模型",
                    "actionType": "dialog",
                    "dialog": {
                        "title": "修改模型",
                        "actions": [{
                            "label": "提交",
                            "actionType": "submit",
                            "close": true,
                            "primary": true,
                            "reload": "app",
                            "type": "button"
                        }],
                        "body": {
                            "type": "form",
                            "data": _.values(collectionSchema.properties).reduce((acc, cur) => {
                                acc[cur.name] = acc[cur.value] || collection[cur.name]
                                return acc
                            }, {}),
                            "debug": conf.debug,
                            "api": `put:/api/site/${siteId}/collection/${collection._id}`,
                            "controls": _.values(collectionSchema.properties)
                        }
                    }
                },
                {
                    "type": "button",
                    "label": "删除模型",
                    "actionType": "ajax",
                    "confirmText": "您确认要删除?",
                    "reload": "app",
                    "api": `delete:/api/site/${siteId}/collection/${collection._id}`
                }
            ]
        }]
    }
}