const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

/**
 * 验证comment数据
 */
const replyValidator = (data) => {
    const schema = Joi.object({
        content: Joi.string().max(200).min(2).required().messages({
            "string.base": "content必须为string类型",
            "required": "此字段为必填字段",
            "max": "title最多为200个字符",
            "min": "title最少为2个字符",
        }),
        comment_id: Joi.objectId.messages({
            "string.pattern.name": "comment_id 必须为objectId类型",
            "populate": "ref: Comment表",
        })
    })

    return schema.validate(data)
}

module.exports = replyValidator