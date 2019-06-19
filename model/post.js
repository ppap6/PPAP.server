/*
 * @Author: jwchan1996
 * @Date: 2019-05-21 19:58:41
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-06-20 00:58:01
 */

const db = require('../util/db')
const db_mongo = require('../util/db_mongo')

const post = {

  //获取帖子数据（页数，数目，话题id）
  async getPostList(pageNum=1,pageSize=20,topicId=0){
    let start = (pageNum-1)*pageSize
    let sql
    if(topicId === 0){
      sql = `SELECT p.id,p.uid,u.name AS uname,p.title,p.content,p.create_time,p.update_time,p.reads,p.likes,p.collects,p.topic_id,t.name AS topic_name 
        FROM post AS p,user AS u,topic AS t 
        WHERE p.topic_id=t.id AND p.uid=u.id
        LIMIT ${start},${pageSize}`
    }else{
      sql = `SELECT p.id,p.uid,u.name AS uname,p.title,p.content,p.create_time,p.update_time,p.reads,p.likes,p.collects,p.topic_id,t.name AS topic_name 
        FROM post AS p,user AS u,topic AS t 
        WHERE p.topic_id=t.id AND p.uid=u.id AND t.id=${topicId}
        LIMIT ${start},${pageSize}`
    }
    let result = await db.query(sql)
    if(Array.isArray(result) && result.length > 0){
      return result
    }
    return 'null'
  }
}

module.exports = post