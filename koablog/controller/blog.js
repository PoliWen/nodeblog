const {
    mysqlExec
} = require('../utils/db.js')
const xss = require('xss')
// 获取博客列表
const getList = (author, keyword) => {
    let sql = `select * from blogs where 1=1`
    if (author) {
        sql += ` and author='${author}'`
    }
    if (keyword) {
        sql += ` and title like '%${keyword}%'`
    }
    sql += ` order by createtime desc;`
    console.log(sql)
    // 返回的是一个promise
    return mysqlExec(sql)
}
// 获取博客详情
const getDetail = async(id) => {
    const sql = `select * from blogs where id='${id}';`
    console.log(sql)
    const detailData = await mysqlExec(sql)
    return detailData[0]
}
// 新建一篇博客
const newBlog = async(data, author) => {
    const {
        title,
        content
    } = data

    const createtime = Date.now()
    const sql = `insert into blogs (title,content,createtime,author) values ('${xss(title)}','${xss(content)}','${createtime}','${author}');`
    console.log(sql)
    const inserData = await mysqlExec(sql)
    return {
        id: inserData.insertId
    }
}
// 更新一篇博客
const upDateBlog = async(id, data, author) => {
    const {
        title,
        content
    } = data
    const createtime = Date.now()
    const sql = `update blogs set title='${xss(title)}',content='${xss(content)}',author='${author}',createtime='${createtime}' where id='${id}';`
    console.log(sql)
    const updateDate = await mysqlExec(sql)
    if (updateDate.affectedRows > 0) {
        return true
    }
    return false
}
// 删除一篇博客
const delBlog = async(id, author) => {
    const sql = `delete from blogs where id='${id}' and author='${author}';`
    console.log(sql)
    const delDate = await mysqlExec(sql)
    if (delDate.affectedRows > 0) {
        return true
    }
    return false
}
module.exports = {
    getList,
    getDetail,
    newBlog,
    upDateBlog,
    delBlog
}
