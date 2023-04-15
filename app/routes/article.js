
//const Article = require("../models/article")

const article = require('../server/s_article')

const config = require('../../config/index')
const rjwt = require('restify-jwt-community')

const routes = (server) => {
    //jwt验证
    //server.post('/article',rjwt({secret: config.JWT_SECRET}),article.createArticle)
    //rjwt({ secret: config.JWT_SECRET })
    //发布文章
    server.post('/article',article.createArticle)

    //获取文章列表
    server.get('/article',article.getArticleList)

    //获取指定文章
    server.get('/article/:id',article.getArticleId)
    
    //删除文章
    server.get('/article/d/:id',article.deleteArticle)

    //修改文章
    server.patch('/article/:id',article.updateArticle)
}

module.exports = routes