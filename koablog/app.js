const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./routes/index')
const users = require('./routes/users')
const userRouter = require('./routes/user')
const blogRouter = require('./routes/blog')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
// 日志处理插件
const fs = require('fs')
const path = require('path')
const morgan = require('koa-morgan')
// error handler
onerror(app)

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())

// 写入日志
app.use(morgan('dev'))
const accessLog = fs.createWriteStream(path.join(__dirname, 'log', 'access.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLog })) // 打印到acesslog

app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
    extension: 'pug'
}))

// logger
app.use(async(ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
    console.error('error', Date.now())
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.keys = ['fhskfhjskhsfjkxxoo']
app.use(session({
    // 配置cookie
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    },
    // 配置redis,注意没连上是因为redis没有开启
    store: redisStore({
        all: '127.0.0.1:6379'
    })
}))

app.use(userRouter.routes(), userRouter.allowedMethods())
app.use(blogRouter.routes(), blogRouter.allowedMethods())
// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})

module.exports = app
