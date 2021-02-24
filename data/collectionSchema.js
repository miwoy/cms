let collectionSchema = [{
    name: "collection",
    label: "集合",
    properties: {
        label: {
            placeholder: "展示名称，如文章",
            type: "text",
            label: "展示名",
            name: "label",
            mode: "horizontal",
            required: true
        },
        name: {
            placeholder: "模型名，如article",
            type: "text",
            label: "模型名",
            name: "name",
            mode: "horizontal",
            required: true
        },
        description: {
            placeholder: "描述信息",
            type: "textarea",
            label: "描述",
            name: "description",
            mode: "horizontal"
        }
    }
}]

module.exports = collectionSchema