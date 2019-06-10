/*
 * @Author: jwchan1996
 * @Date: 2019-05-21 19:58:41
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-06-10 11:37:12
 */

const db = require('../util/db')

const user = {
  //查找所有用户
  async getAllUser(){
    let result = await db.select('*', 'user')
    if(Array.isArray(result) && result.length > 0){
      return result
    }
    return null
  }
}

module.exports = user