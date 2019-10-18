const http = require('http')
const {
    hostName,
    port
} = require('../src/config/config.js')
const serverHandle = require('../app.js')
const app = http.createServer(serverHandle)
app.listen(port, hostName, () => {
    console.log(`server is runing success at http://${hostName}:${port}`)
})
// xxxxx000
