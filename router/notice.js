/*
 * @Author: jwchan1996
 * @Date: 2019-09-28 21:07:38
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-09-28 21:09:43
 */
const router = require('koa-router')()
const notice = require('../controller/notice')

router
    .get('/comment', notice.getCommentList)   //获取评论通知列表

module.exports = router
