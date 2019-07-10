/*
 * @Author: jwchan1996
 * @Date: 2019-07-07 23:29:53
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-07-10 23:57:51
 */

const commentService = require('../service/comment')

const comment = {

  //获取帖子评论列表
  async getCommentList(ctx){
    let pageNum = ctx.query.page_num === undefined ? 1 : parseInt(ctx.query.page_num)
    let pageSize = ctx.query.page_size === undefined ? 20 : parseInt(ctx.query.page_size)
    let postId = ctx.params.id === undefined ? 0 : parseInt(ctx.params.id)
    let comments = await commentService.getCommentList(pageNum, pageSize, postId)
    ctx.body = comments
  },

  //添加帖子评论
  async addComment(ctx){
    //验证数据
    let result = await commentService.addComment(ctx.request.body)
    ctx.body = result
  },

  //修改帖子评论信息
  async updateComment(ctx){
    let result = await commentService.updateComment(ctx.params.id, ctx.request.body)
    ctx.body = result
  }

}

module.exports = comment