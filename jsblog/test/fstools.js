// 文件操作模块
const fs = require('fs')
const path = require('path')
const http = require('http')
const opt = {
    flag: 'a' // 追加写入
}
// 如没有写opt配置就是覆盖写入
fs.writeFile('./text.txt', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', opt, (err) => {
    err && console.error(err)
})
fs.writeFile('./text.txt', 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb', opt, (err) => {
    err && console.error(err)
})
// 判断一个文件是否存在
fs.exists('./text.txt', (exists) => {
    if (exists) {
        console.log('exists', exists)
    }
})

// 复制文件，利用管道流复制文件
const filename1 = path.resolve(__dirname, 'text.txt')
const filename2 = path.resolve(__dirname, 'text2.txt')
const readStream = fs.createReadStream(filename1)
const writeStream = fs.createWriteStream(filename2)
readStream.pipe(writeStream)
readStream.on('end', (err) => {
    err && console.error(err)
    console.log('done')
})

const server = http.createServer((req, res) => {
    const readStr = fs.createReadStream(filename1)
    readStr.pipe(res)
})
server.listen(8003, (err) => {
    err && console.log(err)
    console.log('127.0.0.1:8088')
})
