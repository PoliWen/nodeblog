const express = require('express')
const router = express.Router()
const {
    checkLogin
} = require('../controller/user.js')
const {
    SuccessModel,
    ErrorModel
} = require('../model/resModel.js')
router.use('/login', (req, res) => {
    const {
        username,
        password
    } = req.body
    console.log(req.body)
    // 从数据库拿到数据
    const result = checkLogin(username, password)
    return result.then((userData) => {
        if (userData.username) {
            // 服务端设置cookie
            // res.setHeader('Set-Cookie', `username=${userData.username};path='/';httpOnly;expires=${getCookieExpires()}`)
            req.session.username = userData.username
            req.session.realname = userData.realname
            console.log('session', req.session)
            res.json(new SuccessModel(userData, '登录成功'))
        } else {
            res.json(new ErrorModel('登录失败')) // 登录应该还有一些其他的验证方式
        }
    })
})
router.use('/test-login', (req, res) => {
    const session = req.session
    if (!session.viewNum) {
        session.viewNum = 0
    }
    session.viewNum++
    res.json(new SuccessModel({
        viewnum: session.viewNum
    }, '纪录每次浏览的次数'))
})
module.exports = router
