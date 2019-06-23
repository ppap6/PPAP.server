/*
 * @Author: jwchan1996
 * @Date: 2019-05-21 19:58:41
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-06-23 23:47:48
 */

const db = require('../util/db')

const user = {

  //查找所有用户
  async getAllUser(pageNum=1,pageSize=20){
    let start = (pageNum-1)*pageSize
    let sql = `SELECT * FROM user LIMIT ??,??`
    let result = await db.query(sql, [start,pageSize])
    if(Array.isArray(result) && result.length > 0){
      return result
    }
    return false
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
  },

  //获取用户信息
  async getUser(id){
    let sql = 'SELECT * FROM user WHERE id=??'
    let result = await db.query(sql, [id])
    if(result){
      return true
    }
    return false
  },

  //修改用户信息
  async updateUser(id, data){
    let sql = 'UPDATE user SET name=??,account=??,password=??,sex=??,email=??,create_time=??,role_id=?? WHERE id=??'
    let values = [
      data.name,
      data.account,
      data.password,
      data.sex,
      data.email,
      data.create_time,
      data.role_id
    ]
    let result = await db.query(sql, [...values,id])
    if(result){
      return true
    }
    return false
  },

  //用户登录
  async login(account,password){
    let sql = 'SELECT password FROM user WHERE account=??'
    let result = await db.query(sql, [account])
    if(result){
      if(result === password){
        return true
      }
    }
    return false
  },
}

module.exports = user