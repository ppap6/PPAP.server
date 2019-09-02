/*
 * @Author: jwchan1996
 * @Date: 2019-05-21 19:56:04
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-09-02 23:58:24
 */

const userCode = require('../code/user')
const userService = require('../service/user')

const user = {

  //获取用户列表
  async getUserList(ctx){
    let pageNum = ctx.query.page_num === undefined ? 1 : ctx.query.page_num
    let pageSize = ctx.query.page_size === undefined ? 20 : ctx.query.page_size
    let users = await userService.getUserList(pageNum, pageSize)
    ctx.body = users
  },

  //添加用户
  async addUser(ctx){
    //验证数据
    let result = await userService.addUser(ctx.request.body)
    ctx.body = result
  },

  //删除用户
  async deleteUser(ctx){
    let result = await userService.deleteUser(ctx.params.id)
    ctx.body = result
  },

  //获取用户信息
  async getUser(ctx){
    let result = await userService.getUser(ctx.params.id)
    ctx.body = result
  },

  //修改用户信息
  async updateUser(ctx){
    let result = await userService.updateUser(ctx.params.id, ctx.request.body)
    ctx.body = result
  },

  //用户登录
  async login(ctx){
    let result = await userService.login(ctx.request.body)
    ctx.body = result
  },

  //用户关注
  async follow(ctx){
    let result = await userService.follow(ctx.request.body)
    ctx.body = result
  },

  //用户取消关注
  async cancelFollow(ctx){
    let result = await userService.cancelFollow(ctx.request.body)
    ctx.body = result
  },

  //用户关注话题
  async followTopic(ctx){
    let result = await userService.followTopic(ctx.request.body)
    ctx.body = result
  },

  //用户取消关注话题
  async cancelFollowTopic(ctx){
    let result = await userService.cancelFollowTopic(ctx.request.body)
    ctx.body = result
  },

  //用户点赞帖子
  async likePost(ctx){
    let result = await userService.likePost(ctx.request.body)
    ctx.body = result
  },

  //用户取消点赞帖子
  async cancelLikePost(ctx){
    let result = await userService.cancelLikePost(ctx.request.body)
    ctx.body = result
  },

  //用户收藏帖子
  async collectPost(ctx){
    let result = await userService.collectPost(ctx.request.body)
    ctx.body = result
  },

  //用户取消收藏帖子
  async cancelCollectPost(ctx){
    let result = await userService.cancelCollectPost(ctx.request.body)
    ctx.body = result
  },
  
  //用户点亮评论
  async lightComment(ctx){
    let result = await userService.lightComment(ctx.request.body)
    ctx.body = result
  },

  //用户取消点亮评论
  async cancelLightComment(ctx){
    let result = await userService.cancelLightComment(ctx.request.body)
    ctx.body = result
  },

  //用户点亮回复
  async lightAnswer(ctx){
    let result = await userService.lightAnswer(ctx.request.body)
    ctx.body = result
  },

  //用户取消点亮回复
  async cancelLightAnswer(ctx){
    let result = await userService.cancelLightAnswer(ctx.request.body)
    ctx.body = result
  },
}

module.exports = user