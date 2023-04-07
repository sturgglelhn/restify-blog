const comment = require('../server/s_comment')

/**
 * 评论功能
 */
const routes = (server) => {
    // 添加评论
    server.post('/comment',comment.createComment)

    //获取评论列表
    server.get('/comment',comment.getListComment)

    //获取评论详请
    server.get('/comment/:id',comment.getDetailComment)

    //删除评论
    server.get('/comment/d/:id',comment.deleteComment)
}

module.exports = routes