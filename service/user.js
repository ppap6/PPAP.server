/*
 * @Author: jwchan1996
 * @Date: 2019-05-21 20:00:06
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-08-02 00:31:40
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

const user = {

  //获取所有用户
  async getUserList(pageNum, pageSize){
    let userList = await userModel.getUserList(pageNum, pageSize)
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
    let insertId = await userModel.addUser(data)
    if(insertId){
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
  },

  //删除用户
  async deleteUser(id){
    let exist = await userModel.getUser(id)
    if(exist){
      let result = await userModel.deleteUser(id)
      if(result){
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
    let exist = await userModel.getUser(id)
    if(exist){
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
        status: 10003,
        message: '未找到操作对象'
      }
    }
  },

  //用户登录
  async login(data){
    let exist = await userModel.getUserByAccount(data.account)
    if(exist){
      let result = await userModel.login(data.account, data.password)
      if(result){
        return {
          status: 200,
          message: '登录成功'
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
      posts.push(parseInt(data.pid))
      //修改点赞帖子记录
      let result = await userModel.updateLikePosts(parseInt(data.uid), posts)
      if(result){
        //获取帖子up主uid
        let post = await postModel.getPost(parseInt(data.pid))
        //添加用户点赞帖子动态
        await logModel.addLikePostLog(parseInt(data.uid), parseInt(data.pid), post.uid)
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
      posts.push(parseInt(data.pid))
      //修改收藏帖子记录
      let result = await userModel.updateCollectPosts(parseInt(data.uid), posts)
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