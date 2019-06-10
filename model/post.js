/*
 * @Author: jwchan1996
 * @Date: 2019-05-21 19:58:41
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-06-10 16:20:07
 */

const db = require('../util/db_mongo')

const post = {
  //查找所有评论
  async getPostComment(){
    let result = await db.find('comment')
    if(Array.isArray(result) && result.length > 0){
      return result
    }
    return 'null'
  }
}

module.exports = post