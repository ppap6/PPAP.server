/*
 * @Author: jwchan1996
 * @Date: 2019-06-10 11:09:36
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-06-16 22:50:53
 */

const mysql = require('mysql')
const config = require('../config/config')

const pool = mysql.createPool({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
  timezone: '08:00'
})

const query = ( sql, values ) => {

  return new Promise(( resolve, reject ) => {
    pool.getConnection((err, connection) => {
      if (err) {
        resolve( err )
      } else {
        connection.query(sql, values, ( err, rows) => {

          if ( err ) {
            reject( err )
          } else {
            resolve( rows )
          }
          connection.release()
        })
      }
    })
  })

}

module.exports = {
  query
}
