const {
    checkLogin
} = require('../controller/user.js')
const {
    SuccessModel,
    ErrorModel
} = require('../model/resModel.js')
const handleUserRouter = (req, res) => {
    const method = req.method
    const url = req.url
    const path = url.split('?')[0]
    // 登录的接口
    if (method === 'POST' && path === '/api/user/login') {
        console.log(req.body)
        const {
            user,
            psw
        } = req.body
        const result = checkLogin(user, psw)
        if (result) {
            return new SuccessModel(result, '登录成功')
        } else {
            return new ErrorModel('登录失败') // 登录应该还有一些其他的验证方式
        }
    }
}
module.exports = handleUserRouter
