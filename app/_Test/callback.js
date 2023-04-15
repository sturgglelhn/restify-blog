
var fs = require('fs')

//阻塞模式
/* var data = fs.readFileSync('input.txt')

console.log(data.toString());
console.log('程序完成！'); */

/*
执行结果：
    welcome middle earth!
    程序有完成！
 */

//非阻塞模式
fs.readFile('input.txt',(err,data) => { 
    if(err) return console.log(err);
    console.log(data.toString());
})

console.log('程序有完成！');

/*
执行结果：
    程序有完成！
    welcome middle earth!
 */