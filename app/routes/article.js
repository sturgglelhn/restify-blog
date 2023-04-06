
//const Article = require("../models/article")

const article = require('../server/s_article')

const config = require('../../config/index')
const rjwt = require('restify-jwt-community')

const routes = (server) => {
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