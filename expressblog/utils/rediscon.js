// 封装一个redis方法
const redis = require('redis')
const {
    REDIS_CONF
} = require('../config/dbconf')
// 创建一个redis连接
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error', (err) => {
    err && console.error(err)
})
// 设置redis变量
function set(key, val) {
    // 对象要转换成字符串
    if (typeof val == 'object') {
        val = JSON.stringify(val)
    }
    redisClient.set(key, val, redis.print)
}

// get是异步请求，需要返回一个promise
function get(key) {
    const promise = new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            // 对每个传入的值都要进行验证判断，要形成严谨的编程习惯
            if (err) {
                reject(err)
                return
            }
            // val不存在
            if (!val) {
                resolve(null)
                return
            }
            try {
                resolve(JSON.parse(val))
            } catch (ex) {
                resolve(val)
            }
        })
    })
    return promise
}
// 获取redis变量
module.exports = redisClient
