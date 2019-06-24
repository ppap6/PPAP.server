/*
 * @Author: jwchan1996
 * @Date: 2019-05-21 19:58:41
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-06-24 23:04:14
 */

const util = require('../util').default
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
    return false
  },

  //新增帖子数据
  async addPost(data){
    let sql = 'INSERT INTO post(uid,title,content,create_time,update_time,topic_id) VALUES(??,??,??,??,??,??)'
    let values = [
      data.uid,
      data.title,
      data.content,
      util.changeTimeToStr(new Date()),
      util.changeTimeToStr(new Date()),
      data.topic_id
    ]
    let result = await db.query(sql, [...values])
    if(result){
      return true
    }
    return false
  },

  //删除帖子数据
  async deletePost(id){
    let sql = 'DELETE FROM post WHERE id=??'
    let result = await db.query(sql, [id])
    if(result){
      return true
    }
    return false
  },

  //修改帖子信息
  async updatePost(id, data){
    let sql = 'UPDATE post SET title=??,content=??,update_time=?? WHERE id=??'
    let values = [
      data.title,
      data.content,
      util.changeTimeToStr(new Date())
    ]
    let result = await db.query(sql, [...values,id])
    if(result){
      return true
    }
    return false
  },

}

module.exports = post