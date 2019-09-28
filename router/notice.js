/*
 * @Author: jwchan1996
 * @Date: 2019-09-28 21:07:38
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-09-29 00:36:21
 */
const router = require('koa-router')()
const notice = require('../controller/notice')

router
    .get('/comment', notice.getCommentList)   //获取评论通知列表
    .get('/answer', notice.getAnswerList)   //获取回复通知列表
    .get('/follow', notice.getFollowList)   //获取关注通知列表
    .get('/like', notice.getLikeList)   //获取点赞通知列表
    .get('/collect', notice.getCollectList)   //获取收藏通知列表

module.exports = router
