/*
 * @Author: jwchan1996
 * @Date: 2019-09-10 01:35:09
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-09-29 00:39:08
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
const noticeModel = require('../model/notice')
const userModel = require('../model/user')
const postModel = require('../model/post')
const commentModel = require('../model/comment')
const answerModel = require('../model/answer')

const notice = {

  //获取评论通知列表
  async getCommentList(userId, pageNum, pageSize) {
    let commentLogList = await noticeModel.getCommentLogList(userId, pageNum, pageSize)
    if (commentLogList) {
      let noticeList = []
      //遍历
      for (let i = 0; i < commentLogList.length; i++) {
        let user = await userModel.getUser(commentLogList[i].uid)
        let post = await postModel.getPost(commentLogList[i].pid)
        let comment = await commentModel.getComment(commentLogList[i].comment_id)
        noticeList.push({
          _id: commentLogList[i]._id,
          uid: commentLogList[i].uid,
          uname: user.name,
          avatar: user.avatar,
          pid: commentLogList[i].pid,
          pname: post.title,
          comment_id: commentLogList[i].comment_id,
          comment_content: comment.content,
          create_time: commentLogList[i].create_time
        })
      }
      return {
        status: 200,
        message: noticeList
      }
    }
    return {
      status: 10003,
      message: '未找到操作对象'
    }
  },

  //获取回复通知列表
  async getAnswerList(userId, pageNum, pageSize) {
    let answerLogList = await noticeModel.getAnswerLogList(userId, pageNum, pageSize)
    if (answerLogList) {
      let noticeList = []
      //遍历
      for (let i = 0; i < answerLogList.length; i++) {
        let user = await userModel.getUser(answerLogList[i].uid)
        let post = await postModel.getPost(answerLogList[i].pid)
        let answer = await answerModel.getAnswer(answerLogList[i].answer_id)
        noticeList.push({
          _id: answerLogList[i]._id,
          uid: answerLogList[i].uid,
          uname: user.name,
          avatar: user.avatar,
          pid: answerLogList[i].pid,
          pname: post.title,
          answer_id: answerLogList[i].answer_id,
          answer_content: answer.content,
          create_time: answerLogList[i].create_time
        })
      }
      return {
        status: 200,
        message: noticeList
      }
    }
    return {
      status: 10003,
      message: '未找到操作对象'
    }
  },

  //获取关注通知列表
  async getFollowList(userId, pageNum, pageSize) {
    let followLogList = await noticeModel.getFollowLogList(userId, pageNum, pageSize)
    console.log(followLogList)
    if (followLogList) {
      let noticeList = []
      //遍历
      for (let i = 0; i < followLogList.length; i++) {
        let user = await userModel.getUser(followLogList[i].uid)
        noticeList.push({
          _id: followLogList[i]._id,
          uid: followLogList[i].uid,
          uname: user.name,
          avatar: user.avatar,
          create_time: followLogList[i].create_time
        })
      }
      return {
        status: 200,
        message: noticeList
      }
    }
    return {
      status: 10003,
      message: '未找到操作对象'
    }
  },

  //获取点赞通知列表
  async getLikeList(userId, pageNum, pageSize) {
    let likeLogList = await noticeModel.getLikeLogList(userId, pageNum, pageSize)
    if (likeLogList) {
      let noticeList = []
      //遍历
      for (let i = 0; i < likeLogList.length; i++) {
        let user = await userModel.getUser(likeLogList[i].uid)
        let post = await postModel.getPost(likeLogList[i].pid)
        noticeList.push({
          _id: likeLogList[i]._id,
          uid: likeLogList[i].uid,
          uname: user.name,
          avatar: user.avatar,
          pid: likeLogList[i].pid,
          pname: post.title,
          create_time: likeLogList[i].create_time
        })
      }
      return {
        status: 200,
        message: noticeList
      }
    }
    return {
      status: 10003,
      message: '未找到操作对象'
    }
  },

  //获取收藏通知列表
  async getCollectList(userId, pageNum, pageSize) {
    let collectLogList = await noticeModel.getCollectLogList(userId, pageNum, pageSize)
    if (collectLogList) {
      let noticeList = []
      //遍历
      for (let i = 0; i < collectLogList.length; i++) {
        let user = await userModel.getUser(collectLogList[i].uid)
        let post = await postModel.getPost(collectLogList[i].pid)
        noticeList.push({
          _id: collectLogList[i]._id,
          uid: collectLogList[i].uid,
          uname: user.name,
          avatar: user.avatar,
          pid: collectLogList[i].pid,
          pname: post.title,
          create_time: collectLogList[i].create_time
        })
      }
      return {
        status: 200,
        message: noticeList
      }
    }
    return {
      status: 10003,
      message: '未找到操作对象'
    }
  },

}

module.exports = notice