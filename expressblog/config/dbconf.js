// 设置database的配置信息
const env = process.env.NODE_ENV
let MYSQL_CONF
let REDIS_CONF
if (env == 'dev') {
    // 测试环境数据库配置
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'root',
        port: 3306,
        database: 'myblog'
    }
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
} else if (env == 'prd') {
    // 开发环境数据库配置，暂时以开发相通的配置
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'root',
        port: 3306,
        database: 'myblog'

    }
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
}
module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}
