//const mongoose = require('./index');
const mongoose  = require('mongoose');
const moment = require("moment");
//const bcrypt = require('bcryptjs');

/*
    用户
* */
const userSchema = new mongoose.Schema({
    // 用户名
    username:{
        type:String,
        require: true,
        maxlength: 20,
        minlength: 2,
    },
    // 密码
    password:{
        type: String,
        require: true,
        minlength: 6,
        maxlength: 100,
        //select:false查询数据时不显示该项
        //select: false,
    },
    // 邮箱
    email:{
        type: String,
        require: true,
        minlength: 6,
        maxlength: 40,
        // 唯一
        unique: true,
        //索引
        index:true,
    },
    createdTime:{
        type: String,
        default: moment().format('YYYY-MM-DD HH:mm:ss')
    }
})

const User = mongoose.model('User',userSchema,'t_user')


module.exports = User