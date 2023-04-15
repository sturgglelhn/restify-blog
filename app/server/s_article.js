const Article = require('../models/article')
const validate = require('../validators/v_article')

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
    const paegNum = parseInt(req.query.paegNum) || 2;

    //获取记录总数据，是一个预估值，不是准确值
    const count = await Article.estimatedDocumentCount();

    //计算总页
    const totalPages = Math.ceil(count / pageSize)
    console.log("总页："+totalPages)


    const article = await Article.find({}).populate('author',{_id:0, username: 1}).select('_id title desc')
    
    

    
    /* await Article.find({})
        .populate('author',{_id:0, username: 1})
        .sort({createdTime: -1})    // 字段倒叙排序，-1表示倒叙，反之正序
        .limit(pageSize)            // 显示的文档数
        .skip((paegNum - 1) * pageSize) // 跳过的页数
        .select('-_id title desc')
        .then(r => {  //显示的字段，-表示不显示

            const result = {
                total: count,   //总数据
                pageSize: pageSize, 
                paegNum: paegNum,
                totalPages: totalPages, //总页数
                data: r,
            }
            res.json(result)
    }).catch(err => {
        res.json({
            code:1,
            msg:"成功！",
            data: err,
        })
    }) */
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
