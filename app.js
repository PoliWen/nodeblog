const http = require('http')
const querystring = require('querystring')
const {
    hostName,
    port
} = require('./src/config/config.js')

const app = http.createServer((req, res) => {
    // 处理get请求的数据
    const method = req.method
    const url = req.url
    console.log(req.method)
    const path = url.split('?')[0]
    const query = querystring.parse(url.split('?')[1])
    res.setHeader('Content-Type', 'application/json')
    const resData = {
        method,
        url,
        path,
        query
    }
    if (req.method == 'GET') {
        console.log(resData)
        res.end(JSON.stringify(resData))
    }
    // 处理post请求的数据
    if (req.method == 'POST') {
        let postData = ''
        req.on('data', (data) => {
            postData += data.toString()
        })
        req.on('end', () => {
            resData.postData = postData
            console.log(resData)
            res.end(JSON.stringify(resData))
        })
        // git提交
    }
    // 处理静态页面返回
})
app.listen(port, hostName, () => {
    console.log(`server is runing success at http://${hostName}:${port}`)
})
