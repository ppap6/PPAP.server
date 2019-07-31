/*
 * @Author: jwchan1996
 * @Date: 2019-05-21 19:58:41
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-08-01 00:02:07
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
  
}

module.exports = log