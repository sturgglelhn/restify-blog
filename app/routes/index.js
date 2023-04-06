const routes = (server) =>{
    server.get('/index', (req, res, next) => {
        res.send('Welcome to middle earth!')
    })    
}

module.exports = routes