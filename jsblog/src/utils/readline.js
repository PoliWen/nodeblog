// 逐行分析日志,分析用户firefox的占比
const fs = require('fs')
const path = require('path')
const readline = require('readline')
const filepath = path.join(__dirname, '../', 'log', 'access.log')
const readStream = fs.createReadStream(filepath)
const rl = readline.createInterface({
    input: readStream
})
let firfoxNum = 0
let sum = 0
rl.on('line', (linedata) => {
    if (!linedata) {
        return
    }
    sum++
    let arr = linedata.split('--')
    if (arr[2] && arr[2].indexOf('Firefox') > 0) {
        firfoxNum++
    }
})
// 哦very good
rl.on('close', () => {
    console.log('firfox浏览器占比', firfoxNum / sum, 'o very good')
})
