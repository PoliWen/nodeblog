// 登录认证
const {
    ErrorModel
} = require('../model/resModel.js')
module.exports = async function(ctx, next) {
    if (ctx.session.username) {
        // 设置了session值说明登录成功了
        await next()
        return
    }
    ctx.body = new ErrorModel('请先登录')
}
