const router = require('koa-router')()
const {
    checkLogin
} = require('../controller/user.js')
const {
    SuccessModel,
    ErrorModel
} = require('../model/resModel.js')
router.prefix('/api/user')
router.post('/login', async(ctx, next) => {
    const {
        username,
        password
    } = ctx.request.body
    // 从数据库拿到数据
    const userData = await checkLogin(username, password)
    if (userData.username) {
        // 服务端设置cookie
        // res.setHeader('Set-Cookie', `username=${userData.username};path='/';httpOnly;expires=${getCookieExpires()}`)
        ctx.session.username = userData.username
        ctx.session.realname = userData.realname
        console.log('session', ctx.session)
        ctx.body = new SuccessModel(userData, '登录成功')
    } else {
        ctx.body = new ErrorModel('登录失败') // 登录应该还有一些其他的验证方式
    }
})
router.get('/test-login', (ctx, next) => {
    const session = ctx.session
    console.log('session', session)
    if (!session.viewNum) {
        session.viewNum = 0
    }
    session.viewNum++
    ctx.body = new SuccessModel({
        viewnum: session.viewNum
    }, '纪录每次浏览的次数')
})
module.exports = router
