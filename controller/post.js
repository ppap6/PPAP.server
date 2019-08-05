/*
 * @Author: jwchan1996
 * @Date: 2019-05-21 19:56:04
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-08-05 23:26:10
 */

const userCode = require('../code/user')
const postService = require('../service/post')

const post = {

  //获取帖子列表
  async getPostList(ctx){
    let pageNum = ctx.query.page_num === undefined ? 1 : parseInt(ctx.query.page_num)
    let pageSize = ctx.query.page_size === undefined ? 20 : parseInt(ctx.query.page_size)
    let topicId = ctx.query.topic_id === undefined ? 0 : parseInt(ctx.query.topic_id)
    let posts = await postService.getPostList(pageNum, pageSize, topicId)
    ctx.body = posts
  },

  //添加帖子
  async addPost(ctx){
    //验证数据
    let result = await postService.addPost(ctx.request.body)
    ctx.body = result
  },

  //删除帖子
  async deletePost(ctx){
    //验证身份
    let result = await postService.deletePost(ctx.params.id)
    ctx.body = result
  },

  //获取帖子信息
  async getPost(ctx){
    let result = await postService.getPost(ctx.params.id)
    ctx.body = result
  },

  //修改帖子信息
  async updatePost(ctx){
    let result = await postService.updatePost(ctx.params.id, ctx.request.body)
    ctx.body = result
  },

  //增加帖子阅读量
  async addPV(ctx){
    let result = await postService.addPV(ctx.request.body)
    ctx.body = result
  }

}

module.exports = post