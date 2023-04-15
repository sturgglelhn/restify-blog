const redis = require('redis')

//创建客户端
const redisClient = redis.createClient({
    host:'192.168.10.135',
    port: 6379,
    password: '111111',
})


redisClient.on('connect',function(){
    console.log('Connected to Redis');
})

redisClient.set('mykey', 'myvalue', function(err, reply) {
    console.log(reply);
});


/* redisClient.on('ready',function(err){
    console.log('redis ready');
}) */



/* {
    host:"192.168.10.135",
    port:"6379",
    password:"111111",
} */
/* redisClient.connect(6379,'192.168.10.135',11111).then(r => {
    console.log(r)
}) */
//监听连接事件
/* redisClient.on('connect', () => {
    console.log('连接成功！')
})

redisClient.on('error', err => {
    console.log('连接失败！'+err)
})
 */
//连接


//写入数据
/* redisClient.set('name','zhangsan').then(r => {
    console.log(r)
}).catch(err => {
    console.log(err)
})
 */