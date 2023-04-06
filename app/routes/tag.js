const tag = require('../server/s_tag')


const routes = (server) => {
    //添加标签
    server.post('/tag', tag.createTag);
    //删除标签
    server.get('/tag/:id', tag.deleteTag);
    //修改标签
    server.patch('/tag/:id',tag.updateTag);
}

module.exports = routes