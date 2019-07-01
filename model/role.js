/*
 * @Author: jwchan1996
 * @Date: 2019-07-01 23:35:41
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-07-01 23:37:50
 */

const util = require('../util')
const db = require('../util/db')
const db_mongo = require('../util/db_mongo')

const role = {

  //获取角色列表
  async getRoleList(pageNum=1, pageSize=20){
    let start = (pageNum-1)*pageSize
    let sql = 'SELECT * FROM role LIMIT ?,?'
    let result = await db.query(sql, [start, pageSize])
    if(Array.isArray(result) && result.length > 0){
      return result
    }
    return false
  },

}

module.exports = role