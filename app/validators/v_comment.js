const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

/**
 * 验证comment数据
 */
const commentValidator = (data) => {
    const schema = Joi.object({
        content: Joi.string().max(200).min(2).required().messages({
            "string.base": "content必须为string类型",
            "required": "此字段为必填字段",
            "max": "title最多为200个字符",
            "min": "title最少为2个字符",
        }),
        article_id: Joi.objectId().required().messages({
            "string.pattern.name": "article_id 必须为objectId类型",
            "populate": "ref:Article表",
        }),
        reply_user_id: Joi.objectId().messages({
            "string.pattern.name": "reply_user_id 必须为objectId类型",
            "populate": "ref:User表",
        }),
    })

    return schema.validate(data)
}

module.exports = commentValidator