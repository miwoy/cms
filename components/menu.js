module.exports = (collectionSchema, sites) => {
    return [{
        "label": "home",
        "url": "/",
        "redirect": "/overview"
    }, {
        "label": "基础菜单",
        "children": [{
            "label": "概览",
            "icon": "fa fa-tachometer",
            "url": "overview",
            "isDefaultPage": true,
            "schema": {
                "type": "page",
                "body": [{
                    "type": "tpl",
                    "tpl": "cms 管理系统\n负责创建页面元素、数据模型、数据管理功能"
                }]
            }
        }, {
            "label": "站点管理",
            "icon": "fa fa-tasks",
            "url": "site",
            "schemaApi": "get:/admin/pages/site"
        }]
    }, {
        "label": "站点",
        "children": sites.map(site => {
            return {
                "label": site.label,
                "icon": site.icon,
                "url": "/" + site.name,
                "children": [{
                    "label": "菜单配置",
                    "icon": "fa fa-bars",
                    "url": "menu",
                    "schema": {
                        "type": "page",
                        "title": "引用",
                        "data": {
                            "siteId": site._id
                        },
                        "body": [{
                            "type": "form",
                            "title": "编辑菜单",
                            "reload": "app",
                            "affixFooter": true,
                            "data": {
                                "pages": site.pages || [],
                                "_id": site._id
                            },
                            "api": `put:/api/site/${site._id}`,
                            "controls": [{
                                "type": "switch",
                                "name": "useEditor",
                                "option": "使用代码编辑器"
                            }, {
                                "type": "static",
                                "label": "ID:",
                                "name": "_id",
                                "mode": "inline"
                            }, {
                                "$ref": "menu",
                                "visibleOn": "!this.useEditor"
                            }, {
                                "type": "editor",
                                "required": true,
                                "language": "json",
                                "name": "pages",
                                "visibleOn": "this.useEditor"
                            }]
                        }]
                    }
                }, {
                    "label": "页面管理",
                    "icon": "fa fa-file-text-o",
                    "url": "pages",
                    "schemaApi": `get:/admin/pages/site/${site._id}/page`
                }, {
                    "label": "模型",
                    "icon": "fa  fa-cubes",
                    "url": "collection",
                    "children": site.collections.map(collection => {
                        return {
                            "label": collection.label,
                            "url": `${collection.name}`,
                            "schemaApi": `get:/admin/pages/site/${site._id}/collection/${collection._id}`
                        }
                    }),
                    "schema": {
                        "type": "page",
                        "body": {
                            "type": "form",
                            "title": "新建模型",
                            "debug": conf.debug,
                            "resetAfterSubmit": true,
                            "api": `/api/site/${site._id}/collection`,
                            "controls": _.values(collectionSchema.properties),
                            "actions": [{
                                "label": "提交",
                                "actionType": "submit",
                                "primary": true,
                                "reload": "app",
                                "type": "button"
                            }]
                        }
                    }
                }, {
                    "label": "数据",
                    "icon": "fa fa-database",
                    "url": "data",
                    "redirect": `/${site.name}/data/${site.collections[0]?site.collections[0].name:""}`,
                    "children": site.collections.map(collection => {
                        return {
                            "label": collection.label,
                            "url": `${collection.name}`,
                            "schemaApi": `get:/admin/pages/site/${site._id}/collection/${collection._id}/data`
                        }
                    }),
                    "schema": {}
                }]
            }
        })
    }]
}