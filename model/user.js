/*
 * @Author: jwchan1996
 * @Date: 2019-05-21 19:58:41
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-06-16 23:31:54
 */

const db = require('../util/db')

const user = {

  //查找所有用户
  async getAllUser(){
    let sql = 'SELECT * FROM ??'
    let result = await db.query(sql, ['user'])
    if(Array.isArray(result) && result.length > 0){
      return result
    }
    return null
  },

  //新增用户
  async addUser(data){
    let sql = 'INSERT INTO user(name,account,password,email,create_time,role_id) VALUES(??,??,??,??,??,??)'
    let values = [
      data.name,
      data.account,
      data.password,
      data.email,
      data.create_time,
      4
    ]
    let result = await db.query(sql, values)
    if(result.insertID){
      return result.insertID
    }
    return false
  },

  //删除用户
  async deleteUser(id){
    let sql = 'DELETE FROM user WHERE id=??'
    let result = await db.query(sql, [id])
    if(result){
      return true
    }
    return false
  }
}

module.exports = user