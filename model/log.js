/*
 * @Author: jwchan1996
 * @Date: 2019-05-21 19:58:41
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-09-26 00:57:22
 */

const util = require('../util')
const db_mongo = require('../util/db_mongo')

const log = {

  //添加用户评论动态
  async addCommentLog(uid, pid, post_owner_id){
    let dataObj = {
      type: 1,
      uid,
      pid,
      post_owner_id,
      create_time: util.changeTimeToStr(new Date())
    }
    let result = await db_mongo.insertOne('user_log', dataObj)
    if(result.insertedCount){
      return result.insertedCount
    }
    return false
  },

  //添加用户回复动态
  async addAnswerLog(uid, pid, targetor_id){
    let dataObj = {
      type: 2,
      uid,
      pid,
      targetor_id,
      create_time: util.changeTimeToStr(new Date())
    }
    let result = await db_mongo.insertOne('user_log', dataObj)
    if(result.insertedCount){
      return result.insertedCount
    }
    return false
  },

  //添加用户关注他人动态
  async addFollowPeopleLog(uid, follow_people_uid){
    let dataObj = {
      type: 3,
      uid,
      follow_people_uid,
      create_time: util.changeTimeToStr(new Date())
    }
    let result = await db_mongo.insertOne('user_log', dataObj)
    if(result.insertedCount){
      return result.insertedCount
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
      create_time: util.changeTimeToStr(new Date())
    }
    let result = await db_mongo.insertOne('user_log', dataObj)
    if(result.insertedCount){
      return result.insertedCount
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
      create_time: util.changeTimeToStr(new Date())
    }
    let result = await db_mongo.insertOne('user_log', dataObj)
    if(result.insertedCount){
      return result.insertedCount
    }
    return false
  },

  //添加用户关注话题动态
  async addFollowTopicLog(uid, follow_topic_id){
    let dataObj = {
      type: 6,
      uid,
      follow_topic_id,
      create_time: util.changeTimeToStr(new Date())
    }
    let result = await db_mongo.insertOne('user_log', dataObj)
    if(result.insertedCount){
      return result.insertedCount
    }
    return false
  },

  //添加用户发布帖子动态
  async addPostLog(uid, pid){
    let dataObj = {
      type: 7,
      uid,
      pid,
      create_time: util.changeTimeToStr(new Date())
    }
    let result = await db_mongo.insertOne('user_log', dataObj)
    if(result.insertedCount){
      return result.insertedCount
    }
    return false
  },
  

}

module.exports = log