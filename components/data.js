function convert(prop) {
    let result = {
        type: prop.type,
        width: prop.width || 150
    }
    let CONFIG = {
        "tpl": {
            type: "tpl",
            tpl: `\${${prop.name}|truncate:15}`,
            popOver: {
                "body": {
                    "type": "tpl",
                    "tpl": `$${prop.name}`
                }
            },
            filterable: prop.type == "select" ? {
                "options": prop.options || undefined,
                "source": prop.source
            } : false,
            searchable: prop.type != "select",
            width: prop.width || 150,
        },
        "json": {
            type: "json",
            width: prop.width || 200,
        },
        "mapping": {
            type: "mapping",
            map: prop.options && prop.options.reduce((acc, cur) => {
                acc[cur.value] = cur.label
                return acc
            }, {
                "*": "未知"
            }),
            filterable: prop.type == "select" ? {
                "options": prop.options || undefined,
                "source": prop.source
            } : false,
            width: prop.width || 100,
        },
        "link": {
            type: "link",
            href: `\${${prop.name}}`,
            body: `\${${prop.name}|split:/|last}`,
            width: prop.width || 200,
        }

    }

    switch (prop._ref) {
        case "text":
        case "textarea":
        case "number":
        case "rich-text":
        case "chained-select":
            result = CONFIG["tpl"]
            break;
        case "static":
            result = prop
            break;
        case "code":
            result = CONFIG["tpl"]
            result.searchable = false
            break
        case "json":
            result = CONFIG["json"]
            break;
        case "enum":
        case "related":
            if (prop.options) {
                result = CONFIG["mapping"]
            } else {
                result = {
                    filterable: {
                        "options": prop.options || undefined,
                        "source": prop.source
                    },
                    width: prop.width || 150,
                    "quickEdit": {
                        ...prop,
                        disabled: true,
                        mode: "inline",
                        label: false
                    }
                }
            }
            break;
        case "custom":
            result = CONFIG["json"]
            break
        case "file":
            result = {
                type: "link",
                href: `\${${prop.name}}`,
                body: `\${${prop.name}|split:/|last}`,
                width: prop.width || 200,
            }
            if (prop.multiple) {
                result = {
                    type: "each",
                    items: {
                        type: "link",
                        href: `\${item}`,
                        body: `\${item|split:/|last}`,
                        className: "block",
                        blank: true
                    },
                    width: prop.width || "200px",
                }
            }
            break

    }

    return result
}

module.exports = (siteId, collection) => {
    return {
        "type": "page",
        "title": `数据-${collection.label}`,
        "data": {
            "siteId": siteId,
            "collectionId": collection._id
        },
        "body": [{
            "type": "crud",
            "syncLocation": false,
            "alwaysShowPagination": true,
            "draggable": true,
            "saveOrderApi": `put:/api/site/${siteId}/collection/${collection._id}/data/setSequence`,
            "columnsTogglable": true,
            "api": `get:/api/site/${siteId}/collection/${collection._id}/data?related`,
            "filterTogglable": true,
            "defaultParams": {
                "perPage": 10
            },
            "headerToolbar": [
                // "filter-toggler",
                "statistics",
                "export-excel"
            ],
            "footerToolbar": [
                "switch-per-page",

                "pagination"
            ],
            "columns": _.values(collection.properties).map((prop) => {
                return {
                    ...convert(prop),
                    label: prop.label,
                    name: prop.name,
                    sortable: prop.sortable,
                    toggled: !prop.hidden
                }

            }).concat([{
                "type": "operation",
                "label": "操作",
                "width": 100,
                "fixed": "right",
                "buttons": [{
                        "type": "button",
                        "icon": "fa fa-pencil",
                        "label": "编辑",
                        "actionType": "dialog",
                        "dialog": {
                            "position": "top",
                            "size": "lg",
                            "title": "编辑",
                            "body": {
                                "type": "form",
                                "debug": conf.debug,
                                "name": "sample-edit-form",
                                "api": `put:/api/site/${siteId}/collection/getByName/${collection.name}/data/$_id`,
                                "controls": _.values(collection.properties)
                            }
                        }
                    },
                    {
                        "type": "button",
                        "icon": "fa fa-pencil",
                        "label": "克隆",
                        "actionType": "dialog",
                        "dialog": {
                            "position": "top",
                            "size": "lg",
                            "title": "克隆",
                            "body": {
                                "type": "form",
                                "debug": conf.debug,
                                "data": {
                                    "_id": null
                                },
                                "name": "sample-edit-form",
                                "api": `post:/api/site/${siteId}/collection/getByName/${collection.name}/data`,
                                "controls": _.values(collection.properties)
                            }
                        }
                    },
                    {
                        "type": "button",
                        "icon": "fa fa-times text-danger",
                        "actionType": "ajax",
                        "label": "删除",
                        "confirmText": "您确认要删除?",
                        "api": `delete:/api/site/${siteId}/collection/${collection._id}/data/$_id`
                    }
                ],
                "toggled": true
            }])
        }],
        "toolbar": [{
            "label": "新增",
            "type": "button",
            "actionType": "dialog",
            "level": "primary",
            "className": "m-b-sm",
            "dialog": {
                "title": "新增表单",
                "size": "lg",
                "body": {
                    "type": "form",
                    "debug": conf.debug,
                    "canAccessSuperData": false,
                    "api": {
                        "method": "post",
                        "url": `/api/site/${siteId}/collection/getByName/${collection.name}/data`
                    },
                    "controls": _.values(collection.properties)
                }
            }
        }]
    }
}