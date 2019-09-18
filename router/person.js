/*
 * @Author: jwchan1996
 * @Date: 2019-09-10 01:31:39
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-09-18 22:58:01
 */
const router = require('koa-router')()
const person = require('../controller/person')

router
    .get('/post', person.getPostList)   //获取个人帖子列表
    .get('/comment', person.getCommentList)   //获取个人评论列表
    .get('/answer', person.getAnswerList)   //获取个人回复列表

module.exports = router
