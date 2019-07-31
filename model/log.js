/*
 * @Author: jwchan1996
 * @Date: 2019-05-21 19:58:41
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-07-31 23:59:03
 */

const util = require('../util')
const db_mongo = require('../util/db_mongo')

const log = {

  //用户关注
  async addCommentLog(data){
    let dataObj = {
      uid: parseInt(data.uid),
      follow_uid: parseInt(data.follow_uid),
      create_time: util.changeTimeToStr(new Date()),
      state: 1
    }
    let result = await db_mongo.insertOne('user_fans_relation', dataObj)
    if(result.insertedCount){
      return result.insertedCount
    }
    return false
  },
  
}

module.exports = log