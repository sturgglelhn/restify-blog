const mongoose  = require('mongoose');
const moment = require('moment');

/*
mongoose.connect(config.MONGODB_URL, {useNewUrlParser: true}).then(() => {
    console.log("连接成功！")
}).catch((err) => {
    console.log("连接失败！" + err)
});
*/

const articleSchema = new mongoose.Schema({
    //标题
    title:{
        type: String,
        require: true,
        maxlength: 30,
        minlength: 2
    },
    //描述
    desc:{
        type: String,
        require: true,
        maxlength: 200,
        minlength: 2,
    },
    //内容
    content:{
        type: String,
        require: true,
        maxlength: 1000,
        minlength: 2,
    },
    //作者
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    //分类
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Category",
        require
    },
    //观看人数
    views:{
        type:Number,
        default: 0
    },
    //标签
    tag:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
        require: true
    },
    //时间
    createdTime:{
        type: String,
        default: moment().format('YYYY-MM-DD HH:mm:ss')
    },
})

//为title和content创建文本索引
articleSchema.index({title: "text", content:"text"})

//model类似于mysql中的表，mongodb自己创建数据库，自动创建建
const Article = mongoose.model('Article',articleSchema,'t_article')

module.exports = Article


