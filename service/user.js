/*
 * @Author: jwchan1996
 * @Date: 2019-05-21 20:00:06
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-07-21 23:17:38
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
    let result = await userModel.addUser(data)
    if(result){
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
  
}

module.exports = user