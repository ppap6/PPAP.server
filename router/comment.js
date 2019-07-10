/*
 * @Author: jwchan1996
 * @Date: 2019-07-07 23:24:57
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-07-10 23:27:36
 */

const router = require('koa-router')()
const comment = require('../controller/comment')

router
  .get('/:id', comment.getCommentList)    //获取帖子评论列表
  .post('/', comment.addComment)     //添加帖子评论

module.exports = router