
const reply = require('../server/s_reply')

const routes = (server) => {
    // 添加回复
    server.post('/reply', reply.createReply)
    
    //获取回复列表
    server.get('/reply/:id',reply.getListReply);

    //更新回复
    server.patch('/reply/:id',reply.updateReply)

    //删除回复
    server.get('/reply/d/:id',reply.deleteReply)
}


module.exports = routes