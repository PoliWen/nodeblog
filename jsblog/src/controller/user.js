const checkLogin = (user, psw) => {
    console.log(user, psw)
    if (user == '张三' && psw == '123') {
        return true
    } else {
        return false
    }
}

module.exports = {
    checkLogin
}
