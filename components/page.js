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
module.exports = (schema) => {
    return {
        "type": "page",
        "title": `${schema.label}管理`,
        "data": {
            "siteId": schema.siteId
        },
        "body": [{
            "type": "crud",
            "name": "page",
            "syncLocation": false,
            "alwaysShowPagination": true,
            "columnsTogglable": true,
            "api": `get:/api/site/${schema.siteId}/page`,
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
            "columns": _.values(schema.properties).map((prop) => {
                return {
                    type: convert(prop.type),
                    tpl: convert(prop.type) == "tpl" ? "${" + prop.name + "|truncate:10}" : undefined,
                    popOver: convert(prop.type) == "tpl" ? {
                        "body": {
                            "type": "tpl",
                            "tpl": `$${prop.name}`
                        }
                    } : undefined,
                    label: prop.label,
                    name: prop.name,
                    sortable: prop.sortable,
                    searchable: prop.searchable,
                    filterable: prop.type == "select" ? {
                        "options": prop.options || undefined,
                        "source": prop.source
                    } : false,
                    width: prop.width || "100px",
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
                        "actionType": "drawer",
                        "drawer": {
                            "type": "page",
                            "actions": [{
                                "type": "button",
                                "close": true,
                                "label": "关闭"
                            }],
                            "size": "lg",
                            "position": "top",
                            "body": {
                                "type": "iframe",
                                "src": "/editor/#/edit/0",
                                "events": {
                                    "detail": {
                                        "actionType": "dialog",
                                        "dialog": {
                                            "title": "数据确认",
                                            "size": "lg",
                                            "body": {
                                                "type": "form",
                                                "debug": conf.debug,
                                                "trimValues": true,
                                                "promptPageLeave": true,
                                                "reload": "page",
                                                "api": {
                                                    "method": "put",
                                                    "url": `/api/site/${schema.siteId}/page/$_id`
                                                },
                                                "controls": [].concat(_.values(schema.properties))
                                            }
                                        }
                                    },
                                    "close": {
                                        "actionType": "close"
                                    }
                                }
                            },
                            "closeOnEsc": true,
                            "closeOnOutside": true,
                            "bodyClassName": "m-none p-none no-border w-full"
                        }
                    },
                    {
                        "type": "button",
                        "icon": "fa fa-times text-danger",
                        "reload": "app",
                        "actionType": "ajax",
                        "label": "删除",
                        "confirmText": "您确认要删除?",
                        "api": `delete:/api/site/${schema.siteId}/page/$_id`
                    }
                ],
                "toggled": true
            }])
        }],
        "toolbar": [{
            "type": "button",
            "label": "新增",
            "actionType": "drawer",
            "drawer": {
                "type": "page",
                "actions": [{
                    "type": "button",
                    "close": true,
                    "label": "关闭"
                }],
                "size": "lg",
                "position": "top",
                "data": {},
                "body": {
                    "type": "iframe",
                    "src": "/editor/#/edit/0",
                    "events": {
                        "detail": {
                            "actionType": "dialog",
                            "dialog": {
                                "title": "数据确认",
                                "size": "lg",
                                "body": {
                                    "type": "form",
                                    "debug": conf.debug,
                                    "trimValues": true,
                                    "promptPageLeave": true,
                                    "reload": "page",
                                    "data": {
                                        "siteId": schema.siteId,
                                    },
                                    "api": {
                                        "method": "post",
                                        "url": `/api/site/${schema.siteId}/page`
                                    },
                                    "controls": [].concat(_.values(schema.properties))
                                }
                            }
                        },
                        "close": {
                            "actionType": "close"
                        }
                    }
                },
                "closeOnEsc": true,
                "closeOnOutside": true,
                "bodyClassName": "m-none p-none no-border w-full"
            }
        }]
    }
}