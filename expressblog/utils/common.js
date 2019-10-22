// 一些公共的js方法
// 所有的异步函数都封装成promise
const getPostData = (req) => {
    return new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({})
            return
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }
        // 处理post请求的数据
        let postData = ''
        req.on('data', (data) => {
            postData += data.toString()
        })
        req.on('end', () => {
            req.body = postData
            resolve(JSON.parse(req.body))
        })
        // git提交
    })
}
// 设置cookie过期时间
function getCookieExpires() {
    const d = new Date()
    d.setTime(d.getTime() + (20 * 60 * 60 * 1000))
    console.log('d.toGMTString() is', d.toGMTString())
    return d.toGMTString()
}
module.exports = {
    getPostData,
    getCookieExpires
}
