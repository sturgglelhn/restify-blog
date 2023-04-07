const Tag = require('../models/tag')
const validate = require('../validators/v_tag')

//添加标签
exports.createTag = async (req ,res) => {
    const result = validate(req.body)
    if(result.error == null){
        await Tag.create({...req.body}).then( r => {
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

//修改标签
exports.updateTag = async (req,res) => {
    console.log(req.params.id)
    const result = validate(req.body)
    if(result.error == null){
        await Tag.findByIdAndUpdate(req.params.id,req.body,{new:true}).then(r => {
            res.json({
                code: 1,
                msg: "修改成功！",
                data: r,
            })
        }).catch(err => {
            res.json({
                code: 0,
                msg: "修改失败！",
                data: err,
            })
        })

    }
}

//删除标签
exports.deleteTag = async (req, res)=> {
    console.log(req.params.id)
    await Tag.findById(req.params.id).then(r => {
        res.json({
            code: 1,
            msg: "删除成功！",
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