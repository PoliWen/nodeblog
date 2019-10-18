const fs = require('fs')
const baseurl = __dirname // 获取当前根目录文件夹
const ignoreDir = ['.git', '.vscode', 'node_modules']
addGitkeep(baseurl)
// 你就可以写一个批量添加.gitkeep的文件
function addGitkeep(url) {
    fs.readdir(url, { withFileTypes: true }, (err, files) => {
        err && console.log(err)
        // 该目录下没有文件
        if (!files.length) {
            return fs.writeFile(url + '/.gitkeep', null, err => {
                err && console.log(err)
            })
        }
        files.forEach(dirent => {
            if (!ignoreDir.includes(dirent.name) && dirent.isDirectory()) {
                addGitkeep(url + '/' + dirent.name)
            }
        })
    })
}
