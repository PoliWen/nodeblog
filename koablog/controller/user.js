const {
    mysqlExec,
    escape
} = require('../utils/db.js')
const {
    genPassword
} = require('../utils/cryp.js')
const checkLogin = async(username, password) => {
    username = escape(username)
    password = escape(password)
    password = genPassword(password)
    console.log('password', password)
    const sql = `select * from users where username=${username} and password='${password}';`
    const userData = await mysqlExec(sql)
    return userData[0] || {}
}

module.exports = {
    checkLogin
}
8
