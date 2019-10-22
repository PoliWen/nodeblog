const express = require('express')
const router = express.Router()
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
const { checkLogin } = require('../midleware/index.js')
console.log('checkLogin', checkLogin)
// 获取博客列表接口
router.use('/list', (req, res) => {
    const author = req.query.author
    const keyword = req.query.keyword
    // const listData = getList(author, keyword)
    // return new SuccessModel(listData)
    const result = getList(author, keyword)
    return result.then((listData) => {
        res.json(
            new SuccessModel(listData)
        )
    })
})
// 获取博客详情接口
router.use('/detail', (req, res) => {
    const id = req.query.id
    const result = getDetail(id)
    return result.then((detailData) => {
        if (detailData) {
            res.json(new SuccessModel(detailData))
        }
    })
})
// 新建一篇博客接口
router.use('/new', checkLogin, (req, res) => {
    const author = req.session.realname
    const result = newBlog(req.body, author)
    return result.then((newData) => {
        if (newData) {
            res.json(new SuccessModel(newData))
        } else {
            res.json(new ErrorModel('添加博客失败'))
        }
    })
})
// 更新一篇博客接口
router.use('/update', checkLogin, (req, res) => {
    const id = req.query.id
    const author = req.session.realname
    const result = upDateBlog(id, req.body, author)
    return result.then((updateData) => {
        if (updateData) {
            res.json(new SuccessModel('成功更新一篇博客'))
        } else {
            res.json(new ErrorModel('更新博客失败'))
        }
    })
})
// 删除一篇博客接口
router.use('/del', checkLogin, (req, res) => {
    const author = req.session.realname
    console.log('author', author)
    const id = req.query.id
    const result = delBlog(id, author)
    return result.then((delData) => {
        if (delData) {
            res.json(new SuccessModel('成功删除一篇博客'))
        } else {
            res.json(new ErrorModel('删除失败'))
        }
    })
})
module.exports = router
