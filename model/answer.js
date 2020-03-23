/*
 * @Author: jwchan1996
 * @Date: 2019-07-12 00:26:44
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-09-28 23:03:49
 */

const util = require('../util')
const db_mongo = require('../util/db_mongo')
const ObjectId = require('mongodb').ObjectId

const answer = {

  //获取评论回复数据（页数，数目，评论id）
  async getAnswerList(pageNum=1, pageSize=20, commentId){
    let start = (pageNum-1)*pageSize
    let result = await db_mongo.find('answer', {comment_id: commentId, status: 1}, start, pageSize, {create_time: -1})
    if(Array.isArray(result) && result.length > 0){
      return result
    }
    return false
  },

  //管理运营获取评论回复数据（页数，数目，评论id）
  async getAnswerListForAdmin(pageNum=1, pageSize=20, commentId){
    let start = (pageNum-1)*pageSize
    let result = await db_mongo.find('answer', {comment_id: commentId}, start, pageSize, {create_time: -1})
    if(Array.isArray(result) && result.length > 0){
      return result
    }
    return false
  },

  //添加对评论的回复
  async addAnswerForComment(data){
    let dataObj = {
      type: parseInt(data.type),
      pid: parseInt(data.pid),
      comment_id: data.comment_id,
      requestor_id: parseInt(global.uid),
      targetor_id: parseInt(data.targetor_id),
      content: data.content,
      create_time: util.changeTimeToStr(new Date()),
      update_time: util.changeTimeToStr(new Date()),
      lights: 0,
      status: 1
    }
    let result = await db_mongo.insertOne('answer', dataObj)
    if(result.insertedCount){
      return result.insertedId
    }
    return false
  },

  //添加对回复的回复
  async addAnswerForAnswer(data){
    let dataObj = {
      type: parseInt(data.type),
      pid: parseInt(data.pid),
      comment_id: data.comment_id,
      target_answer_id: data.target_answer_id,
      requestor_id: parseInt(global.uid),
      targetor_id: parseInt(data.targetor_id),
      content: data.content,
      create_time: util.changeTimeToStr(new Date()),
      update_time: util.changeTimeToStr(new Date()),
      lights: 0
    }
    let result = await db_mongo.insertOne('answer', dataObj)
    if(result.insertedCount){
      return result.insertedId
    }
    return false
  },

  //删除评论单条回复
  async deleteAnswer(id){
    // let result = await db_mongo.deleteOne('answer', {_id: ObjectId(id)})
    let setObj = {
      $set: {
        status: 0
      }
    }
    let result = await db_mongo.updateOne('answer', {_id: ObjectId(id)}, setObj)
    // if(result.deletedCount){
    if(result.modifiedCount){
      // return result.deletedCount
      return result.modifiedCount
    }
    return false
  },

  //获取评论单条回复信息(根据id)
  async getAnswer(id){
    let result = await db_mongo.find('answer', {_id: ObjectId(id)})
    if(Array.isArray(result) && result.length > 0){
      return result[0]
    }
    return false
  },

  //修改评论回复信息
  async updateAnswer(id, data){
    let dataObj = {
      content: data.content,
      update_time: util.changeTimeToStr(new Date())
    }
    let setObj = {
      $set: dataObj
    }
    let result = await db_mongo.updateOne('answer', {_id: ObjectId(id)}, setObj)
    if(result.modifiedCount){
      return result.modifiedCount
    }
    return false
  },

}

module.exports = answer