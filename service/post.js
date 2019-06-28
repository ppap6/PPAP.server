/*
 * @Author: jwchan1996
 * @Date: 2019-05-21 20:00:06
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-06-28 10:29:48
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
    return await postModel.getPostList(pageNum, pageSize, topicId)
  },

  //添加帖子
  async addPost(data){
    return await postModel.addPost(data)
  },

  //删除帖子
  async deletePost(id){
    let exist = await postModel.getPost(id)
    if(exist){
      let result = await postModel.deletePost(id)
      if(result){
        return true
      }else{
        return false
      } 
    }else{
      return false
    }
  },

  //获取帖子信息
  async getPost(id){
    return await postModel.getPost(id)
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