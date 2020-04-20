/*
 * @Author: jwchan1996
 * @Date: 2019-05-21 20:00:06
 * @LastEditors  : jwchan1996
 * @LastEditTime : 2019-12-27 10:26:59
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
const roleModel = require('../model/role')
const logModel = require('../model/log')
const commentModel = require('../model/comment')
const answerModel = require('../model/answer')
const personModel = require('../model/person')
const tokenUtil = require('../util/token')
const crypto = require('crypto')
const salt = require('../config/config').salt

const user = {

  //获取用户权限列表
  async getUserAuthList(){
    //获取用户角色ID
    let roleId = await userModel.getRoleId()
    let roleAccess = await roleModel.getRoleAccess(roleId)
    if(roleAccess){
      return {
        status: 200,
        message: roleAccess
      }
    }
    return {
      status: 10003,
      message: '未找到操作对象'
    }
  },

  //获取用户登录状态
  async getUserLoginStatus(){
    let user = await userModel.getUser(global.uid)
    if(user){
      let result = {
        id: user.id,
        name: user.name,
        account: user.account,
        avatar: user.avatar,
        sex: user.sex,
        email: user.email,
        create_time: user.create_time,
        role_id: user.role_id,
        role_name: user.role_name,
        count: {
          posts: await personModel.getUserPostCount(global.uid),
          comments: await personModel.getUserCommentCount(global.uid),
          answers: await personModel.getUserAnswerCount(global.uid),
          fans: await personModel.getUserFansCount(global.uid),
          follows: await personModel.getUserFollowCount(global.uid),
          likes: await personModel.getUserLikeCount(global.uid),
          collects: await personModel.getUserCollectCount(global.uid),
          topics: await personModel.getUserTopicCount(global.uid)
        }
      }
      return {
        status: 200,
        message: result
      }
    }
    return {
      status: 10003,
      message: '未找到操作对象'
    }
  },

  //获取所有用户
  async getUserList(pageNum, pageSize){
    //获取角色权限
    let roleId = await userModel.getRoleId()
    //验证身份权限
    if(roleId > 3){
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
        userModel.addUserLikeCollectLightModel(insertId)
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
    let user = await userModel.getUser(id)
    if(user){
      let result = await userModel.deleteUser(id)
      if(result){
        //删除用户点赞收藏点亮模型
        // userModel.deleteUserLikeCollectLightModel(id)
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
      let result = {
        id: user.id,
        name: user.name,
        account: user.account,
        avatar: user.avatar,
        sex: user.sex,
        email: user.email,
        create_time: user.create_time,
        role_id: user.role_id,
        role_name: user.role_name,
        count: {
          posts: await personModel.getUserPostCount(id),
          comments: await personModel.getUserCommentCount(id),
          answers: await personModel.getUserAnswerCount(id),
          fans: await personModel.getUserFansCount(id),
          follows: await personModel.getUserFollowCount(id),
          likes: await personModel.getUserLikeCount(id),
          collects: await personModel.getUserCollectCount(id),
          topics: await personModel.getUserTopicCount(id)
        }
      }
      return {
        status: 200,
        message: result
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
    if(roleId >= parseInt(data.role_id) && roleId > 3){
      return {
        status: 10004,
        message: '没有操作权限'
      }
    }
    let user = await userModel.getUser(id)
    if(user){
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

  //用户修改自己的信息
  async updateSelf(data){
    let uid = global.uid
    let user = await userModel.getUser(uid)
    if(user){
      let user = await userModel.getUserByAccount(data.account)
      //验证修改的用户账号是否已被使用
      if(!user || (user && user.id == uid)){
        let result = await userModel.updateUser(uid, data)
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
          user: {
            uid: user.id,
            uname: user.name,
            account: data.account,
            avatar: user.avatar,
            sex: user.sex,
            email: user.email,
            identity: user.role_id,
            create_time: user.create_time,
            token: tokenUtil.getToken({
              uid: user.id,
              name: user.name,
              account: data.account, 
              password: data.password,
              roleId: user.role_id
            }),
            count: {
              posts: await personModel.getUserPostCount(user.id),
              comments: await personModel.getUserCommentCount(user.id),
              answers: await personModel.getUserAnswerCount(user.id),
              fans: await personModel.getUserFansCount(user.id),
              follows: await personModel.getUserFollowCount(user.id),
              likes: await personModel.getUserLikeCount(user.id),
              collects: await personModel.getUserCollectCount(user.id),
              topics: await personModel.getUserTopicCount(user.id)
            }
          }
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
        userModel.addUserLikeCollectLightModel(insertId)
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

  //获取用户对话题的关注状态
  async getTopicStatus(id){
    let visitorId = global.uid
    let userTopic = await userModel.getUserTopic(parseInt(visitorId), id)
    let result
    if(userTopic){
      result = {
        isFollow: userTopic.state ? true : false
      }
    }else{
      result = {
        isFollow: false
      }
    }
    return {
      status: 200,
      message: result
    }
  },

  //获取用户对用户的关注状态
  async getFollowStatus(id){
    let visitorId = global.uid
    let userFollow = await userModel.getUserFollow(parseInt(visitorId), id)
    let result
    if(userFollow){
      result = {
        isFollow: userFollow.state ? true : false
      }
    }else{
      result = {
        isFollow: false
      }
    }
    return {
      status: 200,
      message: result
    }
  },

  //用户关注
  async follow(data){
    let exist = await userModel.getFollow(parseInt(global.uid), parseInt(data.follow_uid))
    if(!exist){       //判断是否已存在关注记录
      //添加关注记录
      let result = await userModel.follow(data)
      if(result){
        //B用户粉丝数加一
        userModel.updateUserStatistics(data.follow_uid, 'increaseFans')
        //A用户关注数加一
        userModel.updateUserStatistics(global.uid, 'increaseFollows')
        //获取用户关注动态记录
        let log = logModel.getFollowPeopleLog(parseInt(global.uid), parseInt(data.follow_uid))
        if(log){
          //修改用户关注动态记录
          logModel.updateFollowPeopleLog(parseInt(global.uid), parseInt(data.follow_uid))
        }else{
          //添加用户关注动态记录
          logModel.addFollowPeopleLog(parseInt(global.uid), parseInt(data.follow_uid))
        }
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
      let result = await userModel.updateFollow(parseInt(global.uid), parseInt(data.follow_uid), 1)
      if(result){
        //B用户粉丝数加一
        userModel.updateUserStatistics(data.follow_uid, 'increaseFans')
        //A用户关注数加一
        userModel.updateUserStatistics(global.uid, 'increaseFollows')
        //获取用户关注动态记录
        let log = logModel.getFollowPeopleLog(parseInt(global.uid), parseInt(data.follow_uid))
        if(log){
          //修改用户关注动态记录
          logModel.updateFollowPeopleLog(parseInt(global.uid), parseInt(data.follow_uid))
        }else{
          //添加用户关注动态记录
          logModel.addFollowPeopleLog(parseInt(global.uid), parseInt(data.follow_uid))
        }
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
    let exist = await userModel.getFollow(parseInt(global.uid), parseInt(data.follow_uid))
    //判断是否已存在关注记录，且关注状态是1，即已关注
    if(exist && exist.state == 1){      
      //更改为未关注状态
      let result = await userModel.updateFollow(parseInt(global.uid), parseInt(data.follow_uid), 0)
      if(result){
        //B用户粉丝数减一
        userModel.updateUserStatistics(data.follow_uid, 'decreaseFans')
        //A用户关注数减一
        userModel.updateUserStatistics(global.uid, 'decreaseFollows')
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
    let exist = await userModel.getFollowTopic(parseInt(global.uid), parseInt(data.follow_topic_id))
    if(!exist){     //判断是否已存在关注记录
      //添加关注记录
      let result = await userModel.followTopic(data)
      if(result){
        //话题关注数加一
        topicModel.updateTopicStatistics(data.follow_topic_id, 'increaseFollowers')
        //获取用户关注动态记录
        let log = logModel.getFollowTopicLog(parseInt(global.uid), parseInt(data.follow_topic_id))
        if(log){
          //修改用户关注动态记录
          logModel.updateFollowTopicLog(parseInt(global.uid), parseInt(data.follow_topic_id))
        }else{
          //添加用户关注话题动态
          logModel.addFollowTopicLog(parseInt(global.uid), parseInt(data.follow_topic_id))
        }
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
      let result = await userModel.updateFollowTopic(parseInt(global.uid), parseInt(data.follow_topic_id), 1)
      if(result){
        //话题关注数加一
        topicModel.updateTopicStatistics(data.follow_topic_id, 'increaseFollowers')
        //获取用户关注动态记录
        let log = logModel.getFollowTopicLog(parseInt(global.uid), parseInt(data.follow_topic_id))
        if(log){
          //修改用户关注动态记录
          logModel.updateFollowTopicLog(parseInt(global.uid), parseInt(data.follow_topic_id))
        }else{
          //添加用户关注话题动态
          logModel.addFollowTopicLog(parseInt(global.uid), parseInt(data.follow_topic_id))
        }
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
    let exist = await userModel.getFollowTopic(parseInt(global.uid), parseInt(data.follow_topic_id))
    //判断是否已存在关注记录，且关注状态是1，即已关注
    if(exist && exist.state == 1){      
      //更改为未关注状态
      let result = await userModel.updateFollowTopic(parseInt(global.uid), parseInt(data.follow_topic_id), 0)
      if(result){
        //话题关注数减一
        topicModel.updateTopicStatistics(data.follow_topic_id, 'decreaseFollowers')
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
    let posts = await userModel.getLikePost(parseInt(global.uid))
    if(!posts){
      //用户点赞收藏点亮模型不存在
      posts = []
      //新增用户点赞收藏点亮模型
      userModel.addUserLikeCollectLightModel(parseInt(global.uid))
    }
    if(!posts.includes(parseInt(data.pid))){    //判断是否已点赞   
      //不存在=>添加
      posts.unshift(parseInt(data.pid))
      //修改点赞帖子记录
      let result = await userModel.updateLikePosts(parseInt(global.uid), posts)
      if(result){
        //获取帖子up主uid
        let post = await postModel.getPost(parseInt(data.pid))
        //获取用户点赞帖子动态记录
        let log = logModel.getLikePostLog(parseInt(global.uid), parseInt(data.pid), post.uid)
        if(log){
          //修改用户点赞帖子动态记录
          logModel.updateLikePostLog(parseInt(global.uid), parseInt(data.pid), post.uid)
        }else{
          //添加用户点赞帖子动态记录
          logModel.addLikePostLog(parseInt(global.uid), parseInt(data.pid), post.uid)
        }
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
    let posts = await userModel.getLikePost(parseInt(global.uid))
    if(!posts){
      //用户点赞收藏点亮模型不存在
      posts = []
      //新增用户点赞收藏点亮模型
      userModel.addUserLikeCollectLightModel(parseInt(global.uid))
    }
    if(posts.includes(parseInt(data.pid))){     //判断是否已点赞
      //存在=>移除
      posts.splice(posts.findIndex(item => item == parseInt(data.pid)), 1)
      //修改点赞帖子记录
      let result = await userModel.updateLikePosts(parseInt(global.uid), posts)
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
    let posts = await userModel.getCollectPost(parseInt(global.uid))
    if(!posts){
      //用户点赞收藏点亮模型不存在
      posts = []
      //新增用户点赞收藏点亮模型
      userModel.addUserLikeCollectLightModel(parseInt(global.uid))
    }
    if(!posts.includes(parseInt(data.pid))){    //判断是否已收藏  
      //不存在=>添加
      posts.unshift(parseInt(data.pid))
      //修改收藏帖子记录
      let result = await userModel.updateCollectPosts(parseInt(global.uid), posts)
      if(result){
        //获取帖子up主uid
        let post = await postModel.getPost(parseInt(data.pid))
        //获取用户收藏帖子动态记录
        let log = logModel.getCollectPostLog(parseInt(global.uid), parseInt(data.pid), post.uid)
        if(log){
          //修改用户收藏帖子动态记录
          logModel.updateCollectPostLog(parseInt(global.uid), parseInt(data.pid), post.uid)
        }else{
          //添加用户收藏帖子动态记录
          logModel.addCollectPostLog(parseInt(global.uid), parseInt(data.pid), post.uid)
        }
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
    let posts = await userModel.getCollectPost(parseInt(global.uid))
    if(!posts){
      //用户点赞收藏点亮模型不存在
      posts = []
      //新增用户点赞收藏点亮模型
      userModel.addUserLikeCollectLightModel(parseInt(global.uid))
    }
    if(posts.includes(parseInt(data.pid))){    //判断是否已收藏  
      //存在=>移除
      posts.splice(posts.findIndex(item => item == parseInt(data.pid)), 1)
      //修改收藏帖子记录
      let result = await userModel.updateCollectPosts(parseInt(global.uid), posts)
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
    let comments = await userModel.getLightComment(parseInt(global.uid))
    if(!comments){
      //用户点赞收藏点亮模型不存在
      comments = []
      //新增用户点赞收藏点亮模型
      userModel.addUserLikeCollectLightModel(parseInt(global.uid))
    }
    if(!comments.includes(data.comment_id)){    //判断是否已点亮
      //不存在=>添加
      comments.push(data.comment_id)
      //修改点亮评论记录
      let result = await userModel.updateLightComments(parseInt(global.uid), comments)
      //修改评论点亮计数
      let comment = await commentModel.getComment(data.comment_id)
      userModel.increaseCommentLightsCount(comment._id, comment.lights)
      //用户被点亮数加一
      userModel.updateUserStatistics(comment.uid, 'increaseLights')
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
    let comments = await userModel.getLightComment(parseInt(global.uid))
    if(!comments){
      //用户点赞收藏点亮模型不存在
      comments = []
      //新增用户点赞收藏点亮模型
      userModel.addUserLikeCollectLightModel(parseInt(global.uid))
    }
    if(comments.includes(data.comment_id)){    //判断是否已点亮
      //存在=>移除
      comments.splice(comments.findIndex(item => item == data.comment_id), 1)
      //修改点亮评论记录
      let result = await userModel.updateLightComments(parseInt(global.uid), comments)
      //修改评论点亮计数
      let comment = await commentModel.getComment(data.comment_id)
      userModel.decreaseCommentLightsCount(comment._id, comment.lights)
      //用户被点亮数减一
      userModel.updateUserStatistics(comment.uid, 'decreaseLights')
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
    let answers = await userModel.getLightAnswer(parseInt(global.uid))
    if(!answers){
      //用户点赞收藏点亮模型不存在
      answers = []
      //新增用户点赞收藏点亮模型
      userModel.addUserLikeCollectLightModel(parseInt(global.uid))
    }
    if(!answers.includes(data.answer_id)){    //判断是否已点亮
      //不存在=>添加
      answers.push(data.answer_id)
      //修改点亮回复记录
      let result = await userModel.updateLightAnswers(parseInt(global.uid), answers)
      //修改回复点亮计数
      let answer = await answerModel.getAnswer(data.answer_id)
      userModel.increaseAnswerLightsCount(answer._id, answer.lights)
      //用户被点亮数加一
      userModel.updateUserStatistics(answer.requestor_id, 'increaseLights')
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
    let answers = await userModel.getLightAnswer(parseInt(global.uid))
    if(!answers){
      //用户点赞收藏点亮模型不存在
      answers = []
      //新增用户点赞收藏点亮模型
      userModel.addUserLikeCollectLightModel(parseInt(global.uid))
    }
    if(answers.includes(data.answer_id)){    //判断是否已点亮
      //存在=>移除
      answers.splice(answers.findIndex(item => item == data.answer_id), 1)
      //修改点亮回复记录
      let result = await userModel.updateLightAnswers(parseInt(global.uid), answers)
      //修改回复点亮计数
      let answer = await answerModel.getAnswer(data.answer_id)
      userModel.decreaseAnswerLightsCount(answer._id, answer.lights)
      //用户被点亮数减一
      userModel.updateUserStatistics(answer.requestor_id, 'decreaseLights')
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