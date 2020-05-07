# Mysql
## 安装
版本 5.7.6 及以上
## 配置
### 创建用户账户密码
略
### 开启 utf8mb4 支持
如果 ppap.sql 数据表已经设置了 CHARSET=utf8mb4，则不需要修改配置文件  
否则，找到配置文件，将下面配置放到配置文件对应位置
```bash
[client]
default-character-set = utf8mb4

[mysql]
default-character-set = utf8mb4

[mysqld]
character-set-client-handshake = FALSE
character-set-server = utf8mb4
collation-server = utf8mb4_bin
```
### 设置全文索引
MySQL全文索引配置
找到配置文件，在配置文件添加
```bash
[mysqld]
ft_min_word_len = 1
ngram_token_size = 2
```
保存后重启 Mysql

### 创建数据库
#### 命令行导入
1.进入MySQL
```bash
> mysql -u 用户名 -p 密码
```
2.创建数据库ppap
```bash
> CREATE DATABASE ppap;
```
3.切换到目标数据库
```bash
> use pppa;
```
4.导入数据库文件
```bash
> source ppap.sql;
```
> 注：如果没有设置索引，则需要手动设置生成索引

```bash
> CREATE FULLTEXT INDEX ft_index ON post (title, content) WITH PARSER ngram;
```
#### 可视化工具导入
```bash
使用 phpMyAdmin 或其他可视化工具
```

# Mongodb
## 安装
版本 4.0 及以上
## 配置
### 创建用户账户密码
#### 连接 Mongodb
```bash
./mongo
```
#### 创建 root 用户
```bash
use admin
db.createUser({user:"root", pwd:"pwd", roles:["root"]})
```
#### 修改 Mongodb 配置文件
```bash
security:
  authorization: enabled  //启用授权
```
#### 重启 Mongodb 服务
略
### 创建数据库
#### 命令行导入  
```bash
#创建数据库
use ppap
```
```bash
#创建集合
> use ppap
switched to db ppap
> db.createCollection("comment")
{ "ok" : 1 }
> db.createCollection("answer")
{ "ok" : 1 }
> db.createCollection("message")
{ "ok" : 1 }
> db.createCollection("user_fans_relation")
{ "ok" : 1 }
> db.createCollection("user_likes_collects_lights_relation")
{ "ok" : 1 }
> db.createCollection("user_log")
{ "ok" : 1 }
> db.createCollection("user_topic_relation")
{ "ok" : 1 }
>
```
```bash
#导入集合数据
mongoimport --port 27017 -u 用户名 -p 密码 -d ppap -c comment --type=json --file comment.json
mongoimport --port 27017 -u 用户名 -p 密码 -d ppap -c answer --type=json --file answer.json
mongoimport --port 27017 -u 用户名 -p 密码 -d ppap -c message --type=json --file message.json
mongoimport --port 27017 -u 用户名 -p 密码 -d ppap -c user_fans_relation --type=json --file user_fans_relation.json
mongoimport --port 27017 -u 用户名 -p 密码 -d ppap -c user_likes_collects_lights_relation --type=json --file user_likes_collects_lights_relation.json
mongoimport --port 27017 -u 用户名 -p 密码 -d ppap -c user_log --type=json --file user_log.json
mongoimport --port 27017 -u 用户名 -p 密码 -d ppap -c user_topic_relation --type=json --file user_topic_relation.json

#参数含义
-h    --host ：代表远程连接的数据库地址，默认连接本地Mongo数据库；
--port：代表远程连接的数据库的端口，默认连接的远程端口27017；
-u    --username：代表连接远程数据库的账号，如果设置数据库的认证，需要指定用户账号；
-p    --password：代表连接数据库的账号对应的密码；
-d    --db：代表连接的数据库；
-c    --collection：代表连接数据库中的集合；
-f    --fields：代表导入集合中的字段；
--type：代表导入的文件类型，包括csv和json,tsv文件，默认json格式；
--file：导入的文件名称。
```

#### 可视化工具导入
```bash
使用 MongoDB Compass 可视化工具
```


# Node
打开项目的 config 文件  
配置连接 Mysql、Mongodb 的账户密码等  
```bash
yarn
yarn dev  #开发模式
yarn start  #生产模式
```