/*
 * @Author: jwchan1996
 * @Date: 2019-10-25 10:25:00
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-10-25 10:25:00
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
const searchModel = require('../model/search')
const personModel = require('../model/person')

const search ={
 
  //获取帖子列表
  async getPostList(keyword, pageNum, pageSize){
    let postList = await searchModel.getPostList(keyword, pageNum, pageSize)
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
  }
   
}
 
module.exports = search