/*
 * @Author: jwchan1996
 * @Date: 2019-07-02 23:43:23
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-07-03 00:09:36
 */

const util = require('../util')
const db = require('../util/db')
const db_mongo = require('../util/db_mongo')

const access = {

  //获取权限列表
  async getAccessList(pageNum=1, pageSize=20){
    let start = (pageNum-1)*pageSize
    let sql = 'SELECT * FROM access LIMIT ?,?'
    let result = await db.query(sql, [start, pageSize])
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

}

module.exports = access