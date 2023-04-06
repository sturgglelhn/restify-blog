const corsMiddleware = require('restify-cors-middleware2')

/**
 *  解决跨域请求的问题，因为浏览器的同源策略限制了JavaScript代码只能访问同源的资源。
 */
const cors = corsMiddleware({
    preflightMaxAge: 5, //Optional
    origins: ['*'],
    allowHeaders: ['*'],
    exposeHeaders: ['*']
})

module.exports = cors