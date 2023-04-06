const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

/**
 * 验证comment数据
 */
const categoryValidator = (data) => {
    const schema = Joi.object({
        name: Joi.string().max(30).min(2).required().messages({
            "string.base": "name必须为string类型",
            "required": "此字段为必填字段",
            "max": "title最多为30个字符",
            "min": "title最少为2个字符",
        })
    })

    return schema.validate(data)
}

module.exports = categoryValidator