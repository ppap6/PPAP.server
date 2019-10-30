/*
 * @Author: jwchan1996
 * @Date: 2019-06-06 14:44:36
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-08-05 23:24:55
 */

const router = require('koa-router')()
const post = require('../controller/post')

router
    .get('/', post.getPostList)     //获取帖子列表
    .get('/admin', post.getPostListForAdmin)   //管理运营获取帖子列表
    .post('/', post.addPost)     //添加帖子
    .del('/:id', post.deletePost)   //删除帖子
    .get('/:id', post.getPost)    //获取帖子信息
    .put('/:id', post.updatePost)    //修改帖子信息

    .post('/add/pv', post.addPV)     //增加帖子阅读量

module.exports = router