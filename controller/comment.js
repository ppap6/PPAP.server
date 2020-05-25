/*
 * @Author: jwchan1996
 * @Date: 2019-07-07 23:29:53
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-07-15 23:50:34
 */

const commentService = require('../service/comment')
const util = require('../util')

const comment = {

  //获取帖子评论列表
  async getCommentList(ctx){
    let pageNum = ctx.query.page_num === undefined ? 1 : parseInt(ctx.query.page_num)
    let pageSize = ctx.query.page_size === undefined ? 20 : parseInt(ctx.query.page_size)
    let postId = ctx.params.id === undefined ? 0 : parseInt(ctx.params.id)
    let comments = await commentService.getCommentList(pageNum, pageSize, postId)
    ctx.body = comments
  },

  //管理运营获取帖子评论列表
  async getCommentListForAdmin(ctx){
    let pageNum = ctx.query.page_num === undefined ? 1 : parseInt(ctx.query.page_num)
    let pageSize = ctx.query.page_size === undefined ? 20 : parseInt(ctx.query.page_size)
    let postId = ctx.params.id === undefined ? 0 : parseInt(ctx.params.id)
    let comments = await commentService.getCommentList(pageNum, pageSize, postId)
    ctx.body = comments
  },

  //添加帖子评论
  async addComment(ctx){
    //验证数据
    let paramList = ['pid', 'content']
    if(!util.checkParamExist(paramList, ctx.request.body)){
      ctx.body = {
        status: 10002,
        message: '非法参数'
      }
      return
    }
    let result = await commentService.addComment(ctx.request.body)
    ctx.body = result
  },

  //删除帖子评论
  async deleteComment(ctx){
    //验证身份
    let result = await commentService.deleteComment(ctx.params.id)
    ctx.body = result
  },

  //获取帖子评论信息
  async getComment(ctx){
    let result = await commentService.getComment(ctx.params.id)
    ctx.body = result
  },

  //查看评论详情相关信息
  async getCommentDetail(ctx){
    let pageNum = ctx.query.page_num === undefined ? 1 : parseInt(ctx.query.page_num)
    let pageSize = ctx.query.page_size === undefined ? 20 : parseInt(ctx.query.page_size)
    let result = await commentService.getCommentDetail(ctx.params.id, pageNum, pageSize)
    ctx.body = result
  },

  //修改帖子评论信息
  async updateComment(ctx){
    //验证数据
    let paramList = ['pid', 'content']
    if(!util.checkParamExist(paramList, ctx.request.body)){
      ctx.body = {
        status: 10002,
        message: '非法参数'
      }
      return
    }
    let result = await commentService.updateComment(ctx.params.id, ctx.request.body)
    ctx.body = result
  }

}

module.exports = comment