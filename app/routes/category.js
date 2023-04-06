
const category = require('../server/s_category')

const routes = (server) => {
    // 添加分类
    server.post('/category',category.createCategory);
    //查询分类下的文章数量
    server.get('/category/:id',category.findCategory);
    //server.post('/category/name',category.findCategory);
    // 修改分类
    server.patch('/category/:id',category.updateCategory);
    // 删除分类
    server.post('/category/:id',category.deleteCategory);
}   


module.exports = routes
