/*
 * @Author: jwchan1996
 * @Date: 2019-06-10 11:09:36
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-06-15 01:29:54
 */

const mysql = require('mysql')

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ppap',
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

const select = ( keys, table ) => {
  // let  _sql =  "SELECT ?? FROM ?? "
  let  _sql =  `SELECT ${keys} FROM ?? `
  // return query( _sql, [ keys, table ] )
  return query( _sql, [ table ] )
}

module.exports = {
  query,
  select
}
