/*
 * @Author: jwchan1996
 * @Date: 2019-05-21 19:58:41
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-06-30 23:47:52
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
  },

  //添加话题
  async addTopic(data){
    let sql = 'INSERT INTO topic(sid,name,intro,create_time,update_time) VALUES(?,?,?,?,?)'
    let values = [
      data.sid,
      data.name,
      data.intro,
      util.changeTimeToStr(new Date()),
      util.changeTimeToStr(new Date())
    ]
    let result = await db.query(sql, [...values])
    if(result.insertId){
      return result.insertId
    }
    return false
  },

  //获取话题信息(根据id)
  async getTopic(id){
    let sql = 'SELECT * FROM topic WHERE id=?'
    let result = await db.query(sql, [id])
    if(Array.isArray(result) && result.length > 0){
      return result[0]
    }
    return false
  },

  //删除话题数据
  async deleteTopic(id){
    let sql = 'DELETE FROM topic WHERE id=?'
    let result = await db.query(sql, [id])
    if(result.affectedRows){
      return true
    }
    return false
  },

  //修改话题信息
  async updateTopic(id, data){
    let sql = 'UPDATE topic SET name=?,intro=?,update_time=? WHERE id=?'
    let values = [
      data.name,
      data.intro,
      util.changeTimeToStr(new Date())
    ]
    let result = await db.query(sql, [...values, id])
    if(result){
      return true
    }
    return false
  },

}

module.exports = topic