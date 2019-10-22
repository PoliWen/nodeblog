const redis = require('redis')
const redisClient = redis.createClient(6379, '127.0.0.1')
redisClient.on('error', (err) => {
    err && console.error(err)
})
// 不要再做一个切图仔了
redisClient.set('username', '张三', redis.print)
redisClient.get('username', (err, val) => {
    if (err) {
        console.log(err)
        return
    }
    console.log('val,获取redis的值成功', val)
})
