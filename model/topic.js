/*
 * @Author: jwchan1996
 * @Date: 2019-05-21 19:58:41
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-06-29 01:50:58
 */

const util = require('../util')
const db = require('../util/db')
const db_mongo = require('../util/db_mongo')

const topic = {

  //获取一级话题数据（页数，数目）
  async getTopicList(pageNum=1,pageSize=20){
    let start = (pageNum-1)*pageSize
    let sql = 'SELECT * FROM topic WHERE sid=0 LIMIT ?,?'
    let result = await db.query(sql, [start, pageSize])
    if(Array.isArray(result) && result.length > 0){
      return result
    }
    return false
  },

  //获取子级话题数据
  async getChildTopicList(sid){
    let sql = 'SELECT * FROM topic WHERE sid=?'
    let result = await db.query(sql, [sid])
    if(Array.isArray(result) && result.length > 0){
      return result
    }
    return false
  }

}

module.exports = topic