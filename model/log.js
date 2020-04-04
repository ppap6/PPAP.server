/*
 * @Author: jwchan1996
 * @Date: 2019-05-21 19:58:41
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-09-28 23:06:12
 */

const util = require('../util')
const db_mongo = require('../util/db_mongo')

const log = {

  //添加用户评论动态
  async addCommentLog(uid, pid, post_owner_id, comment_id){
    let dataObj = {
      type: 1,
      uid,
      pid,
      post_owner_id,
      comment_id,
      create_time: util.changeTimeToStr(new Date()),
      update_time: util.changeTimeToStr(new Date())
    }
    let result = await db_mongo.insertOne('user_log', dataObj)
    if(result.insertedCount){
      return result.insertedCount
    }
    return false
  },

  //添加用户回复动态
  async addAnswerLog(uid, pid, targetor_id, answer_id){
    let dataObj = {
      type: 2,
      uid,
      pid,
      targetor_id,
      answer_id,
      create_time: util.changeTimeToStr(new Date()),
      update_time: util.changeTimeToStr(new Date())
    }
    let result = await db_mongo.insertOne('user_log', dataObj)
    if(result.insertedCount){
      return result.insertedCount
    }
    return false
  },

  //添加用户关注他人动态
  async addFollowPeopleLog(uid, follow_people_id){
    let dataObj = {
      type: 3,
      uid,
      follow_people_id,
      create_time: util.changeTimeToStr(new Date()),
      update_time: util.changeTimeToStr(new Date())
    }
    let result = await db_mongo.insertOne('user_log', dataObj)
    if(result.insertedCount){
      return result.insertedCount
    }
    return false
  },

  //获取用户关注他人动态记录
  async getFollowPeopleLog(uid, follow_people_id){
    let result = await db_mongo.find('user_log', {type: 3, uid, follow_people_id})
    if(Array.isArray(result) && result.length > 0){
      return result[0]
    }
    return false
  },

  //修改用户关注他人动态记录
  async updateFollowPeopleLog(uid, follow_people_id){
    let dataObj = {
      update_time: util.changeTimeToStr(new Date())
    }
    let setObj = {
      $set: dataObj
    }
    let result = await db_mongo.updateOne('user_log', {type: 3, uid, follow_people_id}, setObj)
    if(result.modifiedCount){
      return result.modifiedCount
    }
    return false
  },

  //添加用户点赞帖子动态
  async addLikePostLog(uid, pid, post_owner_id){
    let dataObj = {
      type: 4,
      uid,
      pid,
      post_owner_id,
      create_time: util.changeTimeToStr(new Date()),
      update_time: util.changeTimeToStr(new Date())
    }
    let result = await db_mongo.insertOne('user_log', dataObj)
    if(result.insertedCount){
      return result.insertedCount
    }
    return false
  },

  //获取用户点赞帖子动态记录
  async getLikePostLog(uid, pid, post_owner_id){
    let result = await db_mongo.find('user_log', {type: 4, uid, pid, post_owner_id})
    if(Array.isArray(result) && result.length > 0){
      return result[0]
    }
    return false
  },

  //修改用户点赞帖子动态记录
  async updateLikePostLog(uid, pid, post_owner_id){
    let dataObj = {
      update_time: util.changeTimeToStr(new Date())
    }
    let setObj = {
      $set: dataObj
    }
    let result = await db_mongo.updateOne('user_log', {type: 4, uid, pid, post_owner_id}, setObj)
    if(result.modifiedCount){
      return result.modifiedCount
    }
    return false
  },

  //添加用户收藏帖子动态
  async addCollectPostLog(uid, pid, post_owner_id){
    let dataObj = {
      type: 5,
      uid,
      pid,
      post_owner_id,
      create_time: util.changeTimeToStr(new Date()),
      update_time: util.changeTimeToStr(new Date())
    }
    let result = await db_mongo.insertOne('user_log', dataObj)
    if(result.insertedCount){
      return result.insertedCount
    }
    return false
  },

  //获取用户收藏帖子动态记录
  async getCollectPostLog(uid, pid, post_owner_id){
    let result = await db_mongo.find('user_log', {type: 5, uid, pid, post_owner_id})
    if(Array.isArray(result) && result.length > 0){
      return result[0]
    }
    return false
  },

  //修改用户收藏帖子动态记录
  async updateCollectPostLog(uid, pid, post_owner_id){
    let dataObj = {
      update_time: util.changeTimeToStr(new Date())
    }
    let setObj = {
      $set: dataObj
    }
    let result = await db_mongo.updateOne('user_log', {type: 5, uid, pid, post_owner_id}, setObj)
    if(result.modifiedCount){
      return result.modifiedCount
    }
    return false
  },

  //添加用户关注话题动态
  async addFollowTopicLog(uid, follow_topic_id){
    let dataObj = {
      type: 6,
      uid,
      follow_topic_id,
      create_time: util.changeTimeToStr(new Date()),
      update_time: util.changeTimeToStr(new Date())
    }
    let result = await db_mongo.insertOne('user_log', dataObj)
    if(result.insertedCount){
      return result.insertedCount
    }
    return false
  },

  //获取用户关注话题动态记录
  async getFollowTopicLog(uid, follow_topic_id){
    let result = await db_mongo.find('user_log', {type: 6, uid, follow_topic_id})
    if(Array.isArray(result) && result.length > 0){
      return result[0]
    }
    return false
  },

  //修改用户关注话题动态记录
  async updateFollowTopicLog(uid, follow_topic_id){
    let dataObj = {
      update_time: util.changeTimeToStr(new Date())
    }
    let setObj = {
      $set: dataObj
    }
    let result = await db_mongo.updateOne('user_log', {type: 6, uid, follow_topic_id}, setObj)
    if(result.modifiedCount){
      return result.modifiedCount
    }
    return false
  },

  //添加用户发布帖子动态
  async addPostLog(uid, pid){
    let dataObj = {
      type: 7,
      uid,
      pid,
      create_time: util.changeTimeToStr(new Date()),
      update_time: util.changeTimeToStr(new Date())
    }
    let result = await db_mongo.insertOne('user_log', dataObj)
    if(result.insertedCount){
      return result.insertedCount
    }
    return false
  },
  

}

module.exports = log