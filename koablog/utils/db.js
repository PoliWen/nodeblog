// 创建一个操作数据库的通用方法
const mysql = require('mysql')

// 数据库连接配置
const {
    MYSQL_CONF
} = require('../config/dbconf.js')

// 创建一个连接
const con = mysql.createConnection(MYSQL_CONF)

// 开始连接
con.connect() // 这一句好像没多大的用处
function mysqlExec(sql) {
    const promise = new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) {
                console.error(err)
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
    return promise
}
module.exports = {
    mysqlExec,
    escape: mysql.escape
}
