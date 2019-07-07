/*
 * @Author: jwchan1996
 * @Date: 2019-07-07 23:29:53
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-07-07 23:53:04
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

}

module.exports = comment