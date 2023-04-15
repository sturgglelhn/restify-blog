const Article = require('../models/article')
const validate = require('../validators/v_article')
const Comment = require('../models/comment')
const Reply = require('../models/reply')

//发布
exports.createArticle = async (req,res)=> {
    //console.log(req.body);
    //数据校验
    const result = validate(req.body)
    if(result.error == null){
        await Article.create({...req.body}).then((r) => {
            res.json({
                code: 1,
                msg: "成功",
                data: r,
            })
        }).catch((err) => {
            res.json({
                code: 0,
                msg: "失败"+err,
            })
        })
    } else {
        console.log('Validation failed:', result.error);
    }
}

//获取所有文章
exports.getArticleList = async(req,res)=> {
    // 每页几条数据
    const pageSize = parseInt(req.query.pageSize) || 2;
    // 当前第一页
    const paegNum = parseInt(req.query.paegNum) || 3;

    //获取记录总数据，是一个预估值，不是准确值
    const count = await Article.estimatedDocumentCount();

    //计算总页
    const totalPages = Math.ceil(count / pageSize)
    console.log("总页："+totalPages)

    //查找到所有文章，得到数组data
    const data = await Article.find({}).populate('author',{_id:0, username: 1})
                                        .sort({createdTime: -1})
                                        .limit(pageSize)            // 显示的文档数
                                        .skip((paegNum - 1) * pageSize) // 跳过的页数
                                        .select('title desc createdTime').lean()   //lean()的作用是把mongodb中的文档格式，生成JavaScript对象

    //通过文章id得到父评论                                    
    for(let item of data){
        let commentList = await Comment.find({article_id: item._id}).sort({createdTime: -1}).select('-__v').lean()
        let totalCount = commentList.length     //父评论的数量
        // 通过父评论id得到子评论
        for(var comment of commentList){
            replyCount = await Reply.find({comment_id: comment._id}).sort({createdTime: -1}).select('-__v').countDocuments()
            totalCount += replyCount    //父评论数量和子评论数量相加
            //console.log(replyCount)
        }

        //console.log(totalCount)
        item['commentNums'] = totalCount   //把totalCount赋给到data中的commentNums
    }
    const result = {
        total: count,   //总数据
        pageSize: pageSize, 
        paegNum: paegNum,
        totalPages: totalPages, //总页数
        data: data,
    }
    
    res.send(result)
}

//获取指定文章
exports.getArticleId = async (req,res) => {
    const id = req.params.id
    console.log(id)
    await Article.findById(id)
        .populate('author',{_id:0, username: 1})
        .populate('category',{_id:0, name: 1})
        .populate('tag',{_id:0, name: 1})
        .then((r) => {
            res.json({
                code:1,
                msg:"成功！",
                data: r,
            })
        }).catch(err => {
            res.json({
                code: 0,
                msg:"失败",
                data: err
            })
        })
}

//删除
exports.deleteArticle = async(req, res) => {
    console.log(req.params.id)
    await Article.findByIdAndDelete(req.params.id).then(r => {
        res.json({
            code: 1,
            msg:"成功！"
        })
    }).catch(err => {
        res.json({
            code: 1,
            msg:"成功！",
            data: err,
        })
    })
}

//修改
exports.updateArticle = async (req,res)=> {
    console.log(req.params.id)
    const result = validate(req.body)
    if(result.error == null){
        await Article.findByIdAndUpdate(req.params.id, req.body, {new:true}).then(r => {
            res.json({
                code:1,
                msg:"成功！",
                data: r,
            })
        }).catch(err => {
            res.json({
                code:0,
                msg: "失败！",
                data: err
            })
        })
    }else{
        console.log('Validation failed:', result.error);
    }
}
