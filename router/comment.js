/*
 * @Author: jwchan1996
 * @Date: 2019-07-07 23:24:57
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-07-11 23:46:00
 */

const router = require('koa-router')()
const comment = require('../controller/comment')

router
  .get('/post/:id', comment.getCommentList)    //获取帖子评论列表
  .get('/admin/post/:id', comment.getCommentListForAdmin)    //管理运营获取帖子评论列表
  .post('/', comment.addComment)     //添加帖子评论
  .del('/:id', comment.deleteComment)   //删除帖子评论
  .get('/:id', comment.getComment)    //获取帖子评论信息
  .get('/detail/:id', comment.getCommentDetail)    //查看评论详情相关信息
  .put('/:id', comment.updateComment)     //修改帖子评论信息

module.exports = router