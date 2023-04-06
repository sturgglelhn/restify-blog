/* const restify = require('restify')
const server = restify.createServer() */

const mongoose = require('mongoose')
const config = require('./config/index')

const server = require('./http/index')



/* const index = require('./app/routes/index')
const article = require('./app/routes/article')
require('./app/models/article')
require('./app/models/user')
require('./app/models/category')
require('./app/models/comment')
require('./app/models/reply')
require('./app/models/tag')
//const server = require('./routes/index')
const cors = require('./http/cors')
//pre: Gives you hooks to run before any routes are located
server.pre(cors.preflight)
server.use(cors.actual)
//客户端请求的HTTP消息体解析为JavaScript对象
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());
index(server)
article(server) */


server.listen(config.PORT, () => {
    mongoose.connect(config.MONGODB_URL, {useNewUrlParser: true}).then(() => {
        console.log("连接成功！")
    }).catch((err) => {
        console.log("连接失败！" + err)
    })
    console.log(`Server started on port ${config.URL}`);
})
