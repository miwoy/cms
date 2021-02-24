module.exports = {
    "name": "ditai-manage",
    "type": "page",
    "title": "敌台管理",
    "body": [{
        "type": "service",
        "api": "get:/api/collection/getByName?name=ditai",
        "body": [{
                "type": "form",
                "target": "view",
                "controls": [{
                        "type": "group",
                        "controls": [{
                                "type": "chained-select",
                                "label": "行政区划",
                                "name": "position",
                                "joinValues": true,
                                "source": "/api/common/city?level=${level}&parentId=${parentId}",
                                "className": "",
                                "delimiter": "-",
                                "value": "北京-密云-全部-全部",
                                "mode": "inline"
                            },
                            {
                                "type": "select",
                                "label": "形制",
                                "name": "shape",
                                "source": "${properties.shape.options}",
                                "value": null,
                                "mode": "inline"
                            },
                            {
                                "type": "select",
                                "label": "材质",
                                "name": "material",
                                "source": "${properties.material.options}",
                                "value": null,
                                "mode": "inline"
                            },
                            {
                                "type": "select",
                                "label": "建筑形制",
                                "name": "buildShape",
                                "source": "${properties.buildShape.options}",
                                "value": null,
                                "mode": "inline"
                            },
                            {
                                "type": "select",
                                "label": "做法",
                                "name": "craft",
                                "source": "${properties.craft.options}",
                                "value": null,
                                "mode": "inline"
                            }
                        ],
                        "label": false
                    },
                    {
                        "type": "group",
                        "controls": [{
                                "type": "select",
                                "label": "基础情况",
                                "name": "basic",
                                "source": "/api/common/basic",
                                "value": null,
                                "mode": "inline"
                            }, {
                                "type": "date-range",
                                "label": "调查日期",
                                "value": null,
                                "name": "date-range"
                            },
                            {
                                "type": "text",
                                "label": "关键字",
                                "value": null,
                                "name": "keywords"
                            }
                        ],
                        "label": false,
                        "mode": "inline"
                    }
                ],
                "actions": [{
                        "type": "reset",
                        "label": "重置"
                    },
                    {
                        "type": "submit",
                        "label": "查询",
                        "level": "primary"
                    }
                ],
                "wrapWithPanel": true,
                "affixFooter": false,
                "panelClassName": "Panel--default",
                "headerClassName": "none"
            },
            {
                "type": "crud",
                "name": "view",
                "syncLocation": false,
                "alwaysShowPagination": true,
                "columnsTogglable": true,
                "api": "get:/api/ditai",
                "filterTogglable": true,
                "defaultParams": {
                    "perPage": 10
                },
                "data": {
                    "a": 1
                },
                "headerToolbar": ["statistics", "export-excel"],
                "footerToolbar": ["switch-per-page", "pagination"],
                "columns": [{
                        "type": "text",
                        "label": "名称",
                        "name": "name",
                        "sortable": false,
                        "width": "100px"
                    }, {
                        "type": "tpl",
                        "tpl": "${position}",
                        "label": "行政区划",
                        "name": "position",
                        "sortable": false,
                        "width": "150px"
                    },
                    {
                        "type": "tpl",
                        "tpl": "${shape|truncate:10}",
                        "label": "形制",
                        "name": "shape",
                        "sortable": false,
                        "width": "50px"
                    }, {
                        "type": "text",
                        "label": "材质",
                        "name": "material",
                        "searchable": false,
                        "width": "200px"
                    }, {
                        "type": "tpl",
                        "tpl": "${buildShape|truncate:10}",
                        "label": "建筑形制",
                        "name": "buildShape",
                        "sortable": false,
                        "searchable": false,
                        "width": "50px"
                    }, {
                        "type": "tpl",
                        "tpl": "${craft|truncate:20}",
                        "label": "做法",
                        "name": "craft",
                        "sortable": false,
                        "searchable": false,
                        "width": "200px"
                    }, {
                        "type": "tpl",
                        "tpl": "${basic|truncate:10}",
                        "popOver": {
                            "body": {
                                "type": "tpl",
                                "tpl": "$basic"
                            }
                        },
                        "label": "基础情况",
                        "name": "basic",
                        "sortable": false,
                        "searchable": false,
                        "width": "100px"
                    },
                    {
                        "type": "date",
                        "label": "调查日期",
                        "name": "workdate",
                        "sortable": false,
                        "width": "100px"
                    },
                    {
                        "type": "operation",
                        "label": "操作",
                        "width": 100,
                        "fixed": "right",
                        "buttons": [{
                                "type": "button",
                                "label": "编辑",
                                "actionType": "dialog",
                                "dialog": {
                                    "title": "编辑",
                                    "size": "xl",
                                    "actions": [{
                                        "label": "取消",
                                        "actionType": "close",
                                        "type": "button"
                                    }, {
                                        "label": "提交",
                                        "actionType": "submit",
                                        "close": true,
                                        "primary": true,
                                        "type": "button"
                                    }],
                                    "body": {
                                        "type": "form",
                                        "title": "基本信息",
                                        "name": "",
                                        "api": "post:/api/ditai",
                                        "controls": [{
                                                "type": "group",
                                                "controls": [{
                                                        "type": "chained-select",
                                                        "label": "行政区划",
                                                        "name": "position",
                                                        "joinValues": true,
                                                        "delimiter": "-",
                                                        "source": "/api/common/city?level=${level}&parentId=${parentId}",
                                                        "value": "北京-密云-全部-全部",
                                                        "extractValue": false
                                                    },
                                                    {
                                                        "type": "date",
                                                        "label": "调查日期",
                                                        "name": "workdate",
                                                        "mode": "horizontal",
                                                        "required": true
                                                    }
                                                ],
                                                "label": false
                                            },
                                            {
                                                "type": "group",
                                                "controls": [{
                                                        "type": "text",
                                                        "label": "名称",
                                                        "name": "name",
                                                        "value": null,
                                                        "mode": "horizontal"
                                                    },
                                                    {
                                                        "type": "text",
                                                        "label": "其它名称",
                                                        "name": "alias",
                                                        "mode": "horizontal"
                                                    }
                                                ],
                                                "label": false
                                            },
                                            {
                                                "type": "group",
                                                "controls": [{
                                                        "type": "year",
                                                        "label": "年代",
                                                        "name": "years",
                                                        "mode": "horizontal"
                                                    },
                                                    {
                                                        "label": "大规模修葺年代",
                                                        "name": "updateYears",
                                                        "type": "year",
                                                        "mode": "horizontal"
                                                    }
                                                ],
                                                "label": false,
                                                "mode": "normal"
                                            },
                                            {
                                                "type": "container",
                                                "label": "位置",
                                                "mode": "horizontal",
                                                "controls": [{
                                                        "placeholder": "",
                                                        "type": "text",
                                                        "name": "location",
                                                        "label": "地点:",
                                                        "mode": "normal"
                                                    },
                                                    {
                                                        "type": "hbox",
                                                        "label": "坐标:",
                                                        "columns": [{
                                                                "controls": [{
                                                                    "type": "group",
                                                                    "label": "东经:",
                                                                    "controls": [{
                                                                            "type": "text",
                                                                            "label": false,
                                                                            "name": "longitudeX",
                                                                            "validations": {
                                                                                "isNumeric": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "type": "text",
                                                                            "label": false,
                                                                            "name": "longitudeY",
                                                                            "validations": {
                                                                                "isNumeric": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "type": "text",
                                                                            "label": false,
                                                                            "name": "longitudeZ",
                                                                            "validations": {
                                                                                "isNumeric": true
                                                                            }
                                                                        }
                                                                    ],
                                                                    "mode": "horizontal"
                                                                }]
                                                            },
                                                            {
                                                                "controls": [{
                                                                    "type": "group",
                                                                    "label": "北纬:",
                                                                    "controls": [{
                                                                            "type": "text",
                                                                            "label": false,
                                                                            "name": "latitudeX",
                                                                            "validations": {
                                                                                "isNumeric": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "type": "text",
                                                                            "label": false,
                                                                            "name": "latitudeY",
                                                                            "validations": {
                                                                                "isNumeric": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "type": "text",
                                                                            "label": false,
                                                                            "name": "latitudeZ",
                                                                            "validations": {
                                                                                "isNumeric": true
                                                                            }
                                                                        }
                                                                    ],
                                                                    "mode": "horizontal"
                                                                }]
                                                            },
                                                            {
                                                                "controls": [{
                                                                    "type": "text",
                                                                    "label": "高程(米):",
                                                                    "name": "height",
                                                                    "mode": "horizontal",
                                                                    "validations": {
                                                                        "isNumeric": true
                                                                    }
                                                                }]
                                                            }
                                                        ],
                                                        "mode": "inline",
                                                        "className": "",
                                                        "inputClassName": "w-full"
                                                    }
                                                ],
                                                "inputClassName": "b-a p-xs m-t-xs"
                                            },
                                            {
                                                "type": "container",
                                                "label": "形制",
                                                "controls": [{
                                                        "type": "radios",
                                                        "label": false,
                                                        "name": "shape",
                                                        "options": [{
                                                                "label": "矩形",
                                                                "value": "矩形"
                                                            },
                                                            {
                                                                "label": "圆形",
                                                                "value": "圆形"
                                                            },
                                                            {
                                                                "label": "其它",
                                                                "value": "其它"
                                                            }
                                                        ],
                                                        "mode": "horizontal",
                                                        "joinValues": true,
                                                        "columnsCount": 8
                                                    },
                                                    {
                                                        "type": "text",
                                                        "label": "外观尺寸:",
                                                        "name": "size",
                                                        "mode": "normal"
                                                    }
                                                ],
                                                "mode": "horizontal",
                                                "inputClassName": "b-a p-xs"
                                            },
                                            {
                                                "type": "container",
                                                "label": "材质",
                                                "inputClassName": "b-a p-xs m-t-xs",
                                                "mode": "horizontal",
                                                "controls": [
                                                    {
                                                        "type": "checkboxes",
                                                        "label": false,
                                                        "name": "material",
                                                        "value": [],
                                                        "options": [
                                                            {
                                                                "label": "砖",
                                                                "value": "砖"
                                                            },
                                                            {
                                                                "label": "石",
                                                                "value": "石"
                                                            },
                                                            {
                                                                "label": "土",
                                                                "value": "土"
                                                            }
                                                        ],
                                                        "joinValues": false,
                                                        "columnsCount": 3,
                                                        "extractValue": true
                                                    },
                                                    {
                                                        "type": "group",
                                                        "label": "砖",
                                                        "mode": "normal",
                                                        "controls": [
                                                            {
                                                                "type": "text",
                                                                "label": false,
                                                                "name": "materialBrickL",
                                                                "mode": "horizontal",
                                                                "placeholder": "长(厘米)",
                                                                "disabledOn": "!(this.material && this.material.includes('砖'))"
                                                            },
                                                            {
                                                                "type": "text",
                                                                "label": false,
                                                                "name": "materialBrickW",
                                                                "mode": "horizontal",
                                                                "placeholder": "宽(厘米)",
                                                                "disabledOn": "!(this.material && this.material.includes('砖'))"
                                                            },
                                                            {
                                                                "type": "text",
                                                                "label": false,
                                                                "name": "materialBrickH",
                                                                "mode": "horizontal",
                                                                "placeholder": "高(厘米)",
                                                                "disabledOn": "!(this.material && this.material.includes('砖'))"
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "group",
                                                        "label": "石",
                                                        "mode": "normal",
                                                        "controls": [
                                                            {
                                                                "type": "text",
                                                                "label": false,
                                                                "name": "materialStoneL",
                                                                "mode": "horizontal",
                                                                "placeholder": "长(厘米)",
                                                                "disabledOn": "!(this.material && this.material.includes('石'))"
                                                            },
                                                            {
                                                                "type": "text",
                                                                "label": false,
                                                                "name": "materialStoneW",
                                                                "mode": "horizontal",
                                                                "placeholder": "宽(厘米)",
                                                                "disabledOn": "!(this.material && this.material.includes('石'))"
                                                            },
                                                            {
                                                                "type": "text",
                                                                "label": false,
                                                                "name": "materialStoneH",
                                                                "mode": "horizontal",
                                                                "placeholder": "高(厘米)",
                                                                "disabledOn": "!(this.material && this.material.includes('石'))"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "type": "container",
                                                "label": "建筑形制",
                                                "controls": [{
                                                        "type": "radios",
                                                        "label": false,
                                                        "name": "buildShape",
                                                        "source": "/api/common/buildShape",
                                                        "joinValues": true,
                                                        "columnsCount": 8
                                                    },
                                                    {
                                                        "type": "group",
                                                        "controls": [{
                                                            "type": "checkboxes",
                                                            "label": false,
                                                            "name": "craft",
                                                            "source": "/api/common/craft",
                                                            "joinValues": false,
                                                            "extractValue": true,
                                                            "columnsCount": 6
                                                        }],
                                                        "label": "做法:",
                                                        "mode": "normal"
                                                    }
                                                ],
                                                "mode": "horizontal",
                                                "inputClassName": "b-a p-xs"
                                            },
                                            {
                                                "type": "radios",
                                                "label": "基础情况",
                                                "name": "basic",
                                                "source": "/api/common/basic",
                                                "joinValues": true,
                                                "columnsCount": 6,
                                                "mode": "horizontal"
                                            }
                                        ],
                                        "affixFooter": false
                                    }
                                }
                            },
                            {
                                "type": "button",
                                "actionType": "ajax",
                                "label": "删除",
                                "confirmText": "您确认要删除?",
                                "api": "delete:/api/ditai/$_id"
                            }
                        ],
                        "toggled": true
                    }
                ]
            }
        ]
    }],
    "toolbar": {
        "type": "button-group",
        "buttons": [{
            "type": "button",
            "label": "增加敌台",
            "actionType": "dialog",
            "dialog": {
                "title": "增加敌台",
                "size": "xl",
                "actions": [{
                    "label": "取消",
                    "actionType": "close",
                    "type": "button"
                }, {
                    "label": "提交",
                    "actionType": "submit",
                    "close": true,
                    "primary": true,
                    "type": "button"
                }],
                "body": {
                    "type": "form",
                    "canAccessSuperData": false,
                    "title": "基本信息",
                    "name": "",
                    "api": "post:/api/ditai",
                    "controls": [{
                            "type": "group",
                            "controls": [{
                                    "type": "chained-select",
                                    "label": "行政区划",
                                    "name": "position",
                                    "joinValues": true,
                                    "delimiter": "-",
                                    "source": "/api/common/city?level=${level}&parentId=${parentId}",
                                    "value": "北京-密云-全部-全部",
                                    "extractValue": false
                                },
                                {
                                    "type": "date",
                                    "label": "调查日期",
                                    "name": "workdate",
                                    "mode": "horizontal",
                                    "required": true
                                }
                            ],
                            "label": false
                        },
                        {
                            "type": "group",
                            "controls": [{
                                    "type": "text",
                                    "label": "名称",
                                    "name": "name",
                                    "value": null,
                                    "mode": "horizontal"
                                },
                                {
                                    "type": "text",
                                    "label": "其它名称",
                                    "name": "alias",
                                    "mode": "horizontal"
                                }
                            ],
                            "label": false
                        },
                        {
                            "type": "group",
                            "controls": [{
                                    "type": "year",
                                    "label": "年代",
                                    "name": "years",
                                    "mode": "horizontal"
                                },
                                {
                                    "label": "大规模修葺年代",
                                    "name": "updateYears",
                                    "type": "year",
                                    "mode": "horizontal"
                                }
                            ],
                            "label": false,
                            "mode": "normal"
                        },
                        {
                            "type": "container",
                            "label": "位置",
                            "mode": "horizontal",
                            "controls": [{
                                    "placeholder": "",
                                    "type": "text",
                                    "name": "location",
                                    "label": "地点:",
                                    "mode": "normal"
                                },
                                {
                                    "type": "hbox",
                                    "label": "坐标:",
                                    "columns": [{
                                            "controls": [{
                                                "type": "group",
                                                "label": "东经:",
                                                "controls": [{
                                                        "type": "text",
                                                        "label": false,
                                                        "name": "longitudeX",
                                                        "validations": {
                                                            "isNumeric": true
                                                        }
                                                    },
                                                    {
                                                        "type": "text",
                                                        "label": false,
                                                        "name": "longitudeY",
                                                        "validations": {
                                                            "isNumeric": true
                                                        }
                                                    },
                                                    {
                                                        "type": "text",
                                                        "label": false,
                                                        "name": "longitudeZ",
                                                        "validations": {
                                                            "isNumeric": true
                                                        }
                                                    }
                                                ],
                                                "mode": "horizontal"
                                            }]
                                        },
                                        {
                                            "controls": [{
                                                "type": "group",
                                                "label": "北纬:",
                                                "controls": [{
                                                        "type": "text",
                                                        "label": false,
                                                        "name": "latitudeX",
                                                        "validations": {
                                                            "isNumeric": true
                                                        }
                                                    },
                                                    {
                                                        "type": "text",
                                                        "label": false,
                                                        "name": "latitudeY",
                                                        "validations": {
                                                            "isNumeric": true
                                                        }
                                                    },
                                                    {
                                                        "type": "text",
                                                        "label": false,
                                                        "name": "latitudeZ",
                                                        "validations": {
                                                            "isNumeric": true
                                                        }
                                                    }
                                                ],
                                                "mode": "horizontal"
                                            }]
                                        },
                                        {
                                            "controls": [{
                                                "type": "text",
                                                "label": "高程(米):",
                                                "name": "height",
                                                "mode": "horizontal",
                                                "validations": {
                                                    "isNumeric": true
                                                }
                                            }]
                                        }
                                    ],
                                    "mode": "inline",
                                    "className": "",
                                    "inputClassName": "w-full"
                                }
                            ],
                            "inputClassName": "b-a p-xs m-t-xs"
                        },
                        {
                            "type": "container",
                            "label": "形制",
                            "controls": [{
                                    "type": "radios",
                                    "label": false,
                                    "name": "shape",
                                    "options": [{
                                            "label": "矩形",
                                            "value": "矩形"
                                        },
                                        {
                                            "label": "圆形",
                                            "value": "圆形"
                                        },
                                        {
                                            "label": "其它",
                                            "value": "其它"
                                        }
                                    ],
                                    "mode": "horizontal",
                                    "joinValues": true,
                                    "columnsCount": 8
                                },
                                {
                                    "type": "text",
                                    "label": "外观尺寸:",
                                    "name": "size",
                                    "mode": "normal"
                                }
                            ],
                            "mode": "horizontal",
                            "inputClassName": "b-a p-xs"
                        },
                        {
                            "type": "container",
                            "label": "材质",
                            "inputClassName": "b-a p-xs m-t-xs",
                            "mode": "horizontal",
                            "controls": [
                                {
                                    "type": "checkboxes",
                                    "label": false,
                                    "name": "material",
                                    "value": [],
                                    "options": [
                                        {
                                            "label": "砖",
                                            "value": "砖"
                                        },
                                        {
                                            "label": "石",
                                            "value": "石"
                                        },
                                        {
                                            "label": "土",
                                            "value": "土"
                                        }
                                    ],
                                    "joinValues": false,
                                    "columnsCount": 3,
                                    "extractValue": true
                                },
                                {
                                    "type": "group",
                                    "label": "砖",
                                    "mode": "normal",
                                    "controls": [
                                        {
                                            "type": "text",
                                            "label": false,
                                            "name": "materialBrickL",
                                            "mode": "horizontal",
                                            "placeholder": "长(厘米)",
                                            "disabledOn": "!(this.material && this.material.includes('砖'))"
                                        },
                                        {
                                            "type": "text",
                                            "label": false,
                                            "name": "materialBrickW",
                                            "mode": "horizontal",
                                            "placeholder": "宽(厘米)",
                                            "disabledOn": "!(this.material && this.material.includes('砖'))"
                                        },
                                        {
                                            "type": "text",
                                            "label": false,
                                            "name": "materialBrickH",
                                            "mode": "horizontal",
                                            "placeholder": "高(厘米)",
                                            "disabledOn": "!(this.material && this.material.includes('砖'))"
                                        }
                                    ]
                                },
                                {
                                    "type": "group",
                                    "label": "石",
                                    "mode": "normal",
                                    "controls": [
                                        {
                                            "type": "text",
                                            "label": false,
                                            "name": "materialStoneL",
                                            "mode": "horizontal",
                                            "placeholder": "长(厘米)",
                                            "disabledOn": "!(this.material && this.material.includes('石'))"
                                        },
                                        {
                                            "type": "text",
                                            "label": false,
                                            "name": "materialStoneW",
                                            "mode": "horizontal",
                                            "placeholder": "宽(厘米)",
                                            "disabledOn": "!(this.material && this.material.includes('石'))"
                                        },
                                        {
                                            "type": "text",
                                            "label": false,
                                            "name": "materialStoneH",
                                            "mode": "horizontal",
                                            "placeholder": "高(厘米)",
                                            "disabledOn": "!(this.material && this.material.includes('石'))"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "container",
                            "label": "建筑形制",
                            "controls": [{
                                    "type": "radios",
                                    "label": false,
                                    "name": "buildShape",
                                    "source": "/api/common/buildShape",
                                    "joinValues": true,
                                    "columnsCount": 8
                                },
                                {
                                    "type": "group",
                                    "controls": [{
                                        "type": "checkboxes",
                                        "label": false,
                                        "name": "craft",
                                        "source": "/api/common/craft",
                                        "joinValues": false,
                                        "extractValue": true,
                                        "columnsCount": 6
                                    }],
                                    "label": "做法:",
                                    "mode": "normal"
                                }
                            ],
                            "mode": "horizontal",
                            "inputClassName": "b-a p-xs"
                        },
                        {
                            "type": "radios",
                            "label": "基础情况",
                            "name": "basic",
                            "source": "/api/common/basic",
                            "joinValues": true,
                            "columnsCount": 6,
                            "mode": "horizontal"
                        }
                    ],
                    "affixFooter": false
                }
            }
        }]
    }
}