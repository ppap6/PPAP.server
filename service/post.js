/*
 * @Author: jwchan1996
 * @Date: 2019-05-21 20:00:06
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-09-26 00:56:01
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

const post ={

  //获取帖子列表
  async getPostList(pageNum, pageSize, topicId){
    let postList = await postModel.getPostList(pageNum, pageSize, topicId)
    if(postList){
      for (let i = 0; i < postList.length; i++) {
        let commentCount = await personModel.getPostCommentCount(postList[i].id)
        let answerCount = await personModel.getPostAnswerCount(postList[i].id)
        postList[i].comments = commentCount
        postList[i].answers = answerCount
      }
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
    let result = await postModel.addPost(data)
    if(result){
      topicModel.updateTopicStatistics(data.topic_id, 'increasePosts')
      //添加用户发布帖子动态
      await logModel.addPostLog(parseInt(data.uid), parseInt(result))
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
    let exist = await postModel.getPost(id)
    if(exist){
      let result = await postModel.deletePost(id)
      if(result){
        topicModel.updateTopicStatistics(exist.topic_id, 'decreasePosts')
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
    let exist = await postModel.getPost(id)
    if(exist){
      let result = await postModel.updatePost(id, data)
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

  //增加帖子阅读量
  async addPV(data){
    let exist = await postModel.getPost(parseInt(data.pid))
    if(exist){
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