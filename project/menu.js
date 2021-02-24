module.exports = [{
    "label": "home",
    "url": "/",
    "redirect": "/obj"
}, {
    "label": "业务管理",
    "children": [{
        "label": "保护对象管理",
        "icon": "fa fa-cubes",
        "url": "/obj",
        "rewrite": "/obj/model-view",
        "children": [{
            "label": "模型浏览",
            "url": "model-view",
            "schemaApi": "get:/page/model-view",
            "schema": {
                "type": "page",
                "title": "占位",
                "body": {
                    "type": "tpl",
                    "tpl": "模型浏览"
                }
            }
        }, {
            "label": "墙体管理",
            "url": "body-manage",
            "schemaApi": "get:/page/body-manage",
            "schema": {
                "type": "page",
                "title": "占位",
                "body": {
                    "type": "tpl",
                    "tpl": "墙体管理"
                }
            }
        }, {
            "label": "敌台管理",
            "url": "ditai-manage",
            "schemaApi": "get:/page/ditai-manage"
        }, {
            "label": "关堡管理",
            "url": "guanbao-manage",
            "schemaApi": "get:/page/guanbao-manage",
            "schema": {
                "type": "page",
                "title": "占位",
                "body": {
                    "type": "tpl",
                    "tpl": "关堡管理"
                }
            }
        }, {
            "label": "遗迹管理",
            "url": "yiji-manage",
            "schemaApi": "get:/page/yiji-manage",
            "schema": {
                "type": "page",
                "title": "占位",
                "body": {
                    "type": "tpl",
                    "tpl": "遗迹管理"
                }
            }
        }, {
            "label": "村落管理",
            "url": "cunluo-manage",
            "schemaApi": "get:/page/cunluo-manage",
            "schema": {
                "type": "page",
                "title": "占位",
                "body": {
                    "type": "tpl",
                    "tpl": "村落管理"
                }
            }
        }, {
            "label": "资料管理",
            "url": "/obj/info-manage",
            "icon": "fa fa-feed",
            "rewrite": "/obj/info-manage/photo-manage",
            "children": [{
                "label": "照片管理",
                "url": "photo-manage",
                "schemaApi": "get:/page/photo-manage",
                "schema": {
                    "type": "page",
                    "title": "占位",
                    "body": {
                        "type": "tpl",
                        "tpl": "照片管理"
                    }
                }
            }, {
                "label": "图纸管理",
                "url": "image-manage",
                "schemaApi": "get:/page/image-manage",
                "schema": {
                    "type": "page",
                    "title": "占位",
                    "body": {
                        "type": "tpl",
                        "tpl": "图纸管理"
                    }
                }
            }, {
                "label": "视频管理",
                "url": "video-manage",
                "schemaApi": "get:/page/video-manage",
                "schema": {
                    "type": "page",
                    "title": "占位",
                    "body": {
                        "type": "tpl",
                        "tpl": "视频管理"
                    }
                }
            }]
        }]
    }, {
        "label": "监测管理",
        "icon": "fa fa-binoculars",
        "url": "/monitor",
        "rewrite": "/monitor/overview",
        "children": [{
            "label": "总览",
            "url": "overview",
            "schemaApi": "get:/page/overview",
            "schema": {
                "type": "page",
                "title": "占位",
                "body": {
                    "type": "tpl",
                    "tpl": "总览"
                }
            }
        }, {
            "label": "数据查询",
            "url": "dataview",
            "schemaApi": "get:/page/dataview",
            "schema": {
                "type": "page",
                "title": "占位",
                "body": {
                    "type": "tpl",
                    "tpl": "数据查询"
                }
            }
        }, {
            "label": "监测点管理",
            "url": "monitor-manage",
            "schemaApi": "get:/page/monitor-manage",
            "schema": {
                "type": "page",
                "title": "占位",
                "body": {
                    "type": "tpl",
                    "tpl": "监测点管理"
                }
            }
        }, {
            "label": "设备查询",
            "url": "device-view",
            "schemaApi": "get:/page/device-view",
            "schema": {
                "type": "page",
                "title": "占位",
                "body": {
                    "type": "tpl",
                    "tpl": "设备查询"
                }
            }
        }, {
            "label": "第三方监测",
            "icon": "fa fa-bullseye",
            "url": "/monitor/other-monitor",
            "rewrite": "/monitor/other-monitor/earthquake-monitor/earthquake-notify-manage",
            "children": [{
                "label": "地震监测",
                "icon": "fa fa-industry",
                "url": "/monitor/other-monitor/earthquake-monitor",
                "rewrite": "/monitor/other-monitor/earthquake-monitor/earthquake-notify-manage",
                "children": [{
                    "label": "通知管理",
                    "url": "earthquake-notify-manage",
                    "schemaApi": "get:/page/earthquake-notify-manage",
                    "schema": {
                        "type": "page",
                        "title": "占位",
                        "body": {
                            "type": "tpl",
                            "tpl": "通知管理"
                        }
                    }
                }, {
                    "label": "通知历史",
                    "url": "earthquake-notify-log",
                    "schemaApi": "get:/page/earthquake-notify-log",
                    "schema": {
                        "type": "page",
                        "title": "占位",
                        "body": {
                            "type": "tpl",
                            "tpl": "通知历史"
                        }
                    }
                }]
            }, {
                "label": "气象监测",
                "icon": "fa fa-thermometer-quarter",
                "url": "/monitor/other-monitor/meteorological-monitor",
                "rewrite": "/monitor/other-monitor/meteorological-monitor/meteorological-notify-manage",
                "children": [{
                    "label": "通知管理",
                    "url": "meteorological-notify-manage",
                    "schemaApi": "get:/page/meteorological-notify-manage",
                    "schema": {
                        "type": "page",
                        "title": "占位",
                        "body": {
                            "type": "tpl",
                            "tpl": "通知管理"
                        }
                    }
                }, {
                    "label": "通知历史",
                    "url": "meteorological-notify-log",
                    "schemaApi": "get:/page/meteorological-notify-log",
                    "schema": {
                        "type": "page",
                        "title": "占位",
                        "body": {
                            "type": "tpl",
                            "tpl": "通知历史"
                        }
                    }
                }]
            }]
        }, {
            "label": "日常巡查",
            "url": "patrol",
            "schemaApi": "get:/page/patrol",
            "schema": {
                "type": "page",
                "title": "占位",
                "body": {
                    "type": "tpl",
                    "tpl": "日常巡查"
                }
            }
        }]
    }, {
        "label": "风险预案",
        "icon": "fa fa-exclamation-triangle",
        "url": "/risk-plan",
        "rewrite": "/risk-plan/warn-trigger",
        "children": [{
            "label": "预警触发器",
            "url": "warn-trigger",
            "schemaApi": "get:/page/warn-trigger",
            "schema": {
                "type": "page",
                "title": "占位",
                "body": {
                    "type": "tpl",
                    "tpl": "预警触发器"
                }
            }
        }, {
            "label": "预案管理",
            "url": "risk-plan-manage",
            "schemaApi": "get:/page/risk-plan-manage",
            "schema": {
                "type": "page",
                "title": "占位",
                "body": {
                    "type": "tpl",
                    "tpl": "预案管理"
                }
            }
        }, {
            "label": "预警记录",
            "url": "warn-log",
            "schemaApi": "get:/page/warn-log",
            "schema": {
                "type": "page",
                "title": "占位",
                "body": {
                    "type": "tpl",
                    "tpl": "预警记录"
                }
            }
        }]
    }, {
        "label": "数据统计",
        "icon": "fa fa-bar-chart",
        "url": "/statistic",
        "schemaApi": "get:/page/statistic",
        "schema": {
            "type": "page",
            "title": "占位",
            "body": {
                "type": "tpl",
                "tpl": "数据统计"
            }
        }
    }]
}]