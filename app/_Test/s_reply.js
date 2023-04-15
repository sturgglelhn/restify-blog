

const Reply = require('../models/reply')
const validate = require('../validators/v_reply')

//添加回复
exports.createReply = async(req, res) => {
    console.log(req.body)
    //数据校验
    const result = validate(req.body)
    if(result.error == null){
        await Reply.create(req.body).then(r => {
            res.json({
                code: 1,
                msg: "成功！",
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

//获取回复列表
exports.getListReply = async(req, res) => {
    const replyId = req.params.id
    console.log(req.params.id)

    await Reply.find({comment_id: replyId})
        .select('-_id content comment_id')
        .then(r => {
        res.json({
            code: 1,
            msg:"成功！",
            data: r
        })
    }).catch(err => {
        res.json({
            code: 0,
            msg: "失败！",
            data: err
        })
    })

}

//修改回复
exports.updateReply = async(req, res) => {
    console.log(req.params.id)
    const result = validate(req.body)
    if(result.error == null){
        await Reply.findByIdAndUpdate(req.params.id, req.body,{new:true}).then(r => {
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

// 删除回复
exports.deleteReply = async(req, res) => {
    const id = req.params.id
    console.log(id)
    await Reply.findById(id).then(r => {
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
