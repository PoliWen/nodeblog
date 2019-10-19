const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
// 中间件处理req和res
const {
    getPostData
} = require('./src/utils/common.js')
console.log(getPostData)
const serverHandle = (req, res) => {
    // 处理get请求的数据
    const url = req.url
    req.path = url.split('?')[0]
    req.query = querystring.parse(url.split('?')[1])
    // 返回json文件
    res.setHeader('Content-type', 'application/json')

    // 服务端如何获取cookie
    req.cookie = {}
    // 有个空格，写程序的人，要相信万事皆有因，不要说碰了鬼之类的话
    const cookieStr = req.headers['cookie'].split(';')
    cookieStr.forEach((item) => {
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
        if (blogResult) {
            blogResult.then((blogData) => {
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
