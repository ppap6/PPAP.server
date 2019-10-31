//jwt密钥
const secret = 'secret'
//密码加密盐
const salt = 'ppap'
//mysql数据库相关
const host = 'localhost'
const port = 3306
const user = 'root'
const password = ''
const database = 'ppap'
//mongodb数据库相关
const mongo_host = 'localhost'
const mongo_port = 27017
const mongo_database = 'ppap'

module.exports = {
  secret,
  salt,
  host,
  port,
  user,
  password,
  database,
  mongo_host,
  mongo_port,
  mongo_database
}