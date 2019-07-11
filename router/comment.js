/*
 * @Author: jwchan1996
 * @Date: 2019-07-07 23:24:57
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-07-11 23:25:35
 */

const router = require('koa-router')()
const comment = require('../controller/comment')

router
  .get('/:id', comment.getCommentList)    //获取帖子评论列表
  .post('/', comment.addComment)     //添加帖子评论
  .get('/detail/:id', comment.getComment)    //获取帖子评论信息
  .put('/:id', comment.updateComment)     //修改帖子评论信息

module.exports = router