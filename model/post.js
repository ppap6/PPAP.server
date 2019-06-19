/*
 * @Author: jwchan1996
 * @Date: 2019-05-21 19:58:41
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-06-19 23:27:44
 */

const db = require('../util/db')
const db_mongo = require('../util/db_mongo')

const post = {
  //获取帖子
  async getPostList(){
    let sql = 'SELECT * FROM post'
    let result = await db.query(sql)
    if(Array.isArray(result) && result.length > 0){
      return result
    }
    return 'null'
  }
}

module.exports = post