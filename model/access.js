/*
 * @Author: jwchan1996
 * @Date: 2019-07-02 23:43:23
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-07-02 23:44:25
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

}

module.exports = access