// 如何生成日志文件
const fs = require('fs')
const path = require('path')
function createWriteStream(filename) {
    const filepath = path.join(__dirname, '../', 'log', filename)
    console.log(filepath)
    const opt = {
        flags: 'a'
    }
    return fs.createWriteStream(filepath, opt)
}
const accessWriteStream = createWriteStream('access.log')
function access(log) {
    accessWriteStream.write(log + '\n') // 写入日志
}

// 日志需要进行拆分，按天拆分，按小时拆分

module.exports = {
    access
}

