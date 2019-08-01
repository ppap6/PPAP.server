/*
 * @Author: jwchan1996
 * @Date: 2019-07-07 23:33:17
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-08-01 00:03:11
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
 
 const commentModel = require('../model/comment')
 const postModel = require('../model/post')
 const logModel = require('../model/log')

 const comment ={
 
   //获取帖子评论列表
   async getCommentList(pageNum, pageSize, postId){
     let commentList = await commentModel.getCommentList(pageNum, pageSize, postId)
     if(commentList){
       return {
         status: 200,
         message: commentList
       }
     }
     return {
       status: 10003,
       message: '未找到操作对象'
     }
   },

  //添加帖子评论
  async addComment(data){
    let result = await commentModel.addComment(data)
    if(result){
      //获取帖子up主uid
      let post = await postModel.getPost(parseInt(data.pid))
      //添加用户评论动态
      await logModel.addCommentLog(parseInt(data.uid), parseInt(data.pid), post.uid)
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

  //删除帖子评论
  async deleteComment(id){
    let exist = await commentModel.getComment(id)
    if(exist){
      let result = await commentModel.deleteComment(id)
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

  //获取帖子评论信息
  async getComment(id){
    let comment = await commentModel.getComment(id)
    if(comment){
      return {
        status: 200,
        message: comment
      }
    }
    return {
      status: 10003,
      message: '未找到操作对象'
    }
  },

  //修改帖子评论信息
  async updateComment(id, data){
    let exist = await commentModel.getComment(id)
    if(exist){
      let result = await commentModel.updateComment(id, data)
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
 
 module.exports = comment