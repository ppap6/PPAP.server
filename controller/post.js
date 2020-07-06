/*
 * @Author: jwchan1996
 * @Date: 2019-05-21 19:56:04
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-08-05 23:26:10
 */

const postService = require('../service/post')
const util = require('../util')

const post = {

  //获取帖子列表
  async getPostList(ctx){
    let pageNum = ctx.query.page_num === undefined ? 1 : parseInt(ctx.query.page_num)
    let pageSize = ctx.query.page_size === undefined ? 20 : parseInt(ctx.query.page_size)
    let topicId = ctx.query.topic_id === undefined ? 0 : parseInt(ctx.query.topic_id)
    let sort = ctx.query.sort === undefined ? 1 : parseInt(ctx.query.sort)
    if(sort != 1 && sort != 2 && sort != 3){
      ctx.body = {
        status: 10002,
        message: '非法参数'
      }
      return
    }
    let posts = await postService.getPostList(pageNum, pageSize, topicId, sort)
    ctx.body = posts
  },

  //管理运营获取帖子列表
  async getPostListForAdmin(ctx){
    let pageNum = ctx.query.page_num === undefined ? 1 : parseInt(ctx.query.page_num)
    let pageSize = ctx.query.page_size === undefined ? 20 : parseInt(ctx.query.page_size)
    let topicId = ctx.query.topic_id === undefined ? 0 : parseInt(ctx.query.topic_id)
    let sort = ctx.query.sort === undefined ? 1 : parseInt(ctx.query.sort)
    let keyword = ctx.query.keyword === undefined ? '' : ctx.query.keyword
    if(sort != 1 && sort != 2 && sort != 3){
      ctx.body = {
        status: 10002,
        message: '非法参数'
      }
      return
    }
    let posts = await postService.getPostListForAdmin(pageNum, pageSize, topicId, sort, keyword)
    ctx.body = posts
  },

  //获取热门帖子列表
  async getHotPostList(ctx){
    let pageNum = ctx.query.page_num === undefined ? 1 : parseInt(ctx.query.page_num)
    let pageSize = ctx.query.page_size === undefined ? 20 : parseInt(ctx.query.page_size)
    let topicId = ctx.query.topic_id === undefined ? 0 : parseInt(ctx.query.topic_id)
    let posts = await postService.getHotPostList(pageNum, pageSize, topicId)
    ctx.body = posts
  },

  //获取推荐帖子列表
  async getRecommendPostList(ctx){
    let pageNum = ctx.query.page_num === undefined ? 1 : parseInt(ctx.query.page_num)
    let pageSize = ctx.query.page_size === undefined ? 20 : parseInt(ctx.query.page_size)
    let postId = ctx.query.post_id === undefined ? 0 : parseInt(ctx.query.post_id)
    let posts = await postService.getRecommendPostList(pageNum, pageSize, postId)
    ctx.body = posts
  },

  //添加帖子
  async addPost(ctx){
    //验证数据
    let paramList = ['title', 'content', 'md', 'topic_id']
    if(!util.checkParamExist(paramList, ctx.request.body)){
      ctx.body = {
        status: 10002,
        message: '非法参数'
      }
      return
    }
    let result = await postService.addPost(ctx.request.body)
    ctx.body = result
  },

  //删除帖子
  async deletePost(ctx){
    //验证身份
    let result = await postService.deletePost(parseInt(ctx.params.id))
    ctx.body = result
  },

  //获取帖子信息
  async getPost(ctx){
    let result = await postService.getPost(parseInt(ctx.params.id))
    ctx.body = result
  },

  //修改帖子信息
  async updatePost(ctx){
    //验证数据
    let paramList = ['title', 'content', 'md', 'topic_id']
    if(!util.checkParamExist(paramList, ctx.request.body)){
      ctx.body = {
        status: 10002,
        message: '非法参数'
      }
      return
    }
    let result = await postService.updatePost(parseInt(ctx.params.id), ctx.request.body)
    ctx.body = result
  },

  //增加帖子阅读量
  async addPV(ctx){
    //验证数据
    let paramList = ['pid']
    if(!util.checkParamExist(paramList, ctx.request.body)){
      ctx.body = {
        status: 10002,
        message: '非法参数'
      }
      return
    }
    let result = await postService.addPV(ctx.request.body)
    ctx.body = result
  }

}

module.exports = post