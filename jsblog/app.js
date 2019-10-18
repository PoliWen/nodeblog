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
    const method = req.method
    const url = req.url
    req.path = url.split('?')[0]
    const resData = {
        method,
        url,
        path: req.path,
        query: req.query
    }
    req.query = querystring.parse(url.split('?')[1])
    // 返回json文件
    res.setHeader('Content-type', 'application/json')

    // 异步处理blog数据
    getPostData(req).then((postData) => {
        req.body = postData
        const blogData = handleBlogRouter(req, res)
        if (blogData) {
            res.end(
                JSON.stringify(blogData)
            )
            return
        }
        // 处理user数据
        const userData = handleUserRouter(req, res)
        if (userData) {
            res.end(
                JSON.stringify(userData)
            )
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
