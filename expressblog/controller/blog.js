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
const getDetail = (id) => {
    const sql = `select * from blogs where id='${id}';`
    console.log(sql)
    return mysqlExec(sql).then((rows) => {
        return rows[0]
    })
}
// 新建一篇博客
const newBlog = (data, author) => {
    const {
        title,
        content
    } = data

    const createtime = Date.now()
    const sql = `insert into blogs (title,content,createtime,author) values ('${xss(title)}','${xss(content)}','${createtime}','${author}');`
    console.log(sql)
    return mysqlExec(sql).then((insertData) => {
        console.log('insertData', insertData)
        return {
            id: insertData.insertId
        }
    })
}
// 更新一篇博客
const upDateBlog = (id, data, author) => {
    const {
        title,
        content
    } = data
    const createtime = Date.now()
    const sql = `update blogs set title='${xss(title)}',content='${xss(content)}',author='${author}',createtime='${createtime}' where id='${id}';`
    console.log(sql)
    return mysqlExec(sql).then((updateDate) => {
        console.log('updateData', updateDate)
        if (updateDate.affectedRows > 0) {
            return true
        }
        return false
    })
}
// 删除一篇博客
const delBlog = (id, author) => {
    const sql = `delete from blogs where id='${id}' and author='${author}';`
    console.log(sql)
    return mysqlExec(sql).then((delDate) => {
        console.log('delDate', delDate)
        if (delDate.affectedRows > 0) {
            return true
        }
        return false
    })
}
module.exports = {
    getList,
    getDetail,
    newBlog,
    upDateBlog,
    delBlog
}
