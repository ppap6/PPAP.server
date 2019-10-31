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
    let answerList = await answerModel.getAnswerList(pageNum, pageSize, commentId)
    if(answerList){
      return {
        status: 200,
        message: answerList
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
    let answerList = await answerModel.getAnswerListForAdmin(pageNum, pageSize, commentId)
    if(answerList){
      return {
        status: 200,
        message: answerList
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
        //添加用户的回复动态
        await logModel.addAnswerLog(parseInt(global.uid), parseInt(data.pid), parseInt(comment.uid), insertedId)
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
        let answer = await answerModel.getAnswer(data.answer_id)
        //添加用户的回复动态
        await logModel.addAnswerLog(parseInt(global.uid), parseInt(data.pid), parseInt(answer.requestor_id), insertedId)
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
    let exist = await answerModel.getAnswer(id)
    if(exist){
      let result = await answerModel.deleteAnswer(id)
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

  //获取评论单条回复信息
  async getAnswer(id){
    let answer = await answerModel.getAnswer(id)
    if(answer){
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