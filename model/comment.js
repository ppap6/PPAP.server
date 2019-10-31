/*
 * @Author: jwchan1996
 * @Date: 2019-07-07 23:35:31
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-09-28 23:00:00
 */

const util = require('../util')
const db_mongo = require('../util/db_mongo')
const ObjectId = require('mongodb').ObjectId

const comment = {

  //获取帖子评论数据（页数，数目，帖子id）
  async getCommentList(pageNum=1, pageSize=20, postId=0){
    let start = (pageNum-1)*pageSize
    let result = await db_mongo.find('comment', {pid: postId, status: 1}, start, pageSize, {create_time: -1})
    if(Array.isArray(result) && result.length > 0){
      return result
    }
    return false
  },
  
  //管理运营获取帖子评论数据（页数，数目，帖子id）
  async getCommentListForAdmin(pageNum=1, pageSize=20, postId=0){
    let start = (pageNum-1)*pageSize
    let result = await db_mongo.find('comment', {pid: postId}, start, pageSize, {create_time: -1})
    if(Array.isArray(result) && result.length > 0){
      return result
    }
    return false
  },

  //添加帖子评论
  async addComment(data){
    let dataObj = {
      uid: parseInt(global.uid),
      pid: parseInt(data.pid),
      content: data.content,
      create_time: util.changeTimeToStr(new Date()),
      update_time: util.changeTimeToStr(new Date()),
      lights: 0,
      status: 1
    }
    let result = await db_mongo.insertOne('comment', dataObj)
    if(result.insertedCount){
      return result.insertedId
    }
    return false
  },

  //删除帖子评论
  async deleteComment(id){
    // let result = await db_mongo.deleteOne('comment', {_id: ObjectId(id)})
    let setObj = {
      $set: {
        status: 0
      }
    }
    let result = await db_mongo.updateOne('comment', {_id: ObjectId(id)}, setObj)
    // if(result.deletedCount){
    if(result.modifiedCount){
      // return result.deletedCount
      return result.modifiedCount
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