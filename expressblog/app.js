var createError = require('http-errors')
var express = require('express')
const fs = require('fs')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
const blogRouter = require('./routes/blog')
const uerRouter = require('./routes/user')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
var app = express()
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')
app.use(logger('dev'))
const accessLog = fs.createWriteStream(path.join(__dirname, 'log', 'access.log'), { flags: 'a' })
app.use(logger('combined', { stream: accessLog })) // 打印到acesslog
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())// 使用cookie

// session的原理就是通过纪录cookie来传递的
const redisClient = require('./utils/rediscon.js')
const sessionStore = new RedisStore({
    client: redisClient
})
// 设置session并且将session保存到数据库
app.use(session({
    secret: 'fhsajfhsakjxfihsfhsjfsjkfhsa', // 加密函数
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 20 * 60 * 60 * 1000
    },
    store: sessionStore // 将session存储到redis里面去,不明白这样做的好出在哪里,存储了又有啥子用呢
})) // 使用session
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/api/user', uerRouter)
app.use('/api/blog', blogRouter)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
})

module.exports = app
