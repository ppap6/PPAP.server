/*
 * @Author: jwchan1996
 * @Date: 2019-07-12 00:26:44
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-07-12 00:33:59
 */

const util = require('../util')
const db_mongo = require('../util/db_mongo')
const ObjectId = require('mongodb').ObjectId

const answer = {

  //获取评论回复数据（页数，数目，评论id）
  async getAnswerList(pageNum=1, pageSize=20, commentId){
    let start = (pageNum-1)*pageSize
    let result = await db_mongo.find('answer', {comment_id: commentId}, start, pageSize)
    if(Array.isArray(result) && result.length > 0){
      return result
    }
    return false
  },

}

module.exports = answer