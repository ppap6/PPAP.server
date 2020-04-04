/*
 * @Author: jwchan1996
 * @Date: 2019-05-21 20:00:06
 * @LastEditors  : jwchan1996
 * @LastEditTime : 2019-12-19 17:29:15
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
const postModel = require('../model/post')
const topicModel = require('../model/topic')
const personModel = require('../model/person')
const logModel = require('../model/log')
const userModel = require('../model/user')

const post ={

  //获取帖子列表
  async getPostList(pageNum, pageSize, topicId){
    //判断话题是否是父级
    let topic = await topicModel.getTopic(topicId)
    let sid
    if(topic.sid == 0){
      sid = true
    }else{
      sid = false
    }
    let postList = await postModel.getPostList(pageNum, pageSize, topicId, sid)
    if(postList){
      return {
        status: 200,
        message: postList
      }
    }
    return {
      status: 10003,
      message: '未找到操作对象'
    }
  },

  //管理运营获取帖子列表
  async getPostListForAdmin(pageNum, pageSize, topicId){
    //判断话题是否是父级
    let topic = await topicModel.getTopic(topicId)
    let sid
    if(topic.sid == 0){
      sid = true
    }else{
      sid = false
    }
    let postList = await postModel.getPostListForAdmin(pageNum, pageSize, topicId, sid)
    if(postList){
      return {
        status: 200,
        message: postList
      }
    }
    return {
      status: 10003,
      message: '未找到操作对象'
    }
  },

  //添加帖子
  async addPost(data){
    let pid = await postModel.addPost(data)
    if(pid){
      topicModel.updateTopicStatistics(data.topic_id, 'increasePosts')
      //添加用户发布帖子动态
      await logModel.addPostLog(parseInt(global.uid), parseInt(pid))
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

  //删除帖子
  async deletePost(id){
    //获取角色权限
    let roleId = await userModel.getRoleId()
    //验证身份权限
    if(roleId > 4){
      return {
        status: 10004,
        message: '没有操作权限'
      }
    }
    let post = await postModel.getPost(id)
    if(post){
      let result = await postModel.deletePost(id)
      if(result){
        topicModel.updateTopicStatistics(post.topic_id, 'decreasePosts')
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

  //获取帖子信息
  async getPost(id){
    let post = await postModel.getPost(id)
    if(post){
      return {
        status: 200,
        message: post
      }
    }
    return {
      status: 10003,
      message: '未找到操作对象'
    }
  },

  //修改帖子信息
  async updatePost(id, data){
    let post = await postModel.getPost(id)
    if(post){
      //获取角色权限
      let roleId = await userModel.getRoleId()
      //验证身份权限
      if(roleId == 5 && post.uid != global.uid){
        return {
          status: 10004,
          message: '没有操作权限'
        }
      }
      let result = await postModel.updatePost(id, data)
      if(result){
        //判断原话题是否与新话题一样
        if(post.topic_id != data.topic_id){
          //原话题贴子数减一
          topicModel.updateTopicStatistics(post.topic_id, 'decreasePosts')
          //新话题帖子数加一
          topicModel.updateTopicStatistics(data.topic_id, 'increasePosts')
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
        status: 10003,
        message: '未找到操作对象'
      }
    } 
  },

  //增加帖子阅读量
  async addPV(data){
    let post = await postModel.getPost(parseInt(data.pid))
    if(post){
      let result = await postModel.addPV(parseInt(data.pid))
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
  }
  
}

module.exports = post