/*
 * @Author: jwchan1996
 * @Date: 2019-05-21 20:00:06
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-06-29 12:08:04
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

const post ={

  //获取帖子列表
  async getPostList(pageNum, pageSize, topicId){
    let postList = await postModel.getPostList(pageNum, pageSize, topicId)
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
    let result = await postModel.addPost(data)
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

  //删除帖子
  async deletePost(id){
    let exist = await postModel.getPost(id)
    if(exist){
      let result = await postModel.deletePost(id)
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
          message: '更新成功'
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