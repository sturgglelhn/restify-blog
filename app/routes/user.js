
const user = require('../server/s_user')


const routes = (server) => {
    //注册
    server.post('/user', user.register)
    //登录
    server.post('/auth', user.login)
    //删除用户
    server.get('/user/:id', user.deleteUser)
}


module.exports = routes