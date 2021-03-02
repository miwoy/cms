let properties = [{
    "name": "text",
    "label": "文本框",
    "icon": "fa fa-font",
    "avatar": "/icon/font.png",
    "properties": {
        "_ref": {
            "type": "text",
            "label": "所属属性",
            "name": "_ref",
            "hidden": true,
            "value": "text"
        },
        "type": {
            "type": "text",
            "label": "表单类型",
            "name": "type",
            "hidden": true,
            "value": "text"
        },
        "label": {
            "placeholder": "展示名称，如文章标题",
            "type": "text",
            "label": "展示名",
            "name": "label",
            "mode": "horizontal",
            "required": true,
            "validations": {
                "minLength": 0,
                "maxLength": 32
            }
        },
        "name": {
            "placeholder": "数据键，如title",
            "type": "text",
            "label": "数据键",
            "name": "name",
            "mode": "horizontal",
            "required": true,
            "validations": {
                "minLength": 0,
                "maxLength": 32
            }
        },
        "description": {
            "placeholder": "描述信息，会展示在表单的说明信息中",
            "type": "textarea",
            "label": "描述",
            "name": "description",
            "mode": "horizontal",
            "validations": {
                "minLength": 0,
                "maxLength": 1024
            }
        },
        "value": {
            "placeholder": "默认值",
            "type": "text",
            "label": "默认值",
            "name": "value",
            "mode": "horizontal"
        },
        "validations": {
            "type": "combo",
            "name": "validations",
            "label": "长度限制",
            "multiLine": true,
            "controls": [{
                "placeholder": "最小长度",
                "type": "text",
                "label": "最小长度",
                "name": "minLength",
                "validations": {
                    "isNumeric": true,
                    "minimum": 0
                }
            }, {
                "placeholder": "最大长度",
                "type": "text",
                "label": "最大长度",
                "name": "maxLength",
                "validations": {
                    "isNumeric": true,
                    "maximum": 255
                }
            }]
        },
        "required": {
            "type": "switch",
            "label": "是否必须",
            "name": "required",
            "mode": "horizontal",
            "value": false,
            "option": "在创建内容时，此此段是必需要填写的"
        },
        "sortable": {
            "type": "switch",
            "label": "是否设置为排序字段",
            "name": "sortable",
            "mode": "horizontal",
            "value": false,
            "option": "设置此字段排序功能"
        },
        "hidden": {
            "type": "switch",
            "label": "是否隐藏",
            "name": "hidden",
            "mode": "horizontal",
            "value": false,
            "option": "配置隐藏静态字段"
        }
    }
}, {
    "name": "textarea",
    "label": "多行文本框",
    "icon": "fa fa-align-justify",
    "avatar": "/icon/justify-align.png",
    "properties": {
        "_ref": {
            "type": "text",
            "label": "所属属性",
            "name": "_ref",
            "hidden": true,
            "value": "textarea"
        },
        "type": {
            "type": "text",
            "label": "表单类型",
            "name": "type",
            "hidden": true,
            "value": "textarea"
        },
        "label": {
            "placeholder": "展示名称，如文章内容",
            "type": "text",
            "label": "展示名",
            "name": "label",
            "mode": "horizontal",
            "required": true
        },
        "name": {
            "placeholder": "数据键，如content",
            "type": "text",
            "label": "数据键",
            "name": "name",
            "mode": "horizontal",
            "required": true
        },
        "description": {
            "placeholder": "描述信息，会展示在表单的说明信息中",
            "type": "textarea",
            "label": "描述",
            "name": "description",
            "mode": "horizontal"
        },
        "value": {
            "placeholder": "默认值",
            "type": "textarea",
            "label": "默认值",
            "name": "value",
            "mode": "horizontal"
        },
        "validations": {
            "type": "combo",
            "name": "validations",
            "label": "长度限制",
            "multiLine": true,
            "controls": [{
                "placeholder": "最小长度",
                "type": "text",
                "label": "最小长度",
                "name": "minLength",
                "validations": {
                    "isNumeric": true,
                    "minimum": 0
                }
            }, {
                "placeholder": "最大长度",
                "type": "text",
                "label": "最大长度",
                "name": "maxLength",
                "validations": {
                    "isNumeric": true,
                    "maximum": 1000
                }
            }]
        },
        "required": {
            "type": "switch",
            "label": "是否必须",
            "name": "required",
            "mode": "horizontal",
            "value": false,
            "option": "在创建内容时，此此段是必需要填写的"
        },
        "sortable": {
            "type": "switch",
            "label": "是否设置为排序字段",
            "name": "sortable",
            "mode": "horizontal",
            "value": false,
            "option": "设置此字段排序功能"
        },
        "hidden": {
            "type": "switch",
            "label": "是否隐藏",
            "name": "hidden",
            "mode": "horizontal",
            "value": false,
            "option": "配置隐藏静态字段"
        }
    }
}, {
    "name": "url",
    "label": "URL",
    "icon": "fa fa-link",
    "avatar": "/icon/link.png",
    "properties": {
        "_ref": {
            "type": "text",
            "label": "所属属性",
            "name": "_ref",
            "hidden": true,
            "value": "url"
        },
        "type": {
            "type": "text",
            "label": "表单类型",
            "name": "type",
            "hidden": true,
            "value": "text"
        },
        "label": {
            "placeholder": "展示名称",
            "type": "text",
            "label": "展示名",
            "name": "label",
            "mode": "horizontal",
            "required": true,
            "validations": {
                "minLength": 0,
                "maxLength": 32
            }
        },
        "name": {
            "placeholder": "数据键",
            "type": "text",
            "label": "数据键",
            "name": "name",
            "mode": "horizontal",
            "required": true,
            "validations": {
                "minLength": 0,
                "maxLength": 32
            }
        },
        "description": {
            "placeholder": "描述信息，会展示在表单的说明信息中",
            "type": "textarea",
            "label": "描述",
            "name": "description",
            "mode": "horizontal",
            "validations": {
                "minLength": 0,
                "maxLength": 1024
            }
        },
        "value": {
            "placeholder": "默认值",
            "type": "text",
            "label": "默认值",
            "name": "value",
            "mode": "horizontal",
            "validations": {
                "isUrl": true
            }
        },
        "validations": {
            "type": "combo",
            "name": "validations",
            "label": "长度限制",
            "multiLine": true,
            "value": {
                "isUrl": true
            },
            "controls": [{
                "placeholder": "最小长度",
                "type": "text",
                "label": "最小长度",
                "name": "minLength",
                "validations": {
                    "isNumeric": true,
                    "minimum": 0
                }
            }, {
                "placeholder": "最大长度",
                "type": "text",
                "label": "最大长度",
                "name": "maxLength",
                "validations": {
                    "isNumeric": true,
                    "maximum": 255
                }
            }]
        },
        "required": {
            "type": "switch",
            "label": "是否必须",
            "name": "required",
            "mode": "horizontal",
            "value": false,
            "option": "在创建内容时，此此段是必需要填写的"
        },
        "sortable": {
            "type": "switch",
            "label": "是否设置为排序字段",
            "name": "sortable",
            "mode": "horizontal",
            "value": false,
            "option": "设置此字段排序功能"
        },
        "hidden": {
            "type": "switch",
            "label": "是否隐藏",
            "name": "hidden",
            "mode": "horizontal",
            "value": false,
            "option": "配置隐藏静态字段"
        }
    }
}, {
    "name": "email",
    "label": "邮箱",
    "icon": "fa fa-envelope",
    "avatar": "/icon/envelope.png",
    "properties": {
        "_ref": {
            "type": "text",
            "label": "所属属性",
            "name": "_ref",
            "hidden": true,
            "value": "email"
        },
        "type": {
            "type": "text",
            "label": "表单类型",
            "name": "type",
            "hidden": true,
            "value": "text"
        },
        "label": {
            "placeholder": "展示名称，如文章标题",
            "type": "text",
            "label": "展示名",
            "name": "label",
            "mode": "horizontal",
            "required": true,
            "validations": {
                "minLength": 0,
                "maxLength": 32
            }
        },
        "name": {
            "placeholder": "数据键，如title",
            "type": "text",
            "label": "数据键",
            "name": "name",
            "mode": "horizontal",
            "required": true,
            "validations": {
                "minLength": 0,
                "maxLength": 32
            }
        },
        "description": {
            "placeholder": "描述信息，会展示在表单的说明信息中",
            "type": "textarea",
            "label": "描述",
            "name": "description",
            "mode": "horizontal",
            "validations": {
                "minLength": 0,
                "maxLength": 1024
            }
        },
        "value": {
            "placeholder": "默认值",
            "type": "text",
            "label": "默认值",
            "name": "value",
            "mode": "horizontal",
            "validations": {
                "isEmail": true
            }
        },
        "validations": {
            "type": "combo",
            "name": "validations",
            "label": "长度限制",
            "multiLine": true,
            "value": {
                "isEmail": true
            },
            "controls": [{
                "placeholder": "最小长度",
                "type": "text",
                "label": "最小长度",
                "name": "minLength",
                "validations": {
                    "isNumeric": true,
                    "minimum": 0
                }
            }, {
                "placeholder": "最大长度",
                "type": "text",
                "label": "最大长度",
                "name": "maxLength",
                "validations": {
                    "isNumeric": true,
                    "maximum": 255
                }
            }]
        },
        "required": {
            "type": "switch",
            "label": "是否必须",
            "name": "required",
            "mode": "horizontal",
            "value": false,
            "option": "在创建内容时，此此段是必需要填写的"
        },
        "sortable": {
            "type": "switch",
            "label": "是否设置为排序字段",
            "name": "sortable",
            "mode": "horizontal",
            "value": false,
            "option": "设置此字段排序功能"
        },
        "hidden": {
            "type": "switch",
            "label": "是否隐藏",
            "name": "hidden",
            "mode": "horizontal",
            "value": false,
            "option": "配置隐藏静态字段"
        }
    }
}, {
    "name": "number",
    "label": "数字",
    "icon": "fa fa-percent",
    "avatar": "/icon/percent.png",
    "properties": {
        "_ref": {
            "type": "text",
            "label": "所属属性",
            "name": "_ref",
            "hidden": true,
            "value": "number"
        },
        "type": {
            "type": "text",
            "label": "表单类型",
            "name": "type",
            "hidden": true,
            "value": "number"
        },
        "label": {
            "placeholder": "展示名称，如文章字数",
            "type": "text",
            "label": "展示名",
            "name": "label",
            "mode": "horizontal",
            "required": true
        },
        "name": {
            "placeholder": "数据键，如count",
            "type": "text",
            "label": "数据键",
            "name": "name",
            "mode": "horizontal",
            "required": true
        },
        "description": {
            "placeholder": "描述信息，会展示在表单的说明信息中",
            "type": "textarea",
            "label": "描述",
            "name": "description",
            "mode": "horizontal"
        },
        "value": {
            "placeholder": "默认值",
            "type": "number",
            "label": "默认值",
            "name": "value",
            "mode": "horizontal"
        },
        "validations": {
            "type": "combo",
            "name": "validations",
            "label": "大小限制",
            "multiLine": true,
            "controls": [{
                "placeholder": "最小值",
                "type": "text",
                "label": "最小值",
                "name": "minimum",
                "validations": {
                    "minimum": 0
                }
            }, {
                "placeholder": "最大值",
                "type": "text",
                "label": "最大值",
                "name": "maximum"
            }]
        },
        "required": {
            "type": "switch",
            "label": "是否必须",
            "name": "required",
            "mode": "horizontal",
            "value": false,
            "option": "在创建内容时，此此段是必需要填写的"
        },
        "sortable": {
            "type": "switch",
            "label": "是否设置为排序字段",
            "name": "sortable",
            "mode": "horizontal",
            "value": false,
            "option": "设置此字段排序功能"
        },
        "hidden": {
            "type": "switch",
            "label": "是否隐藏",
            "name": "hidden",
            "mode": "horizontal",
            "value": false,
            "option": "配置隐藏静态字段"
        }
    }
}, {
    "name": "switch",
    "label": "布尔值",
    "icon": "fa fa-check",
    "avatar": "/icon/check.png",
    "properties": {
        "_ref": {
            "type": "text",
            "label": "所属属性",
            "name": "_ref",
            "hidden": true,
            "value": "switch"
        },
        "type": {
            "type": "text",
            "label": "表单类型",
            "name": "type",
            "hidden": true,
            "value": "switch"
        },
        "label": {
            "placeholder": "展示名称， 如是否发布",
            "type": "text",
            "label": "展示名",
            "name": "label",
            "mode": "horizontal",
            "required": true
        },
        "name": {
            "placeholder": "数据键，如isPublish",
            "type": "text",
            "label": "数据键",
            "name": "name",
            "mode": "horizontal",
            "required": true
        },
        "option": {
            "placeholder": "描述信息，会展示在表单的说明信息中",
            "type": "text",
            "label": "描述",
            "name": "option",
            "mode": "horizontal"
        },
        "value": {
            "placeholder": "默认值",
            "type": "switch",
            "value": false,
            "label": "默认值",
            "name": "value",
            "mode": "horizontal"
        },
        "required": {
            "type": "switch",
            "label": "是否必须",
            "name": "required",
            "mode": "horizontal",
            "value": false,
            "option": "在创建内容时，此此段是必需要填写的"
        },
        "sortable": {
            "type": "switch",
            "label": "是否设置为排序字段",
            "name": "sortable",
            "mode": "horizontal",
            "value": false,
            "option": "设置此字段排序功能"
        },
        "hidden": {
            "type": "switch",
            "label": "是否隐藏",
            "name": "hidden",
            "mode": "horizontal",
            "value": false,
            "option": "配置隐藏静态字段"
        }
    }
}, {
    "name": "enum",
    "label": "枚举",
    "icon": "fa fa-list",
    "avatar": "/icon/list.png",
    "properties": {
        "_ref": {
            "type": "text",
            "label": "所属属性",
            "name": "_ref",
            "hidden": true,
            "value": "enum"
        },
        "type": {
            "type": "text",
            "label": "表单类型",
            "name": "type",
            "hidden": true,
            "value": "select"
        },
        "label": {
            "placeholder": "展示名称",
            "type": "text",
            "label": "展示名",
            "name": "label",
            "mode": "horizontal",
            "required": true
        },
        "name": {
            "placeholder": "数据键",
            "type": "text",
            "label": "数据键",
            "name": "name",
            "mode": "horizontal",
            "required": true
        },
        "options": {
            "name": "options",
            "label": "值配置",
            "type": "combo",
            "multiple": true,
            "multiLine": true,
            "mode": "horizontal",
            "controls": [{
                "type": "group",
                "controls": [{
                    "label": "展示名",
                    "name": "label",
                    "type": "text",
                    "required": true
                }, {
                    "label": "值",
                    "name": "value",
                    "type": "text",
                    "required": true
                }]
            }]
        },
        "source": {
            "placeholder": "数据源",
            "type": "text",
            "label": "数据源",
            "description": "API或者数据映射",
            "name": "source",
            "mode": "horizontal"
        },
        "value": {
            "placeholder": "默认值",
            "type": "select",
            "source": "${options}",
            "value": false,
            "label": "默认值",
            "name": "value",
            "mode": "horizontal"
        },
        "delimeter": {
            "type": "text",
            "label": "拼接符",
            "placeholder": "默认”,“",
            "name": "delimeter",
            "mode": "horizontal",
            "visibleOn": "this.joinValues"
        },
        "multiple": {
            "type": "switch",
            "label": "是否多选",
            "name": "multiple",
            "mode": "horizontal",
            "value": false,
            "option": "设置是否支持多选"
        },
        "joinValues": {
            "type": "switch",
            "label": "是否拼接",
            "name": "joinValues",
            "mode": "horizontal",
            "value": false,
            "option": "默认使用delimeter拼接"
        },
        "extractValue": {
            "type": "switch",
            "label": "是否抽离",
            "name": "extractValue",
            "mode": "horizontal",
            "value": true,
            "option": "是否将value值抽取出来组成新的数组，只有在joinValues是false是生效"
        },
        "required": {
            "type": "switch",
            "label": "是否必须",
            "name": "required",
            "mode": "horizontal",
            "value": false,
            "option": "在创建内容时，此此段是必需要填写的"
        },
        "sortable": {
            "type": "switch",
            "label": "是否设置为排序字段",
            "name": "sortable",
            "mode": "horizontal",
            "value": false,
            "option": "设置此字段排序功能"
        },
        "hidden": {
            "type": "switch",
            "label": "是否隐藏",
            "name": "hidden",
            "mode": "horizontal",
            "value": false,
            "option": "配置隐藏静态字段"
        }
    }
}, {
    "label": "日期",
    "name": "date",
    "icon": "fa fa-calendar",
    "avatar": "/icon/calendar.png",
    "properties": {
        "_ref": {
            "type": "text",
            "label": "所属属性",
            "name": "_ref",
            "hidden": true,
            "value": "date"
        },
        "type": {
            "label": "表单类型",
            "name": "type",
            "type": "text",
            "hidden": true,
            "value": "date"
        },
        "label": {
            "placeholder": "展示名称",
            "type": "text",
            "label": "展示名",
            "name": "label",
            "mode": "horizontal",
            "required": true
        },
        "name": {
            "placeholder": "数据键",
            "type": "text",
            "label": "数据键",
            "name": "name",
            "mode": "horizontal",
            "required": true
        },
        "description": {
            "placeholder": "描述信息，会展示在表单的说明信息中",
            "type": "textarea",
            "label": "描述",
            "name": "description",
            "mode": "horizontal"
        },
        "value": {
            "placeholder": "默认值",
            "type": "date",
            "label": "默认值",
            "name": "value",
            "mode": "horizontal"
        },
        "required": {
            "type": "switch",
            "label": "是否必须",
            "name": "required",
            "mode": "horizontal",
            "value": false,
            "option": "在创建内容时，此此段是必需要填写的"
        },
        "sortable": {
            "type": "switch",
            "label": "是否设置为排序字段",
            "name": "sortable",
            "mode": "horizontal",
            "value": false,
            "option": "设置此字段排序功能"
        },
        "hidden": {
            "type": "switch",
            "label": "是否隐藏",
            "name": "hidden",
            "mode": "horizontal",
            "value": false,
            "option": "配置隐藏静态字段"
        }
    }
}, {
    "label": "日期时间",
    "name": "datetime",
    "icon": "fa fa-calendar-times-o",
    "avatar": "/icon/calendar-time.png",
    "properties": {
        "_ref": {
            "type": "text",
            "label": "所属属性",
            "name": "_ref",
            "hidden": true,
            "value": "datetime"
        },
        "type": {
            "label": "表单类型",
            "name": "type",
            "type": "text",
            "hidden": true,
            "value": "datetime"
        },
        "label": {
            "placeholder": "展示名称",
            "type": "text",
            "label": "展示名",
            "name": "label",
            "mode": "horizontal",
            "required": true
        },
        "name": {
            "placeholder": "数据键",
            "type": "text",
            "label": "数据键",
            "name": "name",
            "mode": "horizontal",
            "required": true
        },
        "description": {
            "placeholder": "描述信息，会展示在表单的说明信息中",
            "type": "textarea",
            "label": "描述",
            "name": "description",
            "mode": "horizontal"
        },
        "value": {
            "placeholder": "默认值",
            "type": "datetime",
            "label": "默认值",
            "name": "value",
            "mode": "horizontal"
        },
        "required": {
            "type": "switch",
            "label": "是否必须",
            "name": "required",
            "mode": "horizontal",
            "value": false,
            "option": "在创建内容时，此此段是必需要填写的"
        },
        "sortable": {
            "type": "switch",
            "label": "是否设置为排序字段",
            "name": "sortable",
            "mode": "horizontal",
            "value": false,
            "option": "设置此字段排序功能"
        },
        "hidden": {
            "type": "switch",
            "label": "是否隐藏",
            "name": "hidden",
            "mode": "horizontal",
            "value": false,
            "option": "配置隐藏静态字段"
        }
    }
}, {
    "label": "文件",
    "name": "file",
    "icon": "fa fa-file",
    "avatar": "/icon/file.png",
    "properties": {
        "_ref": {
            "type": "text",
            "label": "所属属性",
            "name": "_ref",
            "hidden": true,
            "value": "file"
        },
        "type": {
            "label": "表单类型",
            "name": "type",
            "type": "text",
            "hidden": true,
            "value": "file"
        },
        "label": {
            "placeholder": "展示名称",
            "type": "text",
            "label": "展示名",
            "name": "label",
            "mode": "horizontal",
            "required": true
        },
        "name": {
            "placeholder": "数据键",
            "type": "text",
            "label": "数据键",
            "name": "name",
            "mode": "horizontal",
            "required": true
        },
        "accept": {
            "placeholder": "限制类型(.csv,.png,.jpg)等。",
            "type": "text",
            "label": "类型限制",
            "name": "accept",
            "mode": "horizontal"
        },
        "receiver": {
            "placeholder": "默认 `/api/upload/file`",
            "type": "text",
            "label": "文件上传地址",
            "name": "receiver",
            "mode": "horizontal",
            "required": false
        },
        "maxSize": {
            "type": "text",
            "label": "文件大小限制",
            "placeholder": "文件大小限制(单位:KB)",
            "name": "maxSize",
            "mode": "horizontal",
            "validations": {
                "isNumeric": true,
                "minimum": 0
            }
        },
        "multiple": {
            "type": "switch",
            "label": "多文件上传",
            "name": "multiple",
            "mode": "horizontal",
            "value": true,
            "option": "设置是否允许多文件上传"
        },
        "extractValue": {
            "type": "switch",
            "name": "extractValue",
            "mode": "horizontal",
            "value": true,
            "hidden": true
        },
        "joinValues": {
            "type": "switch",
            "name": "joinValues",
            "mode": "horizontal",
            "value": false,
            "hidden": true
        },
        "required": {
            "type": "switch",
            "label": "是否必须",
            "name": "required",
            "mode": "horizontal",
            "value": false,
            "option": "在创建内容时，此此段是必需要填写的"
        },
        "hidden": {
            "type": "switch",
            "label": "是否隐藏",
            "name": "hidden",
            "mode": "horizontal",
            "value": false,
            "option": "配置隐藏静态字段"
        }
    }
}, {
    "label": "图片",
    "name": "image",
    "icon": "fa fa-picture-o",
    "avatar": "/icon/image.png",
    "properties": {
        "_ref": {
            "type": "text",
            "label": "所属属性",
            "name": "_ref",
            "hidden": true,
            "value": "image"
        },
        "type": {
            "label": "表单类型",
            "name": "type",
            "type": "text",
            "hidden": true,
            "value": "image"
        },
        "label": {
            "placeholder": "展示名称",
            "type": "text",
            "label": "展示名",
            "name": "label",
            "mode": "horizontal",
            "required": true
        },
        "name": {
            "placeholder": "数据键",
            "type": "text",
            "label": "数据键",
            "name": "name",
            "mode": "horizontal",
            "required": true
        },
        "accept": {
            "placeholder": "限制类型(.png,.jpg)等。",
            "type": "text",
            "label": "类型限制",
            "name": "description",
            "mode": "horizontal"
        },
        "receiver": {
            "placeholder": "默认 `/api/upload/file`",
            "type": "text",
            "label": "文件上传地址",
            "name": "receiver",
            "mode": "horizontal",
            "required": false
        },
        "maxSize": {
            "type": "text",
            "label": "文件大小限制",
            "placeholder": "文件大小限制(单位:KB)",
            "name": "maxSize",
            "mode": "horizontal",
            "validations": {
                "isNumeric": true,
                "minimum": 0
            }
        },
        "multiple": {
            "type": "switch",
            "label": "多文件上传",
            "name": "multiple",
            "mode": "horizontal",
            "value": true,
            "option": "设置是否允许多文件上传"
        },
        "required": {
            "type": "switch",
            "label": "是否必须",
            "name": "required",
            "mode": "horizontal",
            "value": false,
            "option": "在创建内容时，此此段是必需要填写的"
        },
        "autoUpload": {
            "type": "hidden",
            "name": "autoUpload",
            "value": true
        },
        "hidden": {
            "type": "switch",
            "label": "是否隐藏",
            "name": "hidden",
            "mode": "horizontal",
            "value": false,
            "option": "配置隐藏静态字段"
        }
    }
}, {
    "name": "rich-text",
    "label": "富文本",
    "icon": "fa fa-file-text-o",
    "avatar": "/icon/text-format.png",
    "properties": {
        "_ref": {
            "type": "text",
            "label": "所属属性",
            "name": "_ref",
            "hidden": true,
            "value": "rich-text"
        },
        "type": {
            "type": "text",
            "label": "表单类型",
            "name": "type",
            "hidden": true,
            "value": "rich-text"
        },
        "label": {
            "placeholder": "展示名称",
            "type": "text",
            "label": "展示名",
            "name": "label",
            "mode": "horizontal",
            "required": true,
            "validations": {
                "minLength": 0,
                "maxLength": 32
            }
        },
        "name": {
            "placeholder": "数据键",
            "type": "text",
            "label": "数据键",
            "name": "name",
            "mode": "horizontal",
            "required": true,
            "validations": {
                "minLength": 0,
                "maxLength": 32
            }
        },
        "description": {
            "placeholder": "描述信息，会展示在表单的说明信息中",
            "type": "textarea",
            "label": "描述",
            "name": "description",
            "mode": "horizontal",
            "validations": {
                "minLength": 0,
                "maxLength": 1024
            }
        },
        "value": {
            "placeholder": "默认值",
            "type": "text",
            "label": "默认值",
            "name": "value",
            "mode": "horizontal"
        },
        "receiver": {
            "placeholder": "默认的图片保存 API",
            "type": "text",
            "label": "默认的图片保存 API",
            "name": "receiver",
            "mode": "horizontal",
            "required": true,
            "validations": {
                "isUrl": true
            }
        },
        "videoReceiver": {
            "placeholder": "默认的视频保存 API",
            "type": "text",
            "label": "默认的视频保存 API",
            "name": "videoReceiver",
            "mode": "horizontal",
            "required": true,
            "validations": {
                "isUrl": true
            }
        },
        "required": {
            "type": "switch",
            "label": "是否必须",
            "name": "required",
            "mode": "horizontal",
            "value": false,
            "option": "在创建内容时，此此段是必需要填写的"
        },
        "hidden": {
            "type": "switch",
            "label": "是否隐藏",
            "name": "hidden",
            "mode": "horizontal",
            "value": false,
            "option": "配置隐藏静态字段"
        }
    }
}, {
    "name": "json",
    "label": "JSON",
    "icon": "fa fa-code",
    "avatar": "/icon/coding.png",
    "properties": {
        "_ref": {
            "type": "text",
            "label": "所属属性",
            "name": "_ref",
            "hidden": true,
            "value": "json"
        },
        "type": {
            "type": "text",
            "label": "表单类型",
            "name": "type",
            "hidden": true,
            "value": "editor"
        },
        "language": {
            "type": "text",
            "name": "language",
            "hidden": true,
            "value": "json"
        },
        "label": {
            "placeholder": "展示名称",
            "type": "text",
            "label": "展示名",
            "name": "label",
            "mode": "horizontal",
            "required": true,
            "validations": {
                "minLength": 0,
                "maxLength": 32
            }
        },
        "name": {
            "placeholder": "数据键",
            "type": "text",
            "label": "数据键",
            "name": "name",
            "mode": "horizontal",
            "required": true,
            "validations": {
                "minLength": 0,
                "maxLength": 32
            }
        },
        "description": {
            "placeholder": "描述信息，会展示在表单的说明信息中",
            "type": "textarea",
            "label": "描述",
            "name": "description",
            "mode": "horizontal",
            "validations": {
                "minLength": 0,
                "maxLength": 1024
            }
        },
        "value": {
            "placeholder": "默认值",
            "type": "editor",
            "language": "json",
            "label": "默认值",
            "name": "value",
            "mode": "horizontal"
        },
        "required": {
            "type": "switch",
            "label": "是否必须",
            "name": "required",
            "mode": "horizontal",
            "value": false,
            "option": "在创建内容时，此此段是必需要填写的"
        },
        "hidden": {
            "type": "switch",
            "label": "是否隐藏",
            "name": "hidden",
            "mode": "horizontal",
            "value": false,
            "option": "配置隐藏静态字段"
        }
    }
}, {
    "name": "code",
    "label": "Code",
    "icon": "fa fa-code",
    "avatar": "/icon/coding.png",
    "properties": {
        "_ref": {
            "type": "text",
            "label": "所属属性",
            "name": "_ref",
            "hidden": true,
            "value": "code"
        },
        "type": {
            "type": "text",
            "label": "表单类型",
            "name": "type",
            "hidden": true,
            "value": "editor"
        },
        "label": {
            "placeholder": "展示名称",
            "type": "text",
            "label": "展示名",
            "name": "label",
            "mode": "horizontal",
            "required": true,
            "validations": {
                "minLength": 0,
                "maxLength": 32
            }
        },
        "name": {
            "placeholder": "数据键",
            "type": "text",
            "label": "数据键",
            "name": "name",
            "mode": "horizontal",
            "required": true,
            "validations": {
                "minLength": 0,
                "maxLength": 32
            }
        },
        "description": {
            "placeholder": "描述信息，会展示在表单的说明信息中",
            "type": "textarea",
            "label": "描述",
            "name": "description",
            "mode": "horizontal",
            "validations": {
                "minLength": 0,
                "maxLength": 1024
            }
        },
        "language": {
            "type": "select",
            "label": "语言",
            "name": "language",
            "required": true,
            "searchable": true,
            "creatable": true,
            "options": ["bat", "c", "coffeescript", "cpp", "csharp", "css", "dockerfile", "fsharp", "go", "handlebars", "html", "ini", "java", "javascript", "json", "less", "lua", "markdown", "msdax", "objective-c", "php", "plaintext", "postiats", "powershell", "pug", "python", "r", "razor", "ruby", "sb", "scss", "shell", "sol", "sql", "swift", "typescript", "vb", "xml", "yaml"]
        },
        "value": {
            "placeholder": "默认值",
            "type": "editor",
            "language": "${language}",
            "label": "默认值",
            "name": "value",
            "mode": "horizontal"
        },
        "required": {
            "type": "switch",
            "label": "是否必须",
            "name": "required",
            "mode": "horizontal",
            "value": false,
            "option": "在创建内容时，此此段是必需要填写的"
        },
        "hidden": {
            "type": "switch",
            "label": "是否隐藏",
            "name": "hidden",
            "mode": "horizontal",
            "value": false,
            "option": "配置隐藏静态字段"
        }
    }
}, {
    "name": "chained-select",
    "label": "链式下拉框",
    "icon": "fa fa-chain-broken",
    "avatar": "/icon/chain.png",
    "properties": {
        "_ref": {
            "type": "text",
            "label": "所属属性",
            "name": "_ref",
            "hidden": true,
            "value": "chained-select"
        },
        "type": {
            "type": "text",
            "label": "表单类型",
            "name": "type",
            "hidden": true,
            "value": "chained-select"
        },
        "label": {
            "placeholder": "展示名称",
            "type": "text",
            "label": "展示名",
            "name": "label",
            "mode": "horizontal",
            "required": true,
            "validations": {
                "minLength": 0,
                "maxLength": 32
            }
        },
        "name": {
            "placeholder": "数据键",
            "type": "text",
            "label": "数据键",
            "name": "name",
            "mode": "horizontal",
            "required": true,
            "validations": {
                "minLength": 0,
                "maxLength": 32
            }
        },
        "description": {
            "placeholder": "描述信息，会展示在表单的说明信息中",
            "type": "textarea",
            "label": "描述",
            "name": "description",
            "mode": "horizontal",
            "validations": {
                "minLength": 0,
                "maxLength": 1024
            }
        },
        "source": {
            "placeholder": "数据源",
            "type": "text",
            "label": "数据源",
            "description": "api或者数据映射",
            "name": "source",
            "mode": "horizontal",
            "required": true
        },
        "delimiter": {
            "placeholder": "分隔符，默认“,”",
            "type": "text",
            "label": "分隔符",
            "name": "delimiter",
            "mode": "horizontal"
        },
        "value": {
            "placeholder": "默认值",
            "type": "text",
            "label": "默认值",
            "name": "value",
            "mode": "horizontal"
        },
        "required": {
            "type": "switch",
            "label": "是否必须",
            "name": "required",
            "mode": "horizontal",
            "value": false,
            "option": "在创建内容时，此此段是必需要填写的"
        },
        "sortable": {
            "type": "switch",
            "label": "是否设置为排序字段",
            "name": "sortable",
            "mode": "horizontal",
            "value": false,
            "option": "设置此字段排序功能"
        },
        "hidden": {
            "type": "switch",
            "label": "是否隐藏",
            "name": "hidden",
            "mode": "horizontal",
            "value": false,
            "option": "配置隐藏静态字段"
        }
    }
}, {
    "name": "years",
    "label": "年份选择框",
    "icon": "fa fa-calendar-o",
    "avatar": "/icon/calendar.png",
    "properties": {
        "_ref": {
            "type": "text",
            "label": "所属属性",
            "name": "_ref",
            "hidden": true,
            "value": "years"
        },
        "type": {
            "type": "text",
            "label": "表单类型",
            "name": "type",
            "hidden": true,
            "value": "years"
        },
        "label": {
            "placeholder": "展示名称",
            "type": "text",
            "label": "展示名",
            "name": "label",
            "mode": "horizontal",
            "required": true,
            "validations": {
                "minLength": 0,
                "maxLength": 32
            }
        },
        "name": {
            "placeholder": "数据键",
            "type": "text",
            "label": "数据键",
            "name": "name",
            "mode": "horizontal",
            "required": true,
            "validations": {
                "minLength": 0,
                "maxLength": 32
            }
        },
        "description": {
            "placeholder": "描述信息，会展示在表单的说明信息中",
            "type": "textarea",
            "label": "描述",
            "name": "description",
            "mode": "horizontal",
            "validations": {
                "minLength": 0,
                "maxLength": 1024
            }
        },
        "source": {
            "placeholder": "数据源",
            "type": "text",
            "label": "数据源",
            "description": "api或者数据映射",
            "name": "source",
            "mode": "horizontal",
            "required": true
        },
        "delimiter": {
            "placeholder": "分隔符，默认“,”",
            "type": "text",
            "label": "分隔符",
            "name": "delimiter",
            "mode": "horizontal"
        },
        "value": {
            "placeholder": "默认值",
            "type": "text",
            "label": "默认值",
            "name": "value",
            "mode": "horizontal"
        },
        "required": {
            "type": "switch",
            "label": "是否必须",
            "name": "required",
            "mode": "horizontal",
            "value": false,
            "option": "在创建内容时，此此段是必需要填写的"
        },
        "sortable": {
            "type": "switch",
            "label": "是否设置为排序字段",
            "name": "sortable",
            "mode": "horizontal",
            "value": false,
            "option": "设置此字段排序功能"
        },
        "hidden": {
            "type": "switch",
            "label": "是否隐藏",
            "name": "hidden",
            "mode": "horizontal",
            "value": false,
            "option": "配置隐藏静态字段"
        }
    }
}, {
    "name": "related",
    "label": "关联",
    "icon": "fa fa-sitemap",
    "avatar": "/icon/sitemap.png",
    "properties": {
        "_ref": {
            "type": "text",
            "label": "所属属性",
            "name": "_ref",
            "hidden": true,
            "value": "related"
        },
        "type": {
            "type": "text",
            "label": "表单类型",
            "name": "type",
            "hidden": true,
            "value": "select"
        },
        "label": {
            "placeholder": "展示名称",
            "type": "text",
            "label": "展示名",
            "name": "label",
            "mode": "horizontal",
            "required": true,
            "validations": {
                "minLength": 0,
                "maxLength": 32
            }
        },
        "name": {
            "placeholder": "数据键",
            "type": "text",
            "label": "数据键",
            "name": "name",
            "mode": "horizontal",
            "required": true,
            "validations": {
                "minLength": 0,
                "maxLength": 100
            }
        },
        "description": {
            "placeholder": "描述信息，会展示在表单的说明信息中",
            "type": "textarea",
            "label": "描述",
            "name": "description",
            "mode": "horizontal",
            "validations": {
                "minLength": 0,
                "maxLength": 1024
            }
        },
        "related": {
            "type": "combo",
            "name": "related",
            "label": "关联",
            "multiLine": true,
            "controls": [{
                "placeholder": "关联模型",
                "type": "select",
                "label": "关联模型",
                "description": "默认使用`_id`关联",
                "name": "collection",
                "source": {
                    "method": "get",
                    "url": "/api/site/$siteId/collection?_all",
                    "cache": 3000
                    // "adaptor": "return {\n    ...payload,\n    data:{options:payload.data.map(v=>({label:v.label, value: v._id}))}\n}"
                },
                "labelField": "label",
                "valueField": "_id",
                "required": true
            }, {
                "placeholder": "关联属性",
                "type": "select",
                "label": "关联属性",
                "name": "property",
                "value": "_id",
                "source": {
                    "method": "get",
                    "url": "/api/site/$siteId/collection/$collection/property",
                    "sendOn": "this.collection"
                    // "adaptor": "return {\n    ...payload,\n    data:{options:payload.data.items.map(v=>({label:v.label,value:v.name}))}\n}"
                },
                "labelField": "label",
                "valueField": "name",
                "required": true
            }, {
                "type": "text",
                "label": "增加过滤参数",
                "placeholder": "例如:`name=test`",
                "name": "filter",
                "description": "多个条件以`&`分隔"
            }]
        },
        "required": {
            "type": "switch",
            "label": "是否必须",
            "name": "required",
            "mode": "horizontal",
            "value": false,
            "option": "在创建内容时，此此段是必需要填写的"
        },
        "multiple": {
            "type": "switch",
            "label": "是否多选",
            "name": "multiple",
            "mode": "horizontal",
            "value": false,
            "option": "可多选"
        },
        "sortable": {
            "type": "switch",
            "label": "是否设置为排序字段",
            "name": "sortable",
            "mode": "horizontal",
            "value": false,
            "option": "设置此字段排序功能"
        },
        "hidden": {
            "type": "switch",
            "label": "是否隐藏",
            "name": "hidden",
            "mode": "horizontal",
            "value": false,
            "option": "配置隐藏静态字段"
        }
    }
}, {
    "name": "custom",
    "label": "自定义",
    "icon": "fa fa-pencil-square-o",
    "avatar": "/icon/font-selection-editor.png",
    "properties": {
        "_ref": {
            "type": "text",
            "label": "所属属性",
            "name": "_ref",
            "hidden": true,
            "value": "custom"
        },
        "_schema": {
            "type": "editor",
            "language": "json",
            "label": "表单结构",
            "name": "_schema",
            "required": true,
            "options": {}
        }
    }
}]

