/*
 * @Author: jwchan1996
 * @Date: 2019-06-06 14:44:36
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-06-27 01:23:31
 */

const router = require('koa-router')()
const post = require('../controller/post')

router
    .get('/', post.getPostList)     //获取帖子列表
    .post('/', post.addPost)     //添加帖子
    .del('/:id', post.deletePost)   //删除帖子
    .get('/:id', post.getPost)    //获取帖子信息

module.exports = router