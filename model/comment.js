/*
 * @Author: jwchan1996
 * @Date: 2019-07-07 23:35:31
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-07-10 23:49:52
 */

const util = require('../util')
const db_mongo = require('../util/db_mongo')

const comment = {

  //获取帖子评论数据（页数，数目，帖子id）
  async getCommentList(pageNum=1, pageSize=20, postId=0){
    let start = (pageNum-1)*pageSize
    let result = await db_mongo.find('comment', {pid: postId}, start, pageSize)
    if(Array.isArray(result) && result.length > 0){
      return result
    }
    return false
  },

  //添加帖子评论
  async addComment(data){
    let dataObj = {
      uid: parseInt(data.uid),
      pid: parseInt(data.pid),
      content: data.content,
      create_time: util.changeTimeToStr(new Date()),
      update_time: util.changeTimeToStr(new Date()),
      lights: 0
    }
    let result = await db_mongo.insertOne('comment', dataObj)
    if(result.insertedCount){
      return result.insertedCount
    }
    return false
  },

}

module.exports = comment