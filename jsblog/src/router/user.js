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
        const {
            username,
            password
        } = req.body
        console.log(req.body)
        const result = checkLogin(username, password)
        return result.then((userData) => {
            if (userData.username) {
                // 服务端设置cookie
                // res.setHeader('Set-Cookie', `username=${userData.username};path='/';httpOnly;expires=${getCookieExpires()}`)
                req.session.username = userData.username
                req.session.realname = userData.realname
                console.log('session', req.session)
                return new SuccessModel(userData, '登录成功')
            } else {
                return new ErrorModel('登录失败') // 登录应该还有一些其他的验证方式
            }
        })
    }
    if (method == 'GET' && path == '/api/user/test-login') {
        console.log(req.cookie.username)
        // if (req.cookie.username) {
        //     return Promise.resolve(new SuccessModel({
        //         username: req.cookie.username
        //     }, '登录成功'))
        // } else {
        //     return Promise.resolve(new ErrorModel('登录失败'))
        // }
        // 使用session判断是否登录成功
        if (req.session.username) {
            return Promise.resolve(new SuccessModel({
                session: req.session
            }, '登录成功'))
        } else {
            return Promise.resolve(new ErrorModel('登录失败'))
        }
    }
}
module.exports = handleUserRouter
