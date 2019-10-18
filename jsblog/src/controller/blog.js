const getList = (author, keywords) => {
    return [{
        id: '1',
        title: '标题一',
        content: '内容一',
        creatTime: '1571413473790',
        author: '张三'
    },
    {
        id: '2',
        title: '标题二',
        content: '内容二',
        creatTime: '1571413473790',
        author: '李四'
    },
    {
        id: '3',
        title: '标题三',
        content: '内容三',
        creatTime: '1571413473790',
        author: '王五'
    }
    ]
}
const getDetail = (id) => {
    return {
        id: '3',
        title: '标题三',
        content: '内容三',
        creatTime: '1571413473790',
        author: '王五'
    }
}
const newBlog = (data) => {
    console.log(data)
    return {
        id: 2
    }
}
const upDateBlog = (id, data) => {
    console.log(data)
    return true
}
const delBlog = (id) => {
    console.log(data)
    return true
}
module.exports = {
    getList,
    getDetail,
    newBlog,
    upDateBlog,
    delBlog
}
