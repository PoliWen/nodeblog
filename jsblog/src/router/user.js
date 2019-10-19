const {
    checkLogin
} = require('../controller/user.js')
const {
    SuccessModel,
    ErrorModel
} = require('../model/resModel.js')
function getCookieExpires() {
    const d = new Date()
    d.setTime(d.getTime() + (20 * 60 * 60 * 1000))
    console.log('d.toGMTString() is', d.toGMTString())
    return d.toGMTString()
}
const handleUserRouter = (req, res) => {
    const method = req.method
    const url = req.url
    const path = url.split('?')[0]
    // 登录的接口
    if (method === 'GET' && path === '/api/user/login') {
        const {
            user,
            psw
        } = req.query
        console.log(req.body)
        const result = checkLogin(user, psw)
        return result.then((userData) => {
            if (userData.username) {
                // 服务端设置cookie
                res.setHeader('Set-Cookie', `username=${userData.username};path='/';httpOnly;expires=${getCookieExpires()}`)
                return new SuccessModel(userData, '登录成功')
            } else {
                return new ErrorModel('登录失败') // 登录应该还有一些其他的验证方式
            }
        })
    }
    if (method == 'GET' && path == '/api/user/test-login') {
        console.log(req.cookie.username)
        if (req.cookie.username) {
            return Promise.resolve(new SuccessModel({
                username: req.cookie.username
            }, '登录成功'))
        } else {
            return Promise.resolve(new ErrorModel('登录失败'))
        }
    }
}
module.exports = handleUserRouter
