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
        "body": [{
            "type": "crud",
            "syncLocation": false,
            "alwaysShowPagination": true,
            "draggable": true,
            "saveOrderApi": `put:/api/site/sequence`,
            "columnsTogglable": true,
            "api": `get:/api/${schema.name}`,
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
                    // searchable: true,
                    filterable: prop.type=="select"? {
                        "options": prop.options || undefined,
                        "source": prop.source
                    }: false,
                    width: prop.width || "100px",
                    toggled: !prop.hidden
                }
            }).concat([{
                "type": "operation",
                "label": "操作",
                "width": 100,
                "fixed": "right",
                "buttons": [
                    {
                        "type": "button",
                        "icon": "fa fa-pencil",
                        "label": "编辑",
                        "actionType": "dialog",
                        "dialog": {
                            "position": "top",
                            "size": "md",
                            "title": "编辑",
                            "body": {
                                "type": "form",
                                "debug": conf.debug,
                                "name": "sample-edit-form",
                                "reload": "app",
                                "api": `put:/api/${schema.name}/$_id`,
                                "controls": _.values(schema.properties)
                            }
                        }
                    },
                    {
                        "type": "button",
                        "icon": "fa fa-times text-danger",
                        "reload": "app",
                        "actionType": "ajax",
                        "label": "删除",
                        "confirmText": "您确认要删除?",
                        "api": `delete:/api/${schema.name}/$_id`
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
                    "reload": "app",
                    "api": {
                        "method": "post",
                        "url": `/api/${schema.name}`
                    },
                    "controls": _.values(schema.properties)
                }
            }
        }]
    }
}