const mongoose = require('mongoose')
const moment = require('moment')

const commentSchema = new mongoose.Schema({
    //内容
    content:{
        type:String,
        require: true,
        maxlength: 100,
        minlength: 2,
    },
    // 评论文章
    article_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Article",
        require: true,
        index: true,
    },
    // 评论用户
    reply_user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    // 时间
    createdTime:{
        type:String,
        default: moment().format('YYYY-MM-DD HH:mm:ss'),
    }
})

const Comment = mongoose.model('Comment',commentSchema,'t_comment')

module.exports = Comment