/*
 * @Author: jwchan1996
 * @Date: 2019-06-10 11:09:36
 * @LastEditors  : jwchan1996
 * @LastEditTime : 2020-01-17 14:21:40
 */

const MongoClient = require('mongodb').MongoClient
const config = require('../config/config')

const url = `mongodb://${config.mongo_user}:${config.mongo_password}@${config.mongo_host}:${config.mongo_port}/?authSource=${config.mongo_auth_source}`
console.log(url)

/**
 * 创建数据库连接对象
 */
let DB
MongoClient.connect( url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if(err) throw err
  DB = client.db(config.mongo_database)
})


/**
 * @description: 查询通用函数
 * @param {String} table 数据表
 * @param {Object} condition 查询条件
 * @return {Array} 返回
 */
const find = ( table, condition={}, start=0, pageSize=1000, sortCondition={} ) => {
  return new Promise((resolve, reject) => {
    DB.collection(table).find(condition).sort(sortCondition).skip(start).limit(pageSize).toArray((err, result) => {
      if(err){
        reject(err)
      }else{
        resolve(result)
      }
    })
  })
}

/**
 * @description: 计算总数通用函数
 * @param {String} table 数据表
 * @param {Object} condition 查询条件
 * @return {Array} 返回
 */
const count = ( table, condition={} ) => {
  return new Promise((resolve, reject) => {
    DB.collection(table).find(condition).count((err, result) => {
      if(err){
        reject(err)
      }else{
        resolve(result)
      }
    })
  })
}


/**
 * @description: 插入一条数据
 * @param {String} table 数据表
 * @param {Object} value 数据对象
 * @return {boolean} 返回
 */
const insertOne = (table, dataObj) => {
  return new Promise((resolve, reject) => {
    DB.collection(table).insertOne(dataObj, (err, result) => {
      if(err){
        reject(err)
      }else{
        resolve(result)
      }
    })
  })
}


/**
 * @description: 插入多条数据
 * @param {String} table 数据表
 * @param {Array} value 数据对象数组
 * @return {boolean} 返回
 */
const insertMany = (table, objArr) => {
  return new Promise((resolve, reject) => {
    DB.collection(table).insertMany(objArr, (err, result) => {
      if(err){
        reject(err)
      }else{
        resolve(result)
      }
    })
  })
}


/**
 * @description: 更新一条数据
 * @param {String} table 数据表
 * @param {Object} condition 查询条件
 * @param {Object} value 数据对象，格式 {$set: {"type": "en"}}
 * @return {boolean} 返回
 */
const updateOne = (table, condition, dataObj) => {
  return new Promise((resolve, reject) => {
    DB.collection(table).updateOne(condition, dataObj, (err, result) => {
      if(err){
        reject(err)
      }else{
        resolve(result)
      }
    })
  })
}


/**
 * @description: 更新多条数据
 * @param {String} table 数据表
 * @param {Object} condition 查询条件
 * @param {Object} value 数据对象，格式 {$set: {"type": "en"}}
 * @return {boolean} 返回
 */
const updateMany = (table, condition, dataObj) => {
  return new Promise((resolve, reject) => {
    DB.collection(table).updateMany(condition, dataObj, (err, result) => {
      if(err){
        reject(err)
      }else{
        resolve(result)
      }
    })
  })
}


/**
 * @description: 删除一条数据
 * @param {String} table 数据表
 * @param {Object} condition 查询条件
 * @return {boolean} 返回
 */
const deleteOne = (table, condition) => {
  return new Promise((resolve, reject) => {
    DB.collection(table).deleteOne(condition, (err, result) => {
      if(err){
        reject(err)
      }else{
        resolve(result)
      }
    })
  })
}


/**
 * @description: 删除多条数据
 * @param {String} table 数据表
 * @param {Object} condition 查询条件
 * @return {boolean} 返回
 */
const deleteMany = (table, condition) => {
  return new Promise((resolve, reject) => {
    DB.collection(table).deleteMany(condition, (err, result) => {
      if(err){
        reject(err)
      }else{
        resolve(result)
      }
    })
  })
}

module.exports = {
  find,
  count,
  insertOne,
  insertMany,
  updateOne,
  updateMany,
  deleteOne,
  deleteMany
}
