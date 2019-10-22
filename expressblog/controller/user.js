const {
    mysqlExec,
    escape
} = require('../utils/db.js')
const {
    genPassword
} = require('../utils/cryp.js')
const checkLogin = (username, password) => {
    username = escape(username)
    password = escape(password)
    password = genPassword(password)
    console.log('password', password)
    const sql = `select * from users where username=${username} and password='${password}';`
    return mysqlExec(sql).then((userData) => {
        // 如果能够查出来数据就说明账号正确
        return userData[0] || {}
    })
}

module.exports = {
    checkLogin
}
