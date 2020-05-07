//jwt密钥
const secret = 'secret'
//密码加密盐
const salt = 'ppap'
//程序运行主机与端口
const host = 'localhost'
const port = 2333
//mysql数据库相关
const sql_host = 'localhost'
const sql_port = 3306
const sql_user = 'ppap'
const sql_password = 'ppap'
const sql_database = 'ppap'
//mongodb数据库相关
const mongo_host = 'localhost'
const mongo_port = 27017
const mongo_database = 'ppap'
const mongo_user = 'root'
const mongo_password = 'ppap'
const mongo_auth_source = 'admin'

// docker 容器模式下访问宿主机切记将配置文件改成宿主机内网ip

module.exports = {
  secret,
  salt,
  host,
  port,
  sql_host,
  sql_port,
  sql_user,
  sql_password,
  sql_database,
  mongo_host,
  mongo_port,
  mongo_database,
  mongo_user,
  mongo_password,
  mongo_auth_source
}