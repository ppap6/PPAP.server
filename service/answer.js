/*
 * @Author: jwchan1996
 * @Date: 2019-07-12 00:24:39
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-07-12 00:32:21
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
  
}

module.exports = answer