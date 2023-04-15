const mongoose = require('mongoose')
const moment = require("moment");

/*
    回复
* */
const replySchema = new mongoose.Schema({
    //内容
    content:{
        type: String,
        require: true,
        maxlength: 100,
        minlength: 2,
    },
    //父评论
    comment_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        require: true,
        index: true,
    },
    // 用户
    reply_user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    // 时间
    createTime:{
        type: String,
        default: moment().format('YYYY-MM-DD HH:mm:ss')
    }
})

const Reply = mongoose.model('Reply',replySchema,'t_reply');

module.exports = Reply