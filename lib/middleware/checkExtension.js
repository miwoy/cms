const fs = require('fs');
module.exports = function checkFile(extensions) {
    if (!extensions || extensions.length == 0) throw new Error("必须存在参数 extensions 且必须是一个数组")
    return async(ctx, next)=> {
        if (_.keys(ctx.request.files).length > 0) {
            _.each(ctx.request.files, (files, key)=> {
                files.map((file)=> {
                    let valiadte = false
                    extensions.map(ext=> {
                        let regx = new RegExp(`^.+${ext}$`)
                        if (regx.test(file.path)) valiadte = true
                    })
                    if (!valiadte) {
                        fs.unlink(file.path, ()=>{})
                        throw new InvalidArgsGeneralityError("无效的文件后缀，上传文件类型必须是 [" + extensions.join(",") + "]")
                    }
                })
            })
        } else {
            fs.unlink(file.path, ()=>{})
            throw new RequiredArgsGeneralityError("不存在上传的文件")
        }

        await next()
    }
}