/**
{
    "name": "form",
    "label": "内嵌",
    "icon": "fa fa-snapchat",
    "properties": {
        type: {
            "type": "text",
            "label": "表单类型",
            "name": "type",
            "hidden": true,
            "value": "editor"
        },
        label: {
            "placeholder": "展示名称",
            "type": "text",
            "label": "展示名",
            "name": "label",
            "mode": "horizontal",
            "required": true,
            "validations": {
                minLength: 0,
                maxLength: 32
            }
        },
        name: {
            "placeholder": "数据键",
            "type": "text",
            "label": "数据键",
            "name": "name",
            "mode": "horizontal",
            "required": true,
            "validations": {
                minLength: 0,
                maxLength: 32
            }
        },
        description: {
            "placeholder": "描述信息，会展示在表单的说明信息中",
            "type": "textarea",
            "label": "描述",
            "name": "description",
            "mode": "horizontal",
            "validations": {
                minLength: 0,
                maxLength: 1024
            }
        },
        form: {
            "name": "form",
            "type": "button",
            "label": "表单配置",
            "mode": "horizontal",
            "dialog": {
                "title": "表单配置",
                "body": {
                    "type": "hbox",
                    "columns": [{
                        "type": "panel",
                        "title": "字段列表",
                        "className": "no-border m-r-lg",
                        "body": {
                            "type": "service",
                            "name": "properties",
                            "source": "${form}",
                            "body": {
                                "type": "cards",
                                "itemClassName": "col-md-7",
                                "placeholder": "暂无数据",
                                "card": {
                                    "header": {
                                        "title": "$label",
                                        "subTitle": "#$type",
                                        "description": "$description",
                                        "avatarClassName": "pull-left thumb-md avatar b-3x m-r",
                                        "avatarText": "Icon"
                                    },
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
                                                "api": `put:/api/collection/${collection._id}/property/$name`,
                                                "controls": [{
                                                    "type": "service",
                                                    "schemaApi": "get:/api/property/$type?type=amis"
                                                }]
                                            }
                                        }
                                    }, {
                                        "type": "button",
                                        "label": "删除",
                                        "actionType": "ajax",
                                        "confirmText": "您确认要删除?",
                                        "reload": "properties",
                                        "api": `delete:/api/collection/${collection._id}/property/$name`
                                    }],
                                    "visibleOn": "!this.hidden",
                                }
                            }

                        }
                    }, {
                        "type": "panel",
                        "title": "属性类型",
                        "className": "no-border m-r-lg",
                        "columnClassName": "w-md",
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
                                    "reload": "properties",
                                    "dialog": {
                                        "title": "新增属性",
                                        "size": "lg",
                                        "body": {
                                            "type": "form",
                                            "debug": conf.debug,
                                            "api": `post:/api/collection/${collection._id}/property`,
                                            "controls": _.values(prop.properties)
                                        }
                                    }
                                }
                            })
                        }
                    }]
                }
            }
        },
        multiple: {
            "name": "multiple",
            "type": "switch",
            "label": "多选模式",
            "mode": "horizontal",
            "value": false,
            "option": "是否为一对多关系"
        },
        required: {
            "type": "switch",
            "label": "是否必须",
            "name": "required",
            "mode": "horizontal",
            "value": false,
            "option": "在创建内容时，此此段是必需要填写的"
        }
    }
}
*/


/**
 * 1. 文本框 text
 * 2. 多行文本框 textarea
 * 3. 数字 number
 * 4. 布尔 switch
 * 5. 枚举 select
 * 6. 日期 date
 * 7. 日期与时间 datetime
 * 8. 文件 file
 * 9. 图片 image
 * 10. 视频 video
 * 11. 手机号 phone
 * 12. 邮箱 email
 * 13. url地址 url
 * 14. 富文本 rich-text
 * 15. json对象 editor
 * 16. 关联 
 * 17. 内嵌
 */

module.exports = properties