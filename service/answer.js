/*
 * @Author: jwchan1996
 * @Date: 2019-07-12 00:24:39
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-09-28 23:05:10
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

const answerModel = require('../model/answer')
const commentModel = require('../model/comment')
const postModel = require('../model/post')
const logModel = require('../model/log')
const userModel = require('../model/user')

const answer ={

  //获取评论回复列表
  async getAnswerList(pageNum, pageSize, commentId){
    if(!commentId){
      return {
        status: 10002,
        message: '非法参数'
      }
    }
    let count = await answerModel.getAnswerCount(commentId)
    let answerList = await answerModel.getAnswerList(pageNum, pageSize, commentId)
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
      return {
        status: 200,
        message: {
          page_num: pageNum,
          page_size: pageSize,
          total: count,
          list: answerList
        }
      }
    }
    return {
      status: 10003,
      message: '未找到操作对象'
    }
  },

  //管理运营获取评论回复列表
  async getAnswerListForAdmin(pageNum, pageSize, commentId){
    //获取角色权限
    let roleId = await userModel.getRoleId()
    //验证身份权限
    if(roleId > 3){
      return {
        status: 10004,
        message: '没有操作权限'
      }
    }
    if(!commentId){
      return {
        status: 10002,
        message: '非法参数'
      }
    }
    let count = await answerModel.getAnswerCountForAdmin(commentId)
    let answerList = await answerModel.getAnswerListForAdmin(pageNum, pageSize, commentId)
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
      return {
        status: 200,
        message: {
          page_num: pageNum,
          page_size: pageSize,
          total: count,
          list: answerList
        }
      }
    }
    return {
      status: 10003,
      message: '未找到操作对象'
    }
  },

  //添加评论回复
  async addAnswer(data){
    if(data.type == 1){
      // type == 1, 代表对评论的回复
      let insertedId = await answerModel.addAnswerForComment(data)
      if(insertedId){
        //获取准备回复的这条评论的目标人uid
        let comment = await commentModel.getComment(data.comment_id)
        //帖子回复数加一
        postModel.updatePostStatistics(parseInt(data.pid), 'increaseAnswers')
        //添加用户的回复动态
        logModel.addAnswerLog(parseInt(global.uid), parseInt(data.pid), parseInt(comment.uid), insertedId)
        //更新帖子最后回复时间
        postModel.updatePostLastAnswerTime(parseInt(data.pid))
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
      // type == 2, 代表对回复的回复
      let insertedId = await answerModel.addAnswerForAnswer(data)
      if(insertedId){
        //获取准备回复的这条回复的目标人uid
        let answer = await answerModel.getAnswer(data.target_answer_id)
        //帖子回复数加一
        postModel.updatePostStatistics(parseInt(data.pid), 'increaseAnswers')
        //添加用户的回复动态
        logModel.addAnswerLog(parseInt(global.uid), parseInt(data.pid), parseInt(answer.requestor_id), insertedId)
        //更新帖子最后回复时间
        postModel.updatePostLastAnswerTime(parseInt(data.pid))
        return {
          status: 200,
          message: '操作成功'
        }
      }
      return {
        status: 10000,
        message: '操作失败'
      }
    }
  },

  //删除评论单条回复
  async deleteAnswer(id){
    //获取角色权限
    let roleId = await userModel.getRoleId()
    //验证身份权限
    if(roleId > 4){
      return {
        status: 10004,
        message: '没有操作权限'
      }
    }
    let answer = await answerModel.getAnswer(id)
    if(answer){
      let result = await answerModel.deleteAnswer(id)
      if(result){
        //帖子回复数减一
        postModel.updatePostStatistics(answer.pid, 'decreaseAnswers')
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

  //获取评论单条回复信息
  async getAnswer(id){
    let answer = await answerModel.getAnswer(id)
    if(answer){
      let post = await postModel.getPost(answer.pid)
      answer.ptitle = post.title
      let requestor = await userModel.getUser(answer.requestor_id)
      answer.requestor_name = requestor.name
      answer.requestor_avatar = requestor.avatar
      let targetor = await userModel.getUser(answer.targetor_id)
      answer.targetor_name = targetor.name
      answer.targetor_avatar = targetor.avatar
      let comment = await commentModel.getComment(answer.comment_id)
      answer.comment_content = comment.content
      if(answer.type == 2){
        let targetAnswer = await answerModel.getAnswer(answer.target_answer_id)
        answer.target_answer_content = targetAnswer.content
      }
      return {
        status: 200,
        message: answer
      }
    }
    return {
      status: 10003,
      message: '未找到操作对象'
    }
  },

  //查看评论详情相关信息
  async getAnswerDetail(id, pageNum, pageSize){
    let answer = await answerModel.getAnswer(id)
    if(!answer){
      return {
        status: 10003,
        message: '未找到操作对象'
      }
    }
    //comment
    let comment = await commentModel.getComment(answer.comment_id)
    if(comment){
      let user = await userModel.getUser(comment.uid)
      comment.uname = user.name
      comment.avatar = user.avatar
      if(parseInt(global.uid)){
        //获取用户点亮评论数组
        let comments = await userModel.getLightComment(parseInt(global.uid))
        if(comments.includes(comment._id.toString())){
          comment.is_light = true
        }else{
          comment.is_light = false
        }
      }else{
        comment.is_light = false
      }
      //post
      let post = await postModel.getPost(comment.pid)
      //answer_list
      let answerCount = await answerModel.getAnswerCount(comment._id.toString())
      let answerList = await answerModel.getAnswerList(pageNum, pageSize, comment._id.toString())
      let answer_list
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
        answer_list = {
          page_num: pageNum,
          page_size: pageSize,
          total: answerCount,
          list: answerList
        }
      }else{
        answer_list = {
          page_num: pageNum,
          pageSize: pageSize,
          total: answerCount,
          list: []
        }
      }
      //answer_detail
      let post_last = await postModel.getPost(answer.pid)
      let requestor_last = await userModel.getUser(answer.requestor_id)
      let targetor_last = await userModel.getUser(answer.targetor_id)
      let comment_last = await commentModel.getComment(answer.comment_id)
      let answer_last = await answerModel.getAnswer(answer.target_answer_id)
      let answer_detail = {
        _id: answer._id,
        type: answer.type,
        comment_id: answer.comment_id,
        comment_content: comment_last.content,
        target_answer_id: answer.target_answer_id,
        target_answer_content: answer_last.content,
        requestor_id: answer.requestor_id,
        requestor_name: requestor_last.name,
        requestor_avatar: requestor_last.avatar,
        targetor_id: answer.targetor_id,
        targetor_name: targetor_last.name,
        targetor_avatar: targetor_last.avatar,
        pid: answer.pid,
        ptitle: post_last.title,
        content: answer.content,
        create_time: answer.create_time,
        update_time: answer.update_time,
        lights: answer.lights
      }
      return {
        status: 200,
        message: {
          comment,
          post,
          answer_list,
          answer_detail
        }
      }
    }
    return {
      status: 10003,
      message: '未找到操作对象'
    }
  },

  //修改评论回复信息
  async updateAnswer(id, data){
    let answer = await answerModel.getAnswer(id)
    if(answer){
      //获取角色权限
      let roleId = await userModel.getRoleId()
      //验证身份权限
      if(roleId == 5 && answer.requestor_id != global.uid){
        return {
          status: 10004,
          message: '没有操作权限'
        }
      }
      let result = await answerModel.updateAnswer(id, data)
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

module.exports = answer