// 设置database的配置信息
const env = process.env.NODE_ENV
let MYSQL_CONF
if (env == 'dev') {
    // 测试环境数据库配置
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'root',
        port: 3306,
        database: 'myblog'
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
}
module.exports = { MYSQL_CONF }
