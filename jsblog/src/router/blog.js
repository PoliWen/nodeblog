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
const handleBlogRouter = (req, res) => {
    const method = req.method
    const path = req.path
    const id = req.query.id || ''
    // 获取博客列表接口
    if (method === 'GET' && path === '/api/blog/list') {
        const author = req.query.author
        const keywords = req.query.keywords
        const listData = getList(author, keywords)
        return new SuccessModel(listData)
    }
    // 获取博客详情接口
    if (method === 'GET' && path === '/api/blog/detail') {
        const articleData = getDetail(id)
        return new SuccessModel(articleData)
    }
    // 新建一篇博客接口
    if (method === 'POST' && path === '/api/blog/new') {
        const newData = newBlog(req.body)
        if (newData) {
            return new SuccessModel(newData, '成功添加一篇博客')
        } else {
            return new ErrorModel('添加博客失败')
        }
    }
    // 更新一篇博客接口
    if (method === 'POST' && path === '/api/blog/update') {
        const data = newBlog(id, req.body)
        if (data) {
            return new SuccessModel(data, '成功更新一篇博客')
        } else {
            return new ErrorModel('更新博客失败')
        }
    }
    // 删除一篇博客接口
    if (method === 'POST' && path === '/api/blog/del') {
        const result = newBlog(id)
        if (result) {
            return new SuccessModel(result, '成功删除一篇博客')
        } else {
            return new ErrorModel('添加博客失败')
        }
    }
}
module.exports = handleBlogRouter
