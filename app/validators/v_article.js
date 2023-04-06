const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

/**
 *  验证article
 */
const articleValidator = (data) => {
    const schema = Joi.object({
        title: Joi.string().min(2).max(30).required().messages({
            "string.base": "title必须为string类型",
            "required": "此字段为必填字段",
            "max": "title最多为30个字符",
            "min": "title最少为2个字符",
        }),
        desc: Joi.string().min(2).max(200).required().messages({
            "string.base": "此字段为string类型",
            "required": "此字段为必填字段",
            "max": "字段最多可填写200个字符",
            "min": "字段最少可填写2个字符"
        }),
        content: Joi.string().min(5).max(1000).required().messages({
            "string.base": "此字段为string类型",
            "required": "此字段为必填字段",
            "max": "字段最多可填写1000个字符",
            "min": "字段最少可填写5个字符"
        }),
        author: Joi.objectId().required().messages({
            "string.pattern.name": "author 必须为objectId类型",
            "populate":"ref: User表",
        }),
        category: Joi.objectId().required().messages({
            "string.pattern.name": "category 必须为objectId类型",
            "populate":"ref: Category表",
        }),
        tag: Joi.objectId().required().messages({
            "string.pattern.name": "tag 必须为objectId类型",
            "populate":"ref: Tag表",
        }),
    })
    return schema.validate(data)
}

module.exports = articleValidator