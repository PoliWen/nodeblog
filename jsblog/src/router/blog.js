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
const loginCheck = function(req) {
    if (!req.session.username) {
        return Promise.resolve(new ErrorModel('您未登录，请先登录'))
    }
}
const handleBlogRouter = (req, res) => {
    const method = req.method
    const path = req.path
    const id = req.query.id || ''
    // 获取博客列表接口
    if (method === 'GET' && path === '/api/blog/list') {
        const author = req.query.author
        const keyword = req.query.keyword
        // const listData = getList(author, keyword)
        // return new SuccessModel(listData)
        const result = getList(author, keyword)
        return result.then((listData) => {
            return new SuccessModel(listData)
        })
    }
    // 获取博客详情接口
    if (method === 'GET' && path === '/api/blog/detail') {
        // const articleData = getDetail(id)
        // return new SuccessModel(articleData)
        const result = getDetail(id)
        return result.then((detailData) => {
            if (detailData) {
                return new SuccessModel(detailData)
            }
        })
    }
    // 新建一篇博客接口
    if (method === 'POST' && path === '/api/blog/new') {
        const loginCheckResult = loginCheck(req)
        // 有值说明登录失败
        if (loginCheckResult) {
            return loginCheck(req)
        }
        const author = req.session.realname
        const result = newBlog(req.body, author)
        return result.then((newData) => {
            if (newData) {
                return new SuccessModel(newData)
            } else {
                return new ErrorModel('添加博客失败')
            }
        })
    }
    // 更新一篇博客接口
    if (method === 'POST' && path === '/api/blog/update') {
        const loginCheckResult = loginCheck(req)
        // 有值说明登录失败
        if (loginCheckResult) {
            return loginCheck(req)
        }
        const author = req.session.realname
        const result = upDateBlog(id, req.body, author)
        return result.then((updateData) => {
            if (updateData) {
                return new SuccessModel('成功更新一篇博客')
            } else {
                return new ErrorModel('更新博客失败')
            }
        })
    }
    // 删除一篇博客接口
    if (method === 'POST' && path === '/api/blog/del') {
        const loginCheckResult = loginCheck(req)
        // 有值说明登录失败
        if (loginCheckResult) {
            return loginCheck(req)
        }
        const author = req.session.realname
        const id = req.query.id
        const result = delBlog(id, author)
        return result.then((delData) => {
            if (delData) {
                return new SuccessModel('成功删除一篇博客')
            } else {
                return new ErrorModel('删除失败')
            }
        })
    }
}
module.exports = handleBlogRouter
