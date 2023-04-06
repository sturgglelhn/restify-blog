const mongoose = require('mongoose')
const moment = require("moment");

/*
    标签
* */
const tagSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
        maxlength: 20,
        minlength: 2,
    },
    desc:{
        type: String,
        require: true,
        maxlength: 100,
        minlength: 10,
    },
    createdTime:{
        type: String,
        default: moment().format('YYYY-MM-DD HH:mm:ss'),
    }
})

const Tag = mongoose.model('Tag',tagSchema,'t_tag');

module.exports = Tag