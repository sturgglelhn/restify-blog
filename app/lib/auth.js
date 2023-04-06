const bcrypt = require('bcryptjs')
const User = require('../models/user')


exports.authenticate = async (email,password) => {
    return new Promise(async (resolve) => {
        const user = await User.findOne({email})
        if(user){
            const istrue = await bcrypt.compareSync(password,user.password);
            if(istrue){
                console.log('登录成功！')
                return resolve(user)
            }else{
                console.log('登录失败！')
                return resolve(istrue)
            }
        }else{
            console.log('此用户不存在！')
            return resolve(user)
        }
        /* if(istrue){
            return resolve(user);
        }else{
            console.log("密码错误！")
            return resolve(istrue);
        } */
    })
    /* await User.findOne({email}).then(user => {
        //console.log(user) 
        if(user){
            var istrue = bcrypt.compareSync(password,user.password);
            if(istrue){
                console.log("登录成功！")
            }else{
                console.log("密码错误")
            }
        }else{
            console.log('没有此用户!')
        }
    }) */
     
}

