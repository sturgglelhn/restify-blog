
const Category = require('../models/category')
const validate = require('../validators/v_category')
const Article = require('../models/article')

//添加
exports.createCategory = async (req, res) => {
    const result = validate(req.body)
    if(result.error == null){
        await Category.create({...req.body}).then(r => {
            res.json({
                code: 1,
                msg: "成功！",
                data: r
            })
        }).catch(err => {
            res.json({
                code: 0,
                msg: "失败",
                data: err,
            })
        })
    }
}

//获取该分类下的所有文章
exports.findCategory = async (req,res) => {
    const id = req.params.id
    console.log(id)

    /* const { id } =  await Category.findOne({name : req.body.name});
    console.log( id) */
    await Article.find({category : id})
        .countDocuments()   //是精准查找，相比于文章中estimatedDocumentCount()的精确度更好，但是效率没有预估值快。
        //.select('-_id title desc')
        .then(r => {
            res.json({
                code: 1,
                msg: "成功",
                counts: r,
            })
        }).catch(err => {
            res.json({
                code: 0,
                msg: "查无此数！",
                data: err,
            })
    })
}

//修改
exports.updateCategory = async(req, res) => {
    console.log(req.params.id)
    const result = validate(req.body)
    if(result.error == null){
        await Category.findByIdAndUpdate(req.params.id, req.body, {new:true}).then(r => {
            res.json({
                code: 1,
                msg: "成功",
                data: r
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


//删除
exports.deleteCategory = async(req, res) => {
    console.log(req.body.id)
    await Category.findById(req.body.id).then(r => {
        res.json({
            code: 1,
            msg: "成功",
            data: r,
        })
    }).catch(err => {
        res.json({
            code: 0,
            msg: "失败",
            data: err,
        })
    })

}