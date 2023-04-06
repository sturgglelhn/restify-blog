
const Article = require('../models/article')
/* const User = require('./app/models/user')
const Category = require('./app/models/category')
const Tag = require('./app/models/tag')
 */


Article.find({})
    .populate('author',{username:1})
    .then(res => {
        console.log(res)
    }).catch(err => {
    console.log(err)
})



/*Article.create({
    title: "辟邪剑法",
    desc:"华山一派功夫，要点是在一个‘气’字，气功一成",
    content:"可是本门前辈之中另有一派人物，却认为本门武功要点在‘剑’，剑术一成，纵然内功平平，也能克敌致胜。正邪之间的分歧，主要便在于此",
    author:"6424f6332cbfb75790cf314a",
    category:"6424f6d5e37489ee1ecf857a",
    tag:"6424f737bf0364ce0e828b9b"
}).then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
})*/


/*
Tag.create({
    name:"金庸"
}).then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
})
*/


/*Category.create({
    name:"武侠"
}).then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
})*/


/*User.create({
    username:'令狐冲',
    password: '111111',
    email:"990912341@qq.com"
}).then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
})*/

