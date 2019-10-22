// 登录认证
const { ErrorModel } = require('../model/resModel.js')
module.exports = function(req, res, next) {
    if (req.session.username) {
        // 设置了session值说明登录成功了
        next()
        return
    }
    res.json(new ErrorModel('请先登录'))
}
