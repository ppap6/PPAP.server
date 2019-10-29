/*
 * @Author: jwchan1996
 * @Date: 2019-05-21 20:00:06
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-10-10 00:54:37
 */

 /**
  * 200 操作成功
  * 10000操作失败
  * 10001未登陆授权
  * 10002非法参数
  * 10003未找到操作对象
  * 10004没有操作权限
  * 10005数据库错误
  */
const userModel = require('../model/user')
const topicModel = require('../model/topic')
const postModel = require('../model/post')
const logModel = require('../model/log')
const commentModel = require('../model/comment')
const answerModel = require('../model/answer')
const tokenUtil = require('../util/token')
const crypto = require('crypto')
const salt = 'ppap'

const user = {

  //获取所有用户
  async getUserList(pageNum, pageSize){
    //获取角色权限
    let roleId = await userModel.getRoleId()
    //验证身份权限
    if(roleId > 5){
      return {
        status: 10004,
        message: '没有操作权限'
      }
    }
    let userList = await userModel.getUserList(roleId, pageNum, pageSize)
    if(userList){
      return {
        status: 200,
        message: userList
      }
    }
    return {
      status: 10003,
      message: '未找到操作对象'
    }
  },

  //添加用户
  async addUser(data){
    //获取角色权限
    let roleId = await userModel.getRoleId()
    //验证身份权限
    if(roleId >= parseInt(data.role_id) || roleId > 2){
      return {
        status: 10004,
        message: '没有操作权限'
      }
    }
    let user = await userModel.getUserByAccount(data.account)
    if(!user){
      let insertId = await userModel.addUser(data)
      if(insertId){
        //新增用户点赞收藏点亮模型
        await userModel.addUserLikeCollectLightModel(insertId)
        return {
          status: 200,
          message: '操作成功'
        }
      }
      return {
        status: 10000,
        message: '操作失败'
      }
    }else{
      return {
        status: 10000,
        message: '用户账号已存在'
      }
    }
  },

  //删除用户
  async deleteUser(id){
    //获取角色权限
    let roleId = await userModel.getRoleId()
    //验证身份权限
    if(roleId > 2){
      return {
        status: 10004,
        message: '没有操作权限'
      }
    }
    let exist = await userModel.getUser(id)
    if(exist){
      let result = await userModel.deleteUser(id)
      if(result){
        //删除用户点赞收藏点亮模型
        await userModel.deleteUserLikeCollectLightModel(id)
        return {
          status: 200,
          message: '操作成功'
        }
      }else{
        return {
          status: 10000,
          message: '操作失败'
        }
      } 
    }else{
      return {
        status: 10003,
        message: '未找到操作对象'
      }
    }
  },

  //获取用户信息
  async getUser(id){
    let user = await userModel.getUser(id)
    if(user){
      return {
        status: 200,
        message: user
      }
    }
    return {
      status: 10003,
      message: '未找到操作对象'
    }
  },

  //修改用户信息
  async updateUser(id, data){
    //获取角色权限
    let roleId = await userModel.getRoleId()
    //验证身份权限
    if(roleId >= parseInt(data.role_id)){
      return {
        status: 10004,
        message: '没有操作权限'
      }
    }
    let exist = await userModel.getUser(id)
    if(exist){
      let user = await userModel.getUserByAccount(data.account)
      //验证修改的用户账号是否已被使用
      if(!user || (user && user.id == id)){
        let result = await userModel.updateUser(id, data)
        if(result){
          return {
            status: 200,
            message: '操作成功'
          }
        }else{
          return {
            status: 10000,
            message: '操作失败'
          }
        }
      }else{
        return {
          status: 10000,
          message: '用户账号已存在'
        }
      }
    }else{
      return {
        status: 10003,
        message: '未找到操作对象'
      }
    }
  },

  //修改用户密码
  async updateUserPwd(id, data){
    let user = await userModel.getUserById(id)
    if(user){
      let sha1Hash = crypto.createHash('sha1').update(data.old_password).digest('hex')
      let md5Hash = crypto.createHash('md5').update(salt + sha1Hash).digest('hex')
      //验证旧密码
      if(user.password == md5Hash){
        let newSha1Hash = crypto.createHash('sha1').update(data.password).digest('hex')
        let newMd5Hash = crypto.createHash('md5').update(salt + newSha1Hash).digest('hex')
        let result = await userModel.updateUserPwd(id, newMd5Hash)
        if(result){
          return {
            status: 200,
            message: '操作成功'
          }
        }else{
          return {
            status: 10000,
            message: '操作失败'
          }
        }
      }else{
        //旧密码不对
        return {
          status: 10000,
          message: '原密码错误'
        }
      }
    }else{
      return {
        status: 10003,
        message: '未找到操作对象'
      }
    }
  },

  //用户登录
  async login(data){
    let user = await userModel.getUserByAccount(data.account)
    if(user){
      let result = await userModel.login(data.account, data.password)
      if(result){
        return {
          status: 200,
          message: '登录成功',
          token: tokenUtil.getToken({
            uid: user.id,
            name: user.name,
            account: data.account, 
            password: data.password,
            roleId: user.role_id
          })
        }
      }else{
        return {
          status: 10000,
          message: '用户账号或密码错误'
        }
      }
    }else{
      return {
        status: 10003,
        message: '未找到操作对象'
      }
    }
  },

  //用户注册
  async register(data){
    let user = await userModel.getUserByAccount(data.account)
    if(!user){
      let insertId = await userModel.register(data)
      if(insertId){
        //新增用户点赞收藏点亮模型
        await userModel.addUserLikeCollectLightModel(insertId)
        return {
          status: 200,
          message: '操作成功'
        }
      }
      return {
        status: 10000,
        message: '操作失败'
      }
    }else{
      return {
        status: 10000,
        message: '用户账号已存在'
      }
    }
  },

  //获取用户对帖子的点赞收藏状态
  async getPostStatus(id){
    let visitorId = global.uid
    let likeArr = visitorId == undefined ? [] : await userModel.getLikePost(visitorId)
    let collectArr = visitorId == undefined ? [] : await userModel.getCollectPost(visitorId)
    let result = {
      isLike: likeArr.includes(parseInt(id)) ? true : false,
      isCollect: collectArr.includes(parseInt(id)) ? true : false
    }
    if(user){
      return {
        status: 200,
        message: result
      }
    }
  },

  //用户关注
  async follow(data){
    let exist = await userModel.getFollow(parseInt(data.uid), parseInt(data.follow_uid))
    if(!exist){       //判断是否已存在关注记录
      //添加关注记录
      let result = await userModel.follow(data)
      if(result){
        await logModel.addFollowPeopleLog(parseInt(data.uid), parseInt(data.follow_uid))
        return {
          status: 200,
          message: '操作成功'
        }
      }else{
        return {
          status: 10000,
          message: '操作失败'
        }
      }
    }else if(exist && exist.state == 0){       //存在记录但是关注状态是0，即未关注
      //更改为关注状态
      let result = await userModel.updateFollow(parseInt(data.uid), parseInt(data.follow_uid), 1)
      await logModel.addFollowPeopleLog(parseInt(data.uid), parseInt(data.follow_uid))
      if(result){
        return {
          status: 200,
          message: '操作成功'
        }
      }else{
        return {
          status: 10000,
          message: '操作失败'
        }
      }
    }else{
      return {
        status: 10000,
        message: '请勿添加重复记录'
      }
    }
  },

  //用户取消关注
  async cancelFollow(data){
    let exist = await userModel.getFollow(parseInt(data.uid), parseInt(data.follow_uid))
    //判断是否已存在关注记录，且关注状态是1，即已关注
    if(exist && exist.state == 1){      
      //更改为未关注状态
      let result = await userModel.updateFollow(parseInt(data.uid), parseInt(data.follow_uid), 0)
      if(result){
        return {
          status: 200,
          message: '操作成功'
        }
      }else{
        return {
          status: 10000,
          message: '操作失败'
        }
      }
    }else{
      return {
        status: 10000,
        message: '操作失败'
      }
    }
  },

  //用户关注话题
  async followTopic(data){
    let exist = await userModel.getFollowTopic(parseInt(data.uid), parseInt(data.follow_topic_id))
    if(!exist){     //判断是否已存在关注记录
      //添加关注记录
      let result = await userModel.followTopic(data)
      if(result){
        //话题关注数加一
        await topicModel.updateTopicStatistics(data.follow_topic_id, 'increaseFollowers')
        //添加用户关注话题动态
        await logModel.addFollowTopicLog(parseInt(data.uid), parseInt(data.follow_topic_id))
        return {
          status: 200,
          message: '操作成功'
        }
      }else{
        return {
          status: 10000,
          message: '操作失败'
        }
      }
    }else if(exist && exist.state == 0){       //存在记录但是关注状态是0，即未关注
      //更改为关注状态
      let result = await userModel.updateFollowTopic(parseInt(data.uid), parseInt(data.follow_topic_id), 1)
      if(result){
        //话题关注数加一
        await topicModel.updateTopicStatistics(data.follow_topic_id, 'increaseFollowers')
        //添加用户关注话题动态
        await logModel.addFollowTopicLog(parseInt(data.uid), parseInt(data.follow_topic_id))
        return {
          status: 200,
          message: '操作成功'
        }
      }else{
        return {
          status: 10000,
          message: '操作失败'
        }
      }
    }else{
      return {
        status: 10000,
        message: '请勿添加重复记录'
      }
    }
  },

  //用户取消关注话题
  async cancelFollowTopic(data){
    let exist = await userModel.getFollowTopic(parseInt(data.uid), parseInt(data.follow_topic_id))
    //判断是否已存在关注记录，且关注状态是1，即已关注
    if(exist && exist.state == 1){      
      //更改为未关注状态
      let result = await userModel.updateFollowTopic(parseInt(data.uid), parseInt(data.follow_topic_id), 0)
      if(result){
        //话题关注数减一
        await topicModel.updateTopicStatistics(data.follow_topic_id, 'decreaseFollowers')
        return {
          status: 200,
          message: '操作成功'
        }
      }else{
        return {
          status: 10000,
          message: '操作失败'
        }
      }
    }else{
      return {
        status: 10000,
        message: '操作失败'
      }
    }
  },

  //用户点赞帖子
  async likePost(data){
    //获取用户点赞帖子数组
    let posts = await userModel.getLikePost(parseInt(data.uid))
    if(!posts.includes(parseInt(data.pid))){    //判断是否已点赞   
      //不存在=>添加
      posts.unshift(parseInt(data.pid))
      //修改点赞帖子记录
      let result = await userModel.updateLikePosts(parseInt(data.uid), posts)
      if(result){
        //获取帖子up主uid
        let post = await postModel.getPost(parseInt(data.pid))
        //添加用户点赞帖子动态
        await logModel.addLikePostLog(parseInt(data.uid), parseInt(data.pid), post.uid)
        //增加帖子点赞数
        postModel.updateLikes(parseInt(data.pid), 'increase')
        return {
          status: 200,
          message: '操作成功'
        }
      }else{
        return {
          status: 10000,
          message: '操作失败'
        }
      }
    }else{
      //存在=>不添加
      return {
        status: 10000,
        message: '请勿添加重复记录'
      }
    }
  },

  //用户取消点赞帖子
  async cancelLikePost(data){
    //获取用户点赞帖子数组
    let posts = await userModel.getLikePost(parseInt(data.uid))
    if(posts.includes(parseInt(data.pid))){     //判断是否已点赞
      //存在=>移除
      posts.splice(posts.findIndex(item => item == parseInt(data.pid)), 1)
      //修改点赞帖子记录
      let result = await userModel.updateLikePosts(parseInt(data.uid), posts)
      if(result){
        //减少帖子点赞数
        postModel.updateLikes(parseInt(data.pid), 'decrease')
        return {
          status: 200,
          message: '操作成功'
        }
      }else{
        return {
          status: 10000,
          message: '操作失败'
        }
      }
    }else{
      //不存在=>不移除
      return {
        status: 10003,
        message: '未找到操作对象'
      }
    }
  },

  //用户收藏帖子
  async collectPost(data){
    //获取用户收藏帖子数组
    let posts = await userModel.getCollectPost(parseInt(data.uid))
    if(!posts.includes(parseInt(data.pid))){    //判断是否已收藏  
      //不存在=>添加
      posts.unshift(parseInt(data.pid))
      //修改收藏帖子记录
      let result = await userModel.updateCollectPosts(parseInt(data.uid), posts)
      if(result){
        //获取帖子up主uid
        let post = await postModel.getPost(parseInt(data.pid))
        //添加用户收藏帖子动态
        await logModel.addCollectPostLog(parseInt(data.uid), parseInt(data.pid), post.uid)
        //增加帖子收藏数
        postModel.updateCollects(parseInt(data.pid), 'increase')
        return {
          status: 200,
          message: '操作成功'
        }
      }else{
        return {
          status: 10000,
          message: '操作失败'
        }
      }
    }else{
      //存在=>不添加
      return {
        status: 10000,
        message: '请勿添加重复记录'
      }
    }
  },

  //用户取消收藏帖子
  async cancelCollectPost(data){
    //获取用户收藏帖子数组
    let posts = await userModel.getCollectPost(parseInt(data.uid))
    if(posts.includes(parseInt(data.pid))){    //判断是否已收藏  
      //存在=>移除
      posts.splice(posts.findIndex(item => item == parseInt(data.pid)), 1)
      //修改收藏帖子记录
      let result = await userModel.updateCollectPosts(parseInt(data.uid), posts)
      if(result){
        //减少帖子收藏数
        postModel.updateCollects(parseInt(data.pid), 'decrease')
        return {
          status: 200,
          message: '操作成功'
        }
      }else{
        return {
          status: 10000,
          message: '操作失败'
        }
      }
    }else{
      //不存在=>不移除
      return {
        status: 10003,
        message: '未找到操作对象'
      }
    }
  },

  //用户点亮评论
  async lightComment(data){
    //获取用户点亮评论数组
    let comments = await userModel.getLightComment(parseInt(data.uid))
    if(!comments.includes(data.comment_id)){    //判断是否已点亮
      //不存在=>添加
      comments.push(data.comment_id)
      //修改点亮评论记录
      let result = await userModel.updateLightComments(parseInt(data.uid), comments)
      //修改评论点亮计数
      let comment = await commentModel.getComment(data.comment_id)
      userModel.increaseCommentLightsCount(comment._id, comment.lights)
      if(result){
        return {
          status: 200,
          message: '操作成功'
        }
      }else{
        return {
          status: 10000,
          message: '操作失败'
        }
      }
    }else{
      //存在=>不添加
      return {
        status: 10000,
        message: '请勿添加重复记录'
      }
    }
  },

  //用户取消点亮评论
  async cancelLightComment(data){
    //获取用户点亮评论数组
    let comments = await userModel.getLightComment(parseInt(data.uid))
    if(comments.includes(data.comment_id)){    //判断是否已点亮
      //存在=>移除
      comments.splice(comments.findIndex(item => item == data.comment_id), 1)
      //修改点亮评论记录
      let result = await userModel.updateLightComments(parseInt(data.uid), comments)
      //修改评论点亮计数
      let comment = await commentModel.getComment(data.comment_id)
      userModel.decreaseCommentLightsCount(comment._id, comment.lights)
      if(result){
        return {
          status: 200,
          message: '操作成功'
        }
      }else{
        return {
          status: 10000,
          message: '操作失败'
        }
      }
    }else{
      //不存在=>不移除
      return {
        status: 10003,
        message: '未找到操作对象'
      }
    }
  },

  //用户点亮回复
  async lightAnswer(data){
    //获取用户点亮回复数组
    let answers = await userModel.getLightAnswer(parseInt(data.uid))
    if(!answers.includes(data.answer_id)){    //判断是否已点亮
      //不存在=>添加
      answers.push(data.answer_id)
      //修改点亮回复记录
      let result = await userModel.updateLightAnswers(parseInt(data.uid), answers)
      //修改回复点亮计数
      let answer = await answerModel.getAnswer(data.answer_id)
      userModel.increaseAnswerLightsCount(answer._id, answer.lights)
      if(result){
        return {
          status: 200,
          message: '操作成功'
        }
      }else{
        return {
          status: 10000,
          message: '操作失败'
        }
      }
    }else{
      //存在=>不添加
      return {
        status: 10000,
        message: '请勿添加重复记录'
      }
    }
  },

  //用户取消点亮回复
  async cancelLightAnswer(data){
    //获取用户点亮回复数组
    let answers = await userModel.getLightAnswer(parseInt(data.uid))
    if(answers.includes(data.answer_id)){    //判断是否已点亮
      //存在=>移除
      answers.splice(answers.findIndex(item => item == data.answer_id), 1)
      //修改点亮回复记录
      let result = await userModel.updateLightAnswers(parseInt(data.uid), answers)
      //修改回复点亮计数
      let answer = await answerModel.getAnswer(data.answer_id)
      userModel.decreaseAnswerLightsCount(answer._id, answer.lights)
      if(result){
        return {
          status: 200,
          message: '操作成功'
        }
      }else{
        return {
          status: 10000,
          message: '操作失败'
        }
      }
    }else{
      //不存在=>不移除
      return {
        status: 10003,
        message: '未找到操作对象'
      }
    }
  },
  
}

module.exports = user