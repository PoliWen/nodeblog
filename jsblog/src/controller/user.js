const { mysqlExec } = require('../utils/db.js')
const checkLogin = (user, psw) => {
    const sql = `select * from users where username='${user}' and password='${psw}';`
    return mysqlExec(sql).then((userData) => {
        // 如果能够查出来来数据就说明账号正确
        return userData[0] || {}
    })
}

module.exports = {
    checkLogin
}
