const restify = require('restify')
const server = restify.createServer()
const cors = require('./cors')
const config = require('../config/index')
const rjwt = require('restify-jwt-community')
const index = require('../app/routes/index')
const article = require('../app/routes/article')
const user = require('../app/routes/user')
const tag = require("../app/routes/tag")
const category = require('../app/routes/category')

//加载数据模型
require('../app//models/article')
require('../app/models/user')
require('../app/models/category')
require('../app/models/comment')
require('../app/models/reply')
require('../app/models/tag')

/*pre: Gives you hooks to run before any routes are located*/
server.pre(cors.preflight)
server.use(cors.actual)

/*客户端请求的HTTP消息体解析为JavaScript对象*/
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());

//验证token的有效性，除了/auth不用验证，其余路径都要验证
//server.use(rjwt({ secret: config.JWT_SECRET }).unless({path: ['/auth']}))

//导入路由
index(server)
article(server)
user(server)
tag(server)
category(server)

module.exports = server;

