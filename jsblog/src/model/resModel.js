// 基础的处理数据模型的class
class BaseModel {
    // 原来这种写法也是学习jquery的,再次坚定你学习jquery源码的决心
    constructor(data, msg) {
        if (typeof data == 'string') {
            this.msg = data
            data = null
            msg = null
        }
        if (data) {
            this.data = data
        }
        if (msg) {
            this.msg = msg
        }
    }
}
class SuccessModel extends BaseModel {
    constructor(data, msg) {
        super(data, msg)
        this.ret = 1
    }
}
class ErrorModel extends BaseModel {
    constructor(data, msg) {
        super(data, msg)
        this.ret = -1
    }
}
module.exports = {
    SuccessModel,
    ErrorModel
}
