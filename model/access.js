/*
 * @Author: jwchan1996
 * @Date: 2019-07-02 23:43:23
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-07-03 09:42:59
 */

const util = require('../util')
const db = require('../util/db')
const db_mongo = require('../util/db_mongo')

const access = {

  //获取一级权限列表
  async getAccessList(pageNum=1, pageSize=20){
    let start = (pageNum-1)*pageSize
    let sql = 'SELECT * FROM access WHERE sid=0 LIMIT ?,?'
    let result = await db.query(sql, [start, pageSize])
    if(Array.isArray(result) && result.length > 0){
      return result
    }
    return false
  },

  //获取子级权限数据
  async getChildAccessList(sid){
    let sql = 'SELECT * FROM access WHERE sid=?'
    let result = await db.query(sql, [sid])
    if(Array.isArray(result) && result.length > 0){
      return result
    }
    return false
  },

  //添加权限
  async addAccess(data){
    let sql = 'INSERT INTO access(sid,name,code,create_time,update_time,description) VALUES(?,?,?,?,?,?)'
    let values = [
      data.sid,
      data.name,
      data.code,
      util.changeTimeToStr(new Date()),
      util.changeTimeToStr(new Date()),
      data.description
    ]
    let result = await db.query(sql, [...values])
    if(result.insertId){
      return result.insertId
    }
    return false
  },

  //获取权限信息(根据id)
  async getAccess(id){
    let sql = 'SELECT * FROM access WHERE id=?'
    let result = await db.query(sql, [id])
    if(Array.isArray(result) && result.length > 0){
      return result[0]
    }
    return false
  },

  //删除权限数据
  async deleteAccess(id){
    let sql = 'DELETE FROM access WHERE id=?'
    let result = await db.query(sql, [id])
    if(result.affectedRows){
      return true
    }
    return false
  },

}

module.exports = access