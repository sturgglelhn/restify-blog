const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

/**
 * 验证comment数据
 */
const userValidator = (data) => {
    const schema = Joi.object({
        username: Joi.string().max(20).min(2).required().messages({
            "string.base": "username必须为string类型",
            "required": "此字段为必填字段",
            "max": "title最多为20个字符",
            "min": "title最少为2个字符",
        }),
        password: Joi.string().pattern(/^[a-zA-Z0-9]{6,12}$/).required().messages({
            "string.pattern.base": "密码不符合规则",
            "any.required": "缺少必选参数passwor"
        }),
        email: Joi.string().email().trim().lowercase().required().messages({
            "any.required": "缺少必选参数email",
            "string.email": "email格式错误"
        }),
    })
    
    return schema.validate(data)
}

module.exports = userValidator