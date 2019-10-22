var express = require('express')
var router = express.Router()

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource')
})
router.get('/list', function(req, res, next) {
    res.json({
        title: '新闻一',
        content: '新闻内容一'
    })
})

module.exports = router
