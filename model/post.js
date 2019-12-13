/*
 * @Author: jwchan1996
 * @Date: 2019-05-21 19:58:41
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-09-11 00:16:13
 */

const util = require('../util')
const db = require('../util/db')

const post = {

  //获取帖子数据（页数，数目，话题id）
  async getPostList(pageNum=1,pageSize=20,topicId=0,sid){
    let start = (pageNum-1)*pageSize
    let sql
    if(topicId === 0){
      sql = `SELECT p.id,p.uid,u.name AS uname,u.avatar,p.title,p.content,p.md,p.create_time,p.update_time,p.pv,p.likes,p.collects,p.topic_id,t.name AS topic_name 
        FROM post AS p,user AS u,topic AS t 
        WHERE p.topic_id=t.id AND p.uid=u.id AND p.status=1
        ORDER BY p.create_time DESC
        LIMIT ${start},${pageSize}`
    }else{
      if(sid){
        //话题id为父级
        sql = `SELECT p.id,p.uid,u.name AS uname,u.avatar,p.title,p.content,p.md,p.create_time,p.update_time,p.pv,p.likes,p.collects,p.topic_id,t.name AS topic_name 
          FROM post AS p,user AS u,topic AS t,topic AS parent 
          WHERE p.topic_id=t.id AND p.uid=u.id AND parent.id=${topicId} AND t.sid=parent.id AND p.status=1
          ORDER BY p.create_time DESC
          LIMIT ${start},${pageSize}`
      }else{
        //话题id为子级
        sql = `SELECT p.id,p.uid,u.name AS uname,u.avatar,p.title,p.content,p.md,p.create_time,p.update_time,p.pv,p.likes,p.collects,p.topic_id,t.name AS topic_name 
          FROM post AS p,user AS u,topic AS t 
          WHERE p.topic_id=t.id AND p.uid=u.id AND t.id=${topicId} AND p.status=1
          ORDER BY p.create_time DESC
          LIMIT ${start},${pageSize}`
      }
    }
    let result = await db.query(sql)
    if(Array.isArray(result) && result.length > 0){
      return result
    }
    return false
  },

  //管理运营获取帖子数据（页数，数目，话题id）
  async getPostListForAdmin(pageNum=1,pageSize=20,topicId=0,sid){
    let start = (pageNum-1)*pageSize
    let sql
    if(topicId === 0){
      sql = `SELECT p.id,p.uid,u.name AS uname,u.avatar,p.title,p.content,p.md,p.create_time,p.update_time,p.pv,p.likes,p.collects,p.topic_id,t.name AS topic_name,p.status 
        FROM post AS p,user AS u,topic AS t 
        WHERE p.topic_id=t.id AND p.uid=u.id
        ORDER BY p.create_time DESC
        LIMIT ${start},${pageSize}`
    }else{
      if(sid){
        //话题id为父级
        sql = `SELECT p.id,p.uid,u.name AS uname,u.avatar,p.title,p.content,p.md,p.create_time,p.update_time,p.pv,p.likes,p.collects,p.topic_id,t.name AS topic_name 
          FROM post AS p,user AS u,topic AS t,topic AS parent 
          WHERE p.topic_id=t.id AND p.uid=u.id AND parent.id=${topicId} AND t.sid=parent.id
          ORDER BY p.create_time DESC
          LIMIT ${start},${pageSize}`
      }else{
        //话题id为子级
        sql = `SELECT p.id,p.uid,u.name AS uname,u.avatar,p.title,p.content,p.md,p.create_time,p.update_time,p.pv,p.likes,p.collects,p.topic_id,t.name AS topic_name 
          FROM post AS p,user AS u,topic AS t 
          WHERE p.topic_id=t.id AND p.uid=u.id AND t.id=${topicId}
          ORDER BY p.create_time DESC
          LIMIT ${start},${pageSize}`
      }
    }
    let result = await db.query(sql)
    if(Array.isArray(result) && result.length > 0){
      return result
    }
    return false
  },

  //新增帖子数据
  async addPost(data){
    let sql = 'INSERT INTO post(uid,title,content,md,create_time,update_time,topic_id) VALUES(?,?,?,?,?,?,?)'
    let values = [
      global.uid,
      data.title,
      data.content,
      data.md,
      util.changeTimeToStr(new Date()),
      util.changeTimeToStr(new Date()),
      data.topic_id
    ]
    let result = await db.query(sql, [...values])
    if(result.insertId){
      return result.insertId
    }
    return false
  },

  //删除帖子数据
  async deletePost(id){
    let sql = 'UPDATE post SET status=0 WHERE id=?'
    let result = await db.query(sql, [id])
    if(result.affectedRows){
      return true
    }
    return false
  },

  //获取帖子信息(根据id)
  async getPost(id){
    let sql = `SELECT p.id,p.uid,u.name AS uname,u.avatar,p.title,p.content,p.md,p.create_time,p.update_time,p.pv,p.likes,p.collects,p.topic_id,t.name AS topic_name,p.status 
      FROM post AS p,user AS u,topic AS t 
      WHERE p.topic_id=t.id AND p.uid=u.id AND p.id=?`
    let result = await db.query(sql, [id])
    if(Array.isArray(result) && result.length > 0){
      return result[0]
    }
    return false
  },

  //修改帖子信息
  async updatePost(id, data){
    let sql = 'UPDATE post SET title=?,content=?,md=?,update_time=? WHERE id=?'
    let values = [
      data.title,
      data.content,
      data.md,
      util.changeTimeToStr(new Date())
    ]
    let result = await db.query(sql, [...values, id])
    if(result.affectedRows){
      return true
    }
    return false
  },

  //增加帖子阅读量
  async addPV(id){
    let sql = 'UPDATE post SET pv=pv+1 WHERE id=?'
    let result = await db.query(sql, [id])
    if(result){
      return true
    }
    return false
  },

  //修改帖子点赞数（increase为加一，decrease为减一）
  async updateLikes(id, action){
    let sql
    if(action == 'increase'){
      sql = 'UPDATE post SET likes=likes+1 WHERE id=?'
    }else{
      sql = 'UPDATE post SET likes=likes-1 WHERE id=?'
    }
    let result = await db.query(sql, [id])
    if(result){
      return true
    }
    return false
  },

  //修改帖子收藏数（increase为加一，decrease为减一）
  async updateCollects(id, action){
    let sql
    if(action == 'increase'){
      sql = 'UPDATE post SET collects=collects+1 WHERE id=?'
    }else{
      sql = 'UPDATE post SET collects=collects-1 WHERE id=?'
    }
    let result = await db.query(sql, [id])
    if(result){
      return true
    }
    return false
  }

}

module.exports = post