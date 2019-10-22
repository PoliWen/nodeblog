const router = require('koa-router')()

const {
    getList,
    getDetail,
    newBlog,
    upDateBlog,
    delBlog
} = require('../controller/blog.js')
const {
    SuccessModel,
    ErrorModel
} = require('../model/resModel.js')
const {
    checkLogin
} = require('../midleware/index.js')
console.log('checkLogin', checkLogin)
// 获取博客列表接口
router.prefix('/api/blog')
router.get('/list', async(ctx, next) => {
    const author = ctx.query.author
    const keyword = ctx.query.keyword
    // const listData = getList(author, keyword)
    // return new SuccessModel(listData)
    const listData = await getList(author, keyword)
    ctx.body = new SuccessModel(listData) // 这里才是精华部分
})
// 获取博客详情接口
router.get('/detail', async(ctx, next) => {
    const id = ctx.query.id
    const detailData = await getDetail(id)
    ctx.body = new SuccessModel(detailData)
})
// 新建一篇博客接口
router.post('/new', checkLogin, async(ctx, next) => {
    const author = ctx.session.realname
    console.log(author)
    const newData = await newBlog(ctx.request.body, author)
    if (newData) {
        ctx.body = new SuccessModel(newData)
    } else {
        ctx.body = new ErrorModel('添加博客失败')
    }
})
// 更新一篇博客接口
router.post('/update', checkLogin, async(ctx, next) => {
    const id = ctx.query.id
    const author = ctx.session.realname
    const updateData = await upDateBlog(id, ctx.request.body, author)
    if (updateData) {
        ctx.body = new SuccessModel('成功更新一篇博客')
    } else {
        ctx.body = new ErrorModel('更新博客失败')
    }
})
// 删除一篇博客接口
router.post('/del', checkLogin, async(ctx, next) => {
    const author = ctx.session.realname
    console.log('author', author)
    const id = ctx.query.id
    const delData = await delBlog(id, author)
    if (delData) {
        ctx.body = new SuccessModel('成功删除一篇博客')
    } else {
        ctx.body = new ErrorModel('删除失败')
    }
})
module.exports = router
