/*
 * @Author: jwchan1996
 * @Date: 2019-05-21 19:58:41
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-09-23 23:59:31
 */

const util = require('../util')
const db = require('../util/db')

const topic = {

  //获取一级话题数据（页数，数目）
  async getTopicList(pageNum=1,pageSize=20){
    let start = (pageNum-1)*pageSize
    let sql = 'SELECT * FROM topic WHERE sid=0 AND status=1 LIMIT ?,?'
    let result = await db.query(sql, [start, pageSize])
    if(Array.isArray(result) && result.length > 0){
      return result
    }
    return false
  },

  //获取子级话题数据
  async getChildTopicList(sid){
    let sql = 'SELECT * FROM topic WHERE sid=? AND status=1' 
    let result = await db.query(sql, [sid])
    if(Array.isArray(result) && result.length > 0){
      return result
    }
    return false
  },

  //管理运营获取一级话题数据（页数，数目）
  async getTopicListForAdmin(pageNum=1,pageSize=20){
    let start = (pageNum-1)*pageSize
    let sql = 'SELECT * FROM topic WHERE sid=0 LIMIT ?,?'
    let result = await db.query(sql, [start, pageSize])
    if(Array.isArray(result) && result.length > 0){
      return result
    }
    return false
  },

  //管理运营获取子级话题数据
  async getChildTopicListForAdmin(sid){
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
    let sql = `UPDATE topic SET name='无话题',status=0 WHERE id=?`
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

  //更新话题统计
  async updateTopicStatistics(id, action){
    /**
     * increaseFollowers  增加关注数
     * decreaseFollowers  减少关注数
     * increasePosts  增加帖子数
     * decreasePosts  减少帖子数
     */
    let sql = ''
    if(action == 'increaseFollowers'){
      sql = 'UPDATE topic SET followers=followers+1,update_time=? WHERE id=?'
    }else if(action == 'decreaseFollowers'){
      sql = 'UPDATE topic SET followers=followers-1,update_time=? WHERE id=?'
    }else if(action == 'increasePosts'){
      sql = 'UPDATE topic SET posts=posts+1,update_time=? WHERE id=?'
    }else if(action == 'decreasePosts'){
      sql = 'UPDATE topic SET posts=posts-1,update_time=? WHERE id=?'
    }else{
      return false
    }
    let values = [
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