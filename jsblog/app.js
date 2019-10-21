const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
// 中间件处理req和res
const {
    getPostData,
    getCookieExpires
} = require('./src/utils/common.js')
const { access } = require('./src/utils/log.js')
// 设置一个session变量
const SESSION_DATA = {} // session在程序重启的时候会丢失
const serverHandle = (req, res) => {
    // 处理get请求的数据
    const url = req.url
    req.path = url.split('?')[0]
    req.query = querystring.parse(url.split('?')[1])
    // 返回json文件
    access(`${req.method}--${req.url}--${req.headers['user-agent']}--${new Date().toGMTString()}`)
    res.setHeader('Content-type', 'application/json')
    // 服务端如何获取cookie
    req.cookie = {}
    // 有个空格，写程序的人，要相信万事皆有因，不要说碰了鬼之类的话
    console.log(req.headers['cookie'])
    const cookieStr = req.headers['cookie'] || '' // 细节不能丢呢
    cookieStr.split(';').forEach((item) => {
        if (!item) {
            return
        }
        let arr = item.split('=')
        let key = arr[0].trim()
        let value = arr[1]
        req.cookie[key] = value
    })
    console.log('req.cookie', req.cookie)
    console.log('req.cookie.username', req.cookie.username)
    // 解析session
    let needSetcookie = false
    let userId = req.cookie.userid
    console.log('userId', userId)
    if (userId) {
        if (!SESSION_DATA[userId]) {
            SESSION_DATA[userId] = {}
        }
    } else {
        needSetcookie = true
        userId = `${Date.now()} _${Math.random()} `
        SESSION_DATA[userId] = {}
    }
    req.session = SESSION_DATA[userId]
    console.log('req.session111', req.session)
    // 异步处理blog数据
    getPostData(req).then((postData) => {
        req.body = postData
        // const blogData = handleBlogRouter(req, res)
        // if (blogData) {
        //     res.end(
        //         JSON.stringify(blogData)
        //     )
        //     return
        // }
        // 需要异步处理请求,promise让写异步请求像写同步一样简单
        const blogResult = handleBlogRouter(req, res)
        console.log(blogResult)
        if (blogResult) {
            blogResult.then((blogData) => {
                if (needSetcookie) {
                    console.log('userId', userId)
                    res.setHeader('Set-Cookie', `userid = ${userId}; path = /; httpOnly; expires=${getCookieExpires()}`)
                }
                res.end(
                    JSON.stringify(blogData)
                )
            })
            return
        }
        // 处理user数据
        const userResult = handleUserRouter(req, res)
        if (userResult) {
            userResult.then((userData) => {
                if (needSetcookie) {
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                }
                console.log(userData, userData)
                res.end(
                    JSON.stringify(userData)
                )
            })
            return
        }
        // 未命中路由，返回404
        res.writeHead(404, {
            'Cotent-type': 'text/plain'
        })
        res.write('404 Not found')
        res.end()
    }).catch((err) => {
        console.log(err)
    })
    // 处理静态页面返回
    // 多了这个鬼，导致代码发送获取不到post数据，但是为什么发送get请求可以呢，困惑了大半天的bug，哎，写代码要严谨
    // res.end()
}
module.exports = serverHandle
