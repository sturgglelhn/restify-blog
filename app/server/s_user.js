
const User = require('../models/user')
const validate = require('../validators/v_user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('../lib/auth')
const config = require('../../config/index')

// 注册
exports.register = async (req, res) => {
    //数据校验
    const result = validate(req.body)
    if(result.error == null){
        
        let {email} = req.body; //接受email
        let user = await User.findOne({ email });   //查找email
        if(user != null){   //判断是否有重复的email
            return res.json({
                code: 400,
                msg:"email已经存在",
            })    
        }

        //对密码加密
        req.body.password = bcrypt.hashSync(req.body.password,10)

        await User.create(req.body).then(r => {
            res.json({
                code: 1,
                msg: "注册成功",
                data: r,
            })
        }).catch((err) => {
            res.json({
                code: 0,
                msg: "注册失败",
                data: err,
            })
        })

    }
}

// 登录
exports.login = async (req, res) => {
    const {email,password} = req.body
    const user = await auth.authenticate(email,password)/* .then(r => {
        if(r){
            //res.send('登录成功！')
        }else{
            res.send('登录失败！')
        }
    }) */

    if(user){
        const jsonData = JSON.stringify(user)
        //console.log(jsonData)
        const token = jwt.sign({jsonData},config.JWT_SECRET,{
            expiresIn: "30d",    //有效期30天
            algorithm: "HS256", 
        });
        const {iat, exp} = jwt.decode(token);   //有效时间，过期时间，传入的token解密
        res.send({user,iat, exp, token})
    }else{
        res.send("登录失败！")
    }
}

//删除用户
exports.deleteUser = async(req,res)=>{
    console.log(req.params.id)
    const result = await User.findById(req.params.id).then((r) => {
        res.json({
            code: 1,
            msg: "删除成功！",
            data : r
        })
    }).catch(err => {
        res.json({
            code: 0,
            msg: "删除失败！",
            data: err
        })
    })

    //res.send(result)
    /* .then((r) => {
        res.send(r)

        res.json({
            code: 1,
            msg: "删除成功！",
            data: r,
        })
    }).catch(err => {
        res.json({
            code: 0,
            msg: "没有此用户！",
            data: err
        })
    }) */
}
