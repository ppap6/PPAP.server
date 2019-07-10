/*
 * @Author: jwchan1996
 * @Date: 2019-07-07 23:35:31
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-07-11 00:55:31
 */

const util = require('../util')
const db_mongo = require('../util/db_mongo')
const ObjectId = require('mongodb').ObjectId

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

  //获取帖子评论信息(根据id)
  async getComment(id){
    let result = await db_mongo.find('comment', {_id: ObjectId(id)})
    if(Array.isArray(result) && result.length > 0){
      return result[0]
    }
    return false
  },

  //修改帖子评论信息
  async updateComment(id, data){
    let dataObj = {
      uid: parseInt(data.uid),
      pid: parseInt(data.pid),
      content: data.content,
      update_time: util.changeTimeToStr(new Date())
    }
    let setObj = {
      $set: dataObj
    }
    let result = await db_mongo.updateOne('comment', {_id: ObjectId(id)}, setObj)
    if(result.modifiedCount){
      return result.modifiedCount
    }
    return false
  },

}

module.exports = comment