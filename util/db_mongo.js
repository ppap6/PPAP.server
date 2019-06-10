/*
 * @Author: jwchan1996
 * @Date: 2019-06-10 11:09:36
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-06-10 15:33:12
 */

const MongoClient = require('mongodb').MongoClient

const url = 'mongodb://localhost:27017/'

//连接数据库并执行命令
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

//查询函数
const select = ( table, val={} ) => {
  let command = (resolve, reject, client) => {
    client.collection(table).find(val).toArray((err, result) => {
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
  select
}
