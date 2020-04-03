/*
 * @Author: jwchan1996
 * @Date: 2019-07-07 23:33:17
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-09-28 23:00:52
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
 const answerModel = require('../model/answer')
 const postModel = require('../model/post')
 const logModel = require('../model/log')
 const userModel = require('../model/user')

 const comment ={
 
  //获取帖子评论列表
  async getCommentList(pageNum, pageSize, postId){
    let commentList = await commentModel.getCommentList(pageNum, pageSize, postId)
    if(commentList){
      for(let i=0; i<commentList.length; i++){
        let user = await userModel.getUser(commentList[i].uid)
        commentList[i].uname = user.name
        commentList[i].avatar = user.avatar
        if(parseInt(global.uid)){
          //获取用户点亮评论数组
          let comments = await userModel.getLightComment(parseInt(global.uid))
          if(comments.includes(commentList[i]._id.toString())){
            commentList[i].is_light = true
          }else{
            commentList[i].is_light = false
          }
        }else{
          commentList[i].is_light = false
        }
        let answerList = await answerModel.getAnswerList(pageNum, pageSize, commentList[i]._id.toString())
        if(answerList){
          for(let i=0; i<answerList.length; i++){
            let requestor = await userModel.getUser(answerList[i].requestor_id)
            answerList[i].requestor_name = requestor.name
            answerList[i].requestor_avatar = requestor.avatar
            let targetor = await userModel.getUser(answerList[i].targetor_id)
            answerList[i].targetor_name = targetor.name
            answerList[i].targetor_avatar = targetor.avatar
            if(parseInt(global.uid)){
              //获取用户点亮回复数组
              let answers = await userModel.getLightAnswer(parseInt(global.uid))
              if(answers.includes(answerList[i]._id.toString())){
                answerList[i].is_light = true
              }else{
                answerList[i].is_light = false
              }
            }else{
              answerList[i].is_light = false
            }
          }
          commentList[i].answer_list = answerList
        }else{
          commentList[i].answer_list = []
        }
      }
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

  //管理运营获取帖子评论列表
  async getCommentListForAdmin(pageNum, pageSize, postId){
    //获取角色权限
    let roleId = await userModel.getRoleId()
    //验证身份权限
    if(roleId > 3){
      return {
        status: 10004,
        message: '没有操作权限'
      }
    }
    let commentList = await commentModel.getCommentListForAdmin(pageNum, pageSize, postId)
    if(commentList){
      for(let i=0; i<commentList.length; i++){
        let user = await userModel.getUser(commentList[i].uid)
        commentList[i].uname = user.name
        commentList[i].avatar = user.avatar        
        let answerList = await answerModel.getAnswerListForAdmin(pageNum, pageSize, commentList[i]._id.toString())
        if(answerList){
          for(let i=0; i<answerList.length; i++){
            let requestor = await userModel.getUser(answerList[i].requestor_id)
            answerList[i].requestor_name = requestor.name
            answerList[i].requestor_avatar = requestor.avatar
            let targetor = await userModel.getUser(answerList[i].targetor_id)
            answerList[i].targetor_name = targetor.name
            answerList[i].targetor_avatar = targetor.avatar
          }
          commentList[i].answer_list = answerList
        }else{
          commentList[i].answer_list = []
        }
      }
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
    let insertedId = await commentModel.addComment(data)
    if(insertedId){
      //获取帖子up主uid
      let post = await postModel.getPost(parseInt(data.pid))
      //帖子评论数加一
      postModel.updatePostStatistics(parseInt(data.pid), 'increaseComments')
      //添加用户评论动态
      logModel.addCommentLog(parseInt(global.uid), parseInt(data.pid), post.uid, insertedId)
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
    //获取角色权限
    let roleId = await userModel.getRoleId()
    //验证身份权限
    if(roleId > 4){
      return {
        status: 10004,
        message: '没有操作权限'
      }
    }
    let comment = await commentModel.getComment(id)
    if(comment){
      let result = await commentModel.deleteComment(id)
      if(result){
        //帖子评论数减一
        postModel.updatePostStatistics(comment.pid, 'decreaseComments')
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
      let user = await userModel.getUser(comment.uid)
      comment.uname = user.name
      comment.avatar = user.avatar
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
    let comment = await commentModel.getComment(id)
    if(comment){
      //获取角色权限
      let roleId = await userModel.getRoleId()
      //验证身份权限
      if(roleId == 5 && comment.uid != global.uid){
        return {
          status: 10004,
          message: '没有操作权限'
        }
      }
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