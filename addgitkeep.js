const fs = require('fs')
const baseurl = __dirname // 获取当前根目录文件夹
const ignoreDir = ['.git', '.vscode', 'node_modules']

// 你就可以写一个批量添加.gitkeep的文件
function addGitkeep(url) {
    fs.readdir(url, { withFileTypes: true }, (err, files) => {
        err && console.log(err)
        // 该目录下没有文件
        if (!files.length) {
            return fs.writeFile(url + '/.gitkeep', null, err => {
                err && console.log(err)
                console.log('添加', url + '/.gitkeep', '成功')
            })
        }
        files.forEach(dirent => {
            if (!ignoreDir.includes(dirent.name) && dirent.isDirectory()) {
                addGitkeep(url + '/' + dirent.name)
            }
        })
    })
}

// 写一个批量删除.gitkeep的方法
function removeGitkeep(url) {
    fs.readdir(url, { withFileTypes: true }, (err, files) => {
        err && console.log(err)
        // 该目录只有一个文件，且文件名==.gitkeep
        if (!files.length) {
            return
        }
        files.forEach(dirent => {
            if (!ignoreDir.includes(dirent.name) && dirent.isDirectory()) {
                removeGitkeep(url + '/' + dirent.name)
            } else if (!ignoreDir.includes(dirent.name) && dirent.isFile() && dirent.name == '.gitkeep') {
                fs.unlink(url + '/' + dirent.name, function(err) {
                    err && console.log(err)
                    console.log('删除', url + '/' + dirent.name, '成功')
                })
            }
        })
    })
}
// 所有的有关文件的操作都可以使用node去实现
console.log('process.argv[2]', process.argv[2])
if (process.argv[2] == 'remove') {
    removeGitkeep(baseurl) // 项目完成之后删除 .gitkeep文件
} else {
    addGitkeep(baseurl) // 给所有文件项目添加.gitkeep文件
}
