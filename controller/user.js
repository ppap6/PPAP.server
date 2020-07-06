/*
 * @Author: jwchan1996
 * @Date: 2019-05-21 19:56:04
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-10-10 00:53:15
 */

const userService = require('../service/user')
const util = require('../util')

const user = {

  //获取用户权限列表
  async getUserAuthList(ctx){
    let users = await userService.getUserAuthList()
    ctx.body = users
  },

  //获取用户登录状态
  async getUserLoginStatus(ctx){
    let result = await userService.getUserLoginStatus()
    ctx.body = result
  },

  //获取用户列表
  async getUserList(ctx){
    let pageNum = ctx.query.page_num === undefined ? 1 : parseInt(ctx.query.page_num)
    let pageSize = ctx.query.page_size === undefined ? 20 : parseInt(ctx.query.page_size)
    let keyword = ctx.query.keyword === undefined ? '' : ctx.query.keyword
    let users = await userService.getUserList(pageNum, pageSize, keyword)
    ctx.body = users
  },

  //添加用户
  async addUser(ctx){
    //验证数据
    let paramList = ['name', 'password', 'email', 'role_id']
    if(!util.checkParamExist(paramList, ctx.request.body)){
      ctx.body = {
        status: 10002,
        message: '非法参数'
      }
      return
    }
    let result = await userService.addUser(ctx.request.body)
    ctx.body = result
  },

  //删除用户
  async deleteUser(ctx){
    let result = await userService.deleteUser(parseInt(ctx.params.id))
    ctx.body = result
  },

  //获取用户信息
  async getUser(ctx){
    let result = await userService.getUser(parseInt(ctx.params.id))
    ctx.body = result
  },

  //修改用户信息
  async updateUser(ctx){
    //验证数据
    let paramList = ['name', 'account', 'title', 'sex', 'email', 'role_id']
    if(!util.checkParamExist(paramList, ctx.request.body)){
      ctx.body = {
        status: 10002,
        message: '非法参数'
      }
      return
    }
    let result = await userService.updateUser(parseInt(ctx.params.id), ctx.request.body)
    ctx.body = result
  },

  //用户修改自己的信息
  async updateSelf(ctx){
    //验证数据
    let type = ctx.request.body.type
    if(type === undefined){
      ctx.body = {
        status: 10002,
        message: '非法参数'
      }
      return
    }
    // name => 昵称 / signature => 签名
    let paramList = type == 'name' ? ['type', 'name'] : ['type', 'signature']
    if(!util.checkParamExist(paramList, ctx.request.body)){
      ctx.body = {
        status: 10002,
        message: '非法参数'
      }
      return
    }
    let result = await userService.updateSelf(ctx.request.body)
    ctx.body = result
  },

  //修改用户密码
  async updateUserPwd(ctx){
    //验证数据
    let paramList = ['old_password', 'password']
    if(!util.checkParamExist(paramList, ctx.request.body)){
      ctx.body = {
        status: 10002,
        message: '非法参数'
      }
      return
    }
    let result = await userService.updateUserPwd(parseInt(ctx.params.id), ctx.request.body)
    ctx.body = result
  },

  //用户登录
  async login(ctx){
    //验证数据
    let paramList = ['email', 'password']
    if(!util.checkParamExist(paramList, ctx.request.body)){
      ctx.body = {
        status: 10002,
        message: '非法参数'
      }
      return
    }
    let result = await userService.login(ctx.request.body)
    ctx.body = result
  },

  //用户注册
  async register(ctx){
    //验证数据
    let paramList = ['code', 'email', 'password']
    if(!util.checkParamExist(paramList, ctx.request.body)){
      ctx.body = {
        status: 10002,
        message: '非法参数'
      }
      return
    }
    let result = await userService.register(ctx.request.body)
    ctx.body = result
  },

  //邮箱验证码
  async verify(ctx){
    if(ctx.query.email == undefined || ctx.query.email == ''){
      ctx.body = {
        status: 10002,
        message: '非法参数'
      }
    }
    let result = await userService.verify(ctx.query.email)
    ctx.body = result
  },

  //用户关注
  async follow(ctx){
    //验证数据
    let paramList = ['follow_uid']
    if(!util.checkParamExist(paramList, ctx.request.body)){
      ctx.body = {
        status: 10002,
        message: '非法参数'
      }
      return
    }
    let result = await userService.follow(ctx.request.body)
    ctx.body = result
  },

  //获取用户对帖子的点赞收藏状态
  async getPostStatus(ctx){
    let result = await userService.getPostStatus(parseInt(ctx.params.id))
    ctx.body = result
  },

  //获取用户对话题的关注状态
  async getTopicStatus(ctx){
    let result = await userService.getTopicStatus(parseInt(ctx.params.id))
    ctx.body = result
  },

  //获取用户对用户的关注状态
  async getFollowStatus(ctx){
    let result = await userService.getFollowStatus(parseInt(ctx.params.id))
    ctx.body = result
  },

  //用户取消关注
  async cancelFollow(ctx){
    //验证数据
    let paramList = ['follow_uid']
    if(!util.checkParamExist(paramList, ctx.request.body)){
      ctx.body = {
        status: 10002,
        message: '非法参数'
      }
      return
    }
    let result = await userService.cancelFollow(ctx.request.body)
    ctx.body = result
  },

  //用户关注话题
  async followTopic(ctx){
    //验证数据
    let paramList = ['follow_topic_id']
    if(!util.checkParamExist(paramList, ctx.request.body)){
      ctx.body = {
        status: 10002,
        message: '非法参数'
      }
      return
    }
    let result = await userService.followTopic(ctx.request.body)
    ctx.body = result
  },

  //用户取消关注话题
  async cancelFollowTopic(ctx){
    //验证数据
    let paramList = ['follow_topic_id']
    if(!util.checkParamExist(paramList, ctx.request.body)){
      ctx.body = {
        status: 10002,
        message: '非法参数'
      }
      return
    }
    let result = await userService.cancelFollowTopic(ctx.request.body)
    ctx.body = result
  },

  //用户点赞帖子
  async likePost(ctx){
    //验证数据
    let paramList = ['pid']
    if(!util.checkParamExist(paramList, ctx.request.body)){
      ctx.body = {
        status: 10002,
        message: '非法参数'
      }
      return
    }
    let result = await userService.likePost(ctx.request.body)
    ctx.body = result
  },

  //用户取消点赞帖子
  async cancelLikePost(ctx){
    //验证数据
    let paramList = ['pid']
    if(!util.checkParamExist(paramList, ctx.request.body)){
      ctx.body = {
        status: 10002,
        message: '非法参数'
      }
      return
    }
    let result = await userService.cancelLikePost(ctx.request.body)
    ctx.body = result
  },

  //用户收藏帖子
  async collectPost(ctx){
    //验证数据
    let paramList = ['pid']
    if(!util.checkParamExist(paramList, ctx.request.body)){
      ctx.body = {
        status: 10002,
        message: '非法参数'
      }
      return
    }
    let result = await userService.collectPost(ctx.request.body)
    ctx.body = result
  },

  //用户取消收藏帖子
  async cancelCollectPost(ctx){
    //验证数据
    let paramList = ['pid']
    if(!util.checkParamExist(paramList, ctx.request.body)){
      ctx.body = {
        status: 10002,
        message: '非法参数'
      }
      return
    }
    let result = await userService.cancelCollectPost(ctx.request.body)
    ctx.body = result
  },
  
  //用户点亮评论
  async lightComment(ctx){
    //验证数据
    let paramList = ['comment_id']
    if(!util.checkParamExist(paramList, ctx.request.body)){
      ctx.body = {
        status: 10002,
        message: '非法参数'
      }
      return
    }
    let result = await userService.lightComment(ctx.request.body)
    ctx.body = result
  },

  //用户取消点亮评论
  async cancelLightComment(ctx){
    //验证数据
    let paramList = ['comment_id']
    if(!util.checkParamExist(paramList, ctx.request.body)){
      ctx.body = {
        status: 10002,
        message: '非法参数'
      }
      return
    }
    let result = await userService.cancelLightComment(ctx.request.body)
    ctx.body = result
  },

  //用户点亮回复
  async lightAnswer(ctx){
    //验证数据
    let paramList = ['answer_id']
    if(!util.checkParamExist(paramList, ctx.request.body)){
      ctx.body = {
        status: 10002,
        message: '非法参数'
      }
      return
    }
    let result = await userService.lightAnswer(ctx.request.body)
    ctx.body = result
  },

  //用户取消点亮回复
  async cancelLightAnswer(ctx){
    //验证数据
    let paramList = ['answer_id']
    if(!util.checkParamExist(paramList, ctx.request.body)){
      ctx.body = {
        status: 10002,
        message: '非法参数'
      }
      return
    }
    let result = await userService.cancelLightAnswer(ctx.request.body)
    ctx.body = result
  },

  //用户上传头像背景
  async upload(ctx){
    //验证数据
    let paramList = ['type', 'url']
    if(!util.checkParamExist(paramList, ctx.request.body)){
      ctx.body = {
        status: 10002,
        message: '非法参数'
      }
      return
    }
    if(ctx.request.body.type != 1 && ctx.request.body.type != 2){
      ctx.body = {
        status: 10002,
        message: '非法参数'
      }
      return
    }
    let result = await userService.upload(ctx.request.body)
    ctx.body = result
  },
}

module.exports = user