function convert(prop) {
    let result = prop.type
    switch (prop.type) {
        case "textarea":
        case "number":
        case "file":
        case "rich-text":
        case "chained-select":
            result = "tpl"
            break;
        case "editor":
            result = "json"
            break;
        case "select":
            if (prop.options) {
                result = "mapping"
            } else {
                result = "tpl"
            }
            break;

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
            "saveOrderApi": `put:/api/site/${siteId}/collection/${collection._id}/data/sequence`,
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
                    type: convert(prop),
                    tpl: convert(prop) == "tpl" ? "${" + prop.name + (prop.options ? `|find:${escape(JSON.stringify(prop.options))}` : "") + "|truncate:32}" : undefined,
                    map: prop.options && prop.options.reduce((acc,cur)=>{
                        acc[cur.value] = cur.label
                        return acc
                    },{
                        "*": "未知"
                    }),
                    popOver: convert(prop) == "tpl" ? {
                        "body": {
                            "type": "tpl",
                            "tpl": `$${prop.name}`
                        }
                    } : undefined,
                    label: prop.label,
                    name: prop.name,
                    sortable: prop.sortable,
                    searchable: prop.type != "select",
                    filterable: prop.type == "select" ? {
                        "options": prop.options || undefined,
                        "source": prop.source
                    } : false,
                    width: prop.width || "200px",
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
                                "api": `put:/api/site/${siteId}/collection/${collection._id}/data/$_id`,
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
                        "url": `/api/site/${siteId}/collection/${collection._id}/data`
                    },
                    "controls": _.values(collection.properties)
                }
            }
        }]
    }
}