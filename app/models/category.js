//导入模块
const mongoose = require('mongoose')
const moment = require('moment')

const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
        maxlength: 30,
        minlength: 2
    },
    /* counts:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Article",
    }, */
    createdTime:{
        type: String,
        default: moment().format('YYYY-MM-DD HH:mm:ss')
    }
})

const Category = mongoose.model("Category",categorySchema,'t_category')

module.exports = Category

