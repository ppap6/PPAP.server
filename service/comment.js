/*
 * @Author: jwchan1996
 * @Date: 2019-07-07 23:33:17
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-07-10 23:49:47
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
   
 }
 
 module.exports = comment