/*
 * @Author: jwchan1996
 * @Date: 2019-05-21 19:58:41
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-07-16 23:58:31
 */

/**
 * 标识符（数据库、表、列名）用两个 ? 做占位符（即 ?? ）
 * 其他的用一个 ? 做占位符
 */

const util = require('../util')
const db = require('../util/db')
const db_mongo = require('../util/db_mongo')
const ObjectId = require('mongodb').ObjectId

const user = {

  //查看用户列表
  async getUserList(pageNum, pageSize){
    let start = (pageNum-1)*pageSize
    let sql = `SELECT * FROM user LIMIT ${start},${pageSize}`
    let result = await db.query(sql)
    if(Array.isArray(result) && result.length > 0){
      return result
    }
    return false
  },

  //新增用户
  async addUser(data){
    let sql = 'INSERT INTO user(name,account,password,email,create_time,update_time,role_id) VALUES(?,?,?,?,?,?,?)'
    let values = [
      data.name,
      data.account,
      data.password,
      data.email,
      util.changeTimeToStr(new Date()),
      util.changeTimeToStr(new Date()),
      4
    ]
    let result = await db.query(sql, values)
    if(result.insertId){
      return result.insertId
    }
    return false
  },

  //删除用户
  async deleteUser(id){
    let sql = 'DELETE FROM user WHERE id=?'
    let result = await db.query(sql, [id])
    if(result.affectedRows){
      return true
    }
    return false
  },

  //获取用户信息(根据id)
  async getUser(id){
    let sql = 'SELECT * FROM user WHERE id=?'
    let result = await db.query(sql, [id])
    if(Array.isArray(result) && result.length > 0){
      return result[0]
    }
    return false
  },

  //获取用户信息(根据account)
  async getUserByAccount(account){
    let sql = 'SELECT * FROM user WHERE account=?'
    let result = await db.query(sql, [account])
    if(Array.isArray(result) && result.length > 0){
      return result[0]
    }
    return false
  },

  //修改用户信息
  async updateUser(id, data){
    let sql = 'UPDATE user SET name=?,account=?,password=?,sex=?,email=?,update_time=?,role_id=? WHERE id=?'
    let values = [
      data.name,
      data.account,
      data.password,
      data.sex,
      data.email,
      util.changeTimeToStr(new Date()),
      data.role_id
    ]
    let result = await db.query(sql, [...values,id])
    if(result.affectedRows){
      return true
    }
    return false
  },

  //用户登录
  async login(account, password){
    let sql = 'SELECT password FROM user WHERE account=?'
    let result = await db.query(sql, [account])
    if(Array.isArray(result) && result.length > 0){
      if(result[0].password === password){
        return true
      }else{
        return false
      }
    }
    return false
  },

  //用户关注
  async follow(data){
    let dataObj = {
      uid: parseInt(data.uid),
      follow_uid: parseInt(data.follow_uid),
      create_time: util.changeTimeToStr(new Date()),
      state: 1
    }
    let result = await db_mongo.insertOne('user_fans_relation', dataObj)
    if(result.insertedCount){
      return result.insertedCount
    }
    return false
  },
}

module.exports = user