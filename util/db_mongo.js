/*
 * @Author: jwchan1996
 * @Date: 2019-06-10 11:09:36
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-06-10 16:44:40
 */

const MongoClient = require('mongodb').MongoClient

const url = 'mongodb://localhost:27017/'


/**
 * @description: 连接数据库并执行命令
 * @param {Function} command 命令函数
 * @return {Object} 返回
 */
const query = command => {

  return new Promise(( resolve, reject ) => {
    MongoClient.connect( url, { useNewUrlParser: true }, (err, db) => {
      let client = db.db('ppap')
      if (err) {
        resolve( err )
      } else {
        command(resolve, reject, client)
        db.close()
      }
    })
  })

}


/**
 * @description: 查询通用函数
 * @param {String} table 数据表
 * @param {Object} condition 查询条件
 * @return {Array} 返回
 */
const find = ( table, condition={} ) => {
  let command = (resolve, reject, client) => {
    client.collection(table).find(condition).toArray((err, result) => {
      if(err){
        reject(err)
      }else{
        resolve(result)
      }
    })
  }
  return query(command)
}


/**
 * @description: 插入一条数据
 * @param {String} table 数据表
 * @param {Object} value 数据对象
 * @return {boolean} 返回
 */
const insertOne = (table, value) => {
  let command = (resolve, reject, client) => {
    client.collection(table).insertOne(value, (err, result) => {
      if(err){
        reject(err)
      }else{
        resolve(result)
      }
    })
  }
  return query(command)
}


/**
 * @description: 插入多条数据
 * @param {String} table 数据表
 * @param {Array} value 数据对象数组
 * @return {boolean} 返回
 */
const insertMany = (table, value) => {
  let command = (resolve, reject, client) => {
    client.collection(table).insertMany(value, (err, result) => {
      if(err){
        reject(err)
      }else{
        resolve(result)
      }
    })
  }
  return query(command)
}


/**
 * @description: 更新一条数据
 * @param {String} table 数据表
 * @param {Object} condition 查询条件
 * @param {Object} value 数据对象，格式 {$set: {"type": "en"}}
 * @return {boolean} 返回
 */
const updateOne = (table, condition, value) => {
  let command = (resolve, reject, client) => {
    client.collection(table).updateOne(condition, value, (err, result) => {
      if(err){
        reject(err)
      }else{
        resolve(result)
      }
    })
  }
  return query(command)
}


/**
 * @description: 更新多条数据
 * @param {String} table 数据表
 * @param {Object} condition 查询条件
 * @param {Object} value 数据对象，格式 {$set: {"type": "en"}}
 * @return {boolean} 返回
 */
const updateMany = (table, condition, value) => {
  let command = (resolve, reject, client) => {
    client.collection(table).updateMany(condition, value, (err, result) => {
      if(err){
        reject(err)
      }else{
        resolve(result)
      }
    })
  }
  return query(command)
}


/**
 * @description: 删除一条数据
 * @param {String} table 数据表
 * @param {Object} condition 查询条件
 * @return {boolean} 返回
 */
const deleteOne = (table, condition) => {
  let command = (resolve, reject, client) => {
    client.collection(table).deleteOne(condition, (err, result) => {
      if(err){
        reject(err)
      }else{
        resolve(result)
      }
    })
  }
  return query(command)
}


/**
 * @description: 删除多条数据
 * @param {String} table 数据表
 * @param {Object} condition 查询条件
 * @return {boolean} 返回
 */
const deleteMany = (table, condition) => {
  let command = (resolve, reject, client) => {
    client.collection(table).deleteMany(condition, (err, result) => {
      if(err){
        reject(err)
      }else{
        resolve(result)
      }
    })
  }
  return query(command)
}

module.exports = {
  query,
  find,
  insertOne,
  insertMany,
  updateOne,
  updateMany,
  deleteOne,
  deleteMany
}
