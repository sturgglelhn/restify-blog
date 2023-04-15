const Comment = require('../models/comment')
const validate = require('../validators/v_comment')
const Reply = require('../models/reply')

//添加评论
exports.createComment = async(req,res) => {
    //数据校验
    const result = validate(req.body)
    if(result.error == null){


         //创建评论
        await Comment.create(req.body).then(r => {
            res.json({
                code: 1,
                msg: "成功！",
                data: r,
            })
        }).catch(err => {
            res.json({
                code: 0,
                msg: "失败！",
                data: err
            })
        })
    }
}

//根据文章id获取评论列表
exports.getListComment = async(req,res) => {
     const {
        pageIndex = 1, pageSize = 2,
    } = req.query;
    //获取总数
    const commentId = req.params.id;
    console.log(commentId)
    const totalSize = await Comment.find({article_id: commentId}).countDocuments();
    //获取总页
    const totalPages = Math.ceil(totalSize / pageSize)
    
    // 查找
    let data = await Comment.find({article_id: commentId}).populate('reply_user_id',{_id:0, username: 1})
                                .skip(parseInt(pageIndex - 1) * pageSize)   //计算起始位置
                                .limit(parseInt(pageSize))
                                .sort({createdTime: -1}).select('-__v').lean()

    for(let item of data){
        console.log(item._id)
        let replyList = await Reply.find({comment_id: item._id}).select('-__v')
        item['replyList'] = replyList.length    //数量
        //item['replyList'] = replyList
        //console.log(replyList.length)
    }
    const result = {
        currentPage: parseInt(pageIndex),   //当前页
        totalPages: totalPages,   //总页
        total: totalSize,       //总数
        content: data,
    };
    res.send(result)

    /* const commentList = await Comment.find()
        .sort({createdTime: -1})
        //.populate('article_id',{_id:0,title:1 ,desc: 1})
        .skip(parseInt(pageIndex - 1) * pageSize)   //计算起始位置
        .limit(parseInt(pageSize))
        .select('-_id content article_id reply_user_id');
    const data = {
        currentPage: parseInt(pageIndex),   //当前页
        totalPages: totalPages,   //总页
        total: totalSize,       //总数
        content: commentList,
    };
    res.json(data); */
}

//获取评论详情
exports.getDetailComment = async(req, res) => {
    const commentId = req.params.id;
    const comment  = await Comment.findById(commentId)
                                    //.populate('article_id',{_id:0,title:1,desc:1})
                                    //.populate('reply_user_id',{_id:0, username: 1})
                                    .select('-__v')
    await Reply.find({comment_id: comment._id})
        .then(r => {
            res.json({
                comment,
                replyCounts: r
            })
        }).catch(err => {
            res.json({
                code: 0,
                msg: "失败",
                error: err,
            })
        }) 
}

// 更新评论
exports.updateComment = async (req, res) => {
    const resutl = validate(req.body)

    if(resutl.error == null){
        await Comment.findByIdAndUpdate(req.params.id, req.body,{new:true}).then(r => {
            res.json({
                code: 1,
                msg: "成功！",
                data: r,
            })
        }).catch(err => {
            res.json({
                code: 0,
                msg: "失败！",
                data: err,
            })
        })
    }

}

//删除评论
exports.deleteComment = async (req, res) => {
    console.log(req.params.id)
    const id = req.params.id
    await Comment.findById(id).then(r => {
        res.json({
            code: 1,
            msg: "成功！",
            data: r,
        })
    }).catch(err => {
        res.json({
            code: 0,
            msg: "失败！",
            data: err,
        })
    })
}