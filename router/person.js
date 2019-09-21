/*
 * @Author: jwchan1996
 * @Date: 2019-09-10 01:31:39
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-09-21 23:38:32
 */
const router = require('koa-router')()
const person = require('../controller/person')

router
    .get('/post', person.getPostList)   //获取个人帖子列表
    .get('/comment', person.getCommentList)   //获取个人评论列表
    .get('/answer', person.getAnswerList)   //获取个人回复列表
    .get('/fans', person.getFansList)   //获取个人粉丝列表

module.exports = router
