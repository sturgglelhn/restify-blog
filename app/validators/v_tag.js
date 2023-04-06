const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

/**
 * 验证comment数据
 */
const commentValidator = (data) => {
    const schema = Joi.object({
        name: Joi.string().max(20).min(2).required().messages({
            "string.base": "name必须为string类型",
            "required": "此字段为必填字段",
            "max": "此字段最多为20个字符",
            "min": "此字段最少为2个字符",
        }),
        desc: Joi.string().max(100).min(2).required().messages({
            "string.base": "desc必须为string类型",
            "required": "此字段为必填字段",
            "max": "此字段最多为200个字符",
            "min": "此字段最少为2个字符",
        }),
    })

    return schema.validate(data)
}

module.exports = commentValidator