//jwt密钥
const secret = 'secret'
//密码加密盐
const salt = 'ppap'
//程序运行端口
const port = 2333
//mysql数据库相关
const sql_host = 'localhost'
const sql_port = 3306
const sql_user = 'root'
const sql_password = ''
const sql_database = 'ppap'
//mongodb数据库相关
const mongo_host = 'localhost'
const mongo_port = 27017
const mongo_database = 'ppap'

module.exports = {
  secret,
  salt,
  port,
  sql_host,
  sql_port,
  sql_user,
  sql_password,
  sql_database,
  mongo_host,
  mongo_port,
  mongo_database
}