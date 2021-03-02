const {
    formatDate
} = require("lib/common/util");

const STATUS = {
    END: "end",
    PENDING: "pending"
}

class Tasker {
    constructor(id) {
        this.id = id
        this.status = STATUS.END
        this.data = []
        this.download = null
    }
    pushLog(log) {
        log.split("\n").forEach(l => {
            if (l)
                this.data.push(`[${formatDate(new Date())}]: ${l}`)
        })
    }
    pushError(err) {
        err.split("\n").forEach(err => {
            if (err)
                this.data.push(`[${formatDate(new Date())}]: <span style="color: red">${err}</span>\n`)
        })
    }
    clean() {
        this.data = []
        this.download = null
        this.status = STATUS.END
    }
    start() {
        this.data = ["开始执行任务:"+this.id]
        this.download = null
        this.status = STATUS.PENDING
    }
    finish() {
        this.data.push("任务执行完成:"+this.id)
        this.status = STATUS.END
    }
}


module.exports = {
    createTasker: (id) => {
        return new Tasker(id)
    }
}