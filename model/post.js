/*
 * @Author: jwchan1996
 * @Date: 2019-05-21 19:58:41
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-09-11 00:16:13
 */

const util = require('../util')
const db = require('../util/db')
const { Segment, useDefault } = require('segmentit')
const segmentit = useDefault(new Segment())

const post = {

  //获取帖子数据（页数，数目，话题id）
  async getPostList(pageNum=1, pageSize=20, topicId=0, sid){
    let start = (pageNum-1) * pageSize
    let countSql
    let sql
    if(topicId === 0){
      countSql = `SELECT COUNT(*)
        FROM post AS p, user AS u, topic AS t 
        WHERE p.topic_id=t.id AND p.uid=u.id AND p.status=1`
        
      sql = `SELECT p.id, p.uid, u.name AS uname, u.avatar, p.title, LEFT(p.content, 50) AS content, LEFT(p.md, 50) AS md, p.create_time, p.update_time, p.pv, p.likes, p.collects, p.comments, p.answers, p.topic_id, t.name AS topic_name 
        FROM post AS p, user AS u, topic AS t 
        WHERE p.topic_id=t.id AND p.uid=u.id AND p.status=1
        ORDER BY p.create_time DESC
        LIMIT ${start},${pageSize}`
    }else{
      if(sid){
        //话题id为父级
        countSql = `SELECT COUNT(*)
          FROM post AS p, user AS u, topic AS t, topic AS parent 
          WHERE p.topic_id=t.id AND p.uid=u.id AND parent.id=${topicId} AND t.sid=parent.id AND p.status=1`

        sql = `SELECT p.id, p.uid, u.name AS uname, u.avatar, p.title, LEFT(p.content, 50) AS content, LEFT(p.md, 50) AS md, p.create_time, p.update_time, p.pv, p.likes, p.collects, p.comments, p.answers, p.topic_id, t.name AS topic_name 
          FROM post AS p, user AS u, topic AS t, topic AS parent 
          WHERE p.topic_id=t.id AND p.uid=u.id AND parent.id=${topicId} AND t.sid=parent.id AND p.status=1
          ORDER BY p.create_time DESC
          LIMIT ${start},${pageSize}`
      }else{
        //话题id为子级
        countSql = `SELECT COUNT(*)
          FROM post AS p, user AS u, topic AS t 
          WHERE p.topic_id=t.id AND p.uid=u.id AND t.id=${topicId} AND p.status=1`

        sql = `SELECT p.id, p.uid, u.name AS uname, u.avatar, p.title, LEFT(p.content, 50) AS content, LEFT(p.md, 50) AS md, p.create_time, p.update_time, p.pv, p.likes, p.collects, p.comments, p.answers, p.topic_id, t.name AS topic_name 
          FROM post AS p, user AS u, topic AS t 
          WHERE p.topic_id=t.id AND p.uid=u.id AND t.id=${topicId} AND p.status=1
          ORDER BY p.create_time DESC
          LIMIT ${start},${pageSize}`
      }
    }
    let countResult = await db.query(countSql)
    let result = await db.query(sql)
    if(Array.isArray(result) && result.length > 0){
      return {
        page_num: pageNum,
        page_size: pageSize,
        total: countResult[0]['COUNT(*)'],
        list: result
      }
    }
    return false
  },

  //管理运营获取帖子数据（页数，数目，话题id）
  async getPostListForAdmin(pageNum=1, pageSize=20, topicId=0, sid){
    let start = (pageNum-1) * pageSize
    let countSql
    let sql
    if(topicId === 0){
      countSql = `SELECT COUNT(*)
        FROM post AS p, user AS u, topic AS t 
        WHERE p.topic_id=t.id AND p.uid=u.id`

      sql = `SELECT p.id, p.uid, u.name AS uname, u.avatar, p.title, LEFT(p.content, 50) AS content, LEFT(p.md, 50) AS md, p.create_time, p.update_time, p.pv, p.likes, p.collects, p.comments, p.answers, p.topic_id, t.name AS topic_name, p.status 
        FROM post AS p, user AS u, topic AS t 
        WHERE p.topic_id=t.id AND p.uid=u.id
        ORDER BY p.create_time DESC
        LIMIT ${start},${pageSize}`
    }else{
      if(sid){
        //话题id为父级
        countSql = `SELECT COUNT(*)
          FROM post AS p, user AS u, topic AS t, topic AS parent 
          WHERE p.topic_id=t.id AND p.uid=u.id AND parent.id=${topicId} AND t.sid=parent.id`

        sql = `SELECT p.id, p.uid, u.name AS uname, u.avatar, p.title, LEFT(p.content, 50) AS content, LEFT(p.md, 50) AS md, p.create_time, p.update_time, p.pv, p.likes, p.collects, p.comments, p.answers, p.topic_id, t.name AS topic_name, p.status 
          FROM post AS p, user AS u, topic AS t, topic AS parent 
          WHERE p.topic_id=t.id AND p.uid=u.id AND parent.id=${topicId} AND t.sid=parent.id
          ORDER BY p.create_time DESC
          LIMIT ${start},${pageSize}`
      }else{
        //话题id为子级
        countSql = `SELECT COUNT(*)
          FROM post AS p, user AS u, topic AS t 
          WHERE p.topic_id=t.id AND p.uid=u.id AND t.id=${topicId}`

        sql = `SELECT p.id, p.uid, u.name AS uname, u.avatar, p.title, LEFT(p.content, 50) AS content, LEFT(p.md, 50) AS md, p.create_time, p.update_time, p.pv, p.likes, p.collects, p.comments, p.answers, p.topic_id, t.name AS topic_name, p.status 
          FROM post AS p, user AS u, topic AS t 
          WHERE p.topic_id=t.id AND p.uid=u.id AND t.id=${topicId}
          ORDER BY p.create_time DESC
          LIMIT ${start},${pageSize}`
      }
    }
    let countResult = await db.query(countSql)
    let result = await db.query(sql)
    if(Array.isArray(result) && result.length > 0){
      return {
        page_num: pageNum,
        page_size: pageSize,
        total: countResult[0]['COUNT(*)'],
        list: result
      }
    }
    return false
  },

  //获取热门帖子数据（页数，数目，话题id）
  async getHotPostList(pageNum=1, pageSize=20, topicId=0, sid=false){
    let time1 = util.changeTimeToStr(new Date(new Date().setDate(new Date().getDate()-60)))
    let time2 = util.changeTimeToStr(new Date())
    let start = (pageNum-1) * pageSize
    let countSql
    let sql
    if(topicId === 0){
      countSql = `SELECT COUNT(*)
        FROM post AS p, user AS u, topic AS t 
        WHERE p.topic_id=t.id AND p.uid=u.id AND p.status=1 AND (p.create_time BETWEEN '${time1}' AND '${time2}')`

      sql = `SELECT p.id, p.uid, u.name AS uname, u.avatar, p.title, LEFT(p.content, 50) AS content, LEFT(p.md, 50) AS md, p.create_time, p.update_time, p.pv, p.likes, p.collects, p.comments, p.answers, (p.pv/100 + p.likes + p.collects*2 + p.comments + p.answers) AS hots, p.topic_id, t.name AS topic_name 
        FROM post AS p, user AS u, topic AS t 
        WHERE p.topic_id=t.id AND p.uid=u.id AND p.status=1 AND (p.create_time BETWEEN '${time1}' AND '${time2}')
        ORDER BY hots DESC
        LIMIT ${start},${pageSize}`
    }else{
      if(sid){
        //话题id为父级
        countSql = `SELECT COUNT(*)
          FROM post AS p, user AS u, topic AS t, topic AS parent 
          WHERE p.topic_id=t.id AND p.uid=u.id AND parent.id=${topicId} AND t.sid=parent.id AND p.status=1 AND (p.create_time BETWEEN '${time1}' AND '${time2}')`

        sql = `SELECT p.id, p.uid, u.name AS uname, u.avatar, p.title, LEFT(p.content, 50) AS content, LEFT(p.md, 50) AS md, p.create_time, p.update_time, p.pv, p.likes, p.collects, p.comments, p.answers, (p.pv/100 + p.likes + p.collects*2 + p.comments + p.answers) AS hots, p.topic_id, t.name AS topic_name 
          FROM post AS p, user AS u, topic AS t, topic AS parent 
          WHERE p.topic_id=t.id AND p.uid=u.id AND parent.id=${topicId} AND t.sid=parent.id AND p.status=1 AND (p.create_time BETWEEN '${time1}' AND '${time2}')
          ORDER BY hots DESC
          LIMIT ${start},${pageSize}`
      }else{
        //话题id为子级
        countSql = `SELECT COUNT(*)
          FROM post AS p, user AS u, topic AS t 
          WHERE p.topic_id=t.id AND p.uid=u.id AND t.id=${topicId} AND p.status=1 AND (p.create_time BETWEEN '${time1}' AND '${time2}')`

        sql = `SELECT p.id, p.uid, u.name AS uname, u.avatar, p.title, LEFT(p.content, 50) AS content, LEFT(p.md, 50) AS md, p.create_time, p.update_time, p.pv, p.likes, p.collects, p.comments, p.answers, (p.pv/100 + p.likes + p.collects*2 + p.comments + p.answers) AS hots, p.topic_id, t.name AS topic_name 
          FROM post AS p, user AS u, topic AS t 
          WHERE p.topic_id=t.id AND p.uid=u.id AND t.id=${topicId} AND p.status=1 AND (p.create_time BETWEEN '${time1}' AND '${time2}')
          ORDER BY hots DESC
          LIMIT ${start},${pageSize}`
      }
    }
    let countResult = await db.query(countSql)
    let result = await db.query(sql)
    if(Array.isArray(result) && result.length > 0){
      return {
        page_num: pageNum,
        page_size: pageSize,
        total: countResult[0]['COUNT(*)'],
        list: result
      }
    }
    return false
  },

  //获取推荐帖子数据（页数，数目，帖子标题）
  async getRecommendPostList(pageNum=1, pageSize=20, postId=0, keyword=''){
    let start = (pageNum-1) * pageSize
    let countSql
    let sql
    if(keyword === ' '){
      countSql = `SELECT COUNT(*)
        FROM post AS p, user AS u, topic AS t 
        WHERE p.topic_id=t.id AND p.uid=u.id AND p.id!=?`

      sql = `SELECT p.id, p.uid, u.name AS uname, u.avatar, p.title, LEFT(p.content, 50) AS content, LEFT(p.md, 50) AS md, p.create_time, p.update_time, p.pv, p.likes, p.collects, p.comments, p.answers, (p.pv/100 + p.likes + p.collects*2 + p.comments + p.answers) AS similarity, p.topic_id, t.name AS topic_name 
        FROM post AS p, user AS u, topic AS t 
        WHERE p.topic_id=t.id AND p.uid=u.id AND p.id!=?
        ORDER BY similarity DESC
        LIMIT ${start},${pageSize}`
    }else{
      let keywordArr = segmentit.doSegment(keyword).map(i => i.w)
      let likeStr = ''
      let cond = ''
      let index = 99
      for(let i=0; i<keywordArr.length; i++){
        if(i == 0){
          likeStr = `p.title LIKE '%${keywordArr[0]}%'`
          cond += ` WHEN p.title='${keywordArr[0]}' THEN ${index-1}`
          cond += ` WHEN p.title LIKE '${keywordArr[0]}%' THEN ${index-2}`
          cond += ` WHEN p.title LIKE '%${keywordArr[0]}%' THEN ${index-3}`
          cond += ` WHEN p.title LIKE '%${keywordArr[0]}' THEN ${index-4}`
          index -= 4
        }else{
          if(keywordArr[i] == '') continue
          likeStr += ` OR p.title LIKE '%${keywordArr[i]}%'`
          cond += ` WHEN p.title='${keywordArr[i]}' THEN ${index-1}`
          cond += ` WHEN p.title LIKE '${keywordArr[i]}%' THEN ${index-2}`
          cond += ` WHEN p.title LIKE '%${keywordArr[i]}%' THEN ${index-3}`
          cond += ` WHEN p.title LIKE '%${keywordArr[i]}' THEN ${index-4}`
          index -= 4
        }
      }
      countSql = `SELECT COUNT(*)
        FROM post AS p, user AS u, topic AS t 
        WHERE p.topic_id=t.id AND p.uid=u.id AND (${likeStr}) AND p.id!=?`

      sql = `SELECT p.id, p.uid, u.name AS uname, u.avatar, p.title, LEFT(p.content, 50) AS content, LEFT(p.md, 50) AS md, p.create_time, p.update_time, p.pv, p.likes, p.collects, p.comments, p.answers, (CASE ${cond} END)+(p.pv/100 + p.likes + p.collects*2 + p.comments + p.answers) AS similarity, (p.pv/100 + p.likes + p.collects*2 + p.comments + p.answers) AS hots, p.topic_id, t.name AS topic_name 
        FROM post AS p, user AS u, topic AS t 
        WHERE p.topic_id=t.id AND p.uid=u.id AND (${likeStr}) AND p.id!=?
        ORDER BY similarity DESC
        LIMIT ${start},${pageSize}`
    }
    let countResult = await db.query(countSql, [postId])
    let result = await db.query(sql, [postId])
    if(Array.isArray(result) && result.length > 0){
      return {
        page_num: pageNum,
        page_size: pageSize,
        total: countResult[0]['COUNT(*)'],
        list: result
      }
    }
    return false
  },

  //新增帖子数据
  async addPost(data){
    let sql = 'INSERT INTO post(uid, title, content, md, create_time, update_time, topic_id) VALUES(?, ?, ?, ?, ?, ?, ?)'
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
    let sql = `SELECT p.id, p.uid, u.name AS uname, u.avatar, p.title, p.content, p.md, p.create_time, p.update_time, p.pv, p.likes, p.collects, p.comments, p.answers, p.topic_id, t.name AS topic_name, p.status 
      FROM post AS p, user AS u, topic AS t 
      WHERE p.topic_id=t.id AND p.uid=u.id AND p.id=?`
    let result = await db.query(sql, [id])
    if(Array.isArray(result) && result.length > 0){
      return result[0]
    }
    return false
  },

  //修改帖子信息
  async updatePost(id, data){
    let sql = 'UPDATE post SET title=?, content=?, md=?, topic_id=?, update_time=? WHERE id=?'
    let values = [
      data.title,
      data.content,
      data.md,
      data.topic_id,
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

  //更新帖子最后回复时间
  async updatePostLastAnswerTime(id){
    let sql = 'UPDATE post SET last_answer_time=? WHERE id=?'
    let values = [
      util.changeTimeToStr(new Date())
    ]
    let result = await db.query(sql, [...values, id])
    if(result){
      return true
    }
    return false
  },

  //更新帖子统计
  async updatePostStatistics(id, action){
    /**
     * increaseLikes  增加点赞数
     * decreaseLikes  减少点赞数
     * increaseCollects  增加收藏数
     * decreaseCollects  减少收藏数
     * increaseComments  增加评论数
     * decreaseComments  减少评论数
     * increaseAnswers  增加回复数
     * decreaseAnswers  减少回复数
     */
    let sql = ''
    if(action == 'increaseLikes'){
      sql = 'UPDATE post SET likes=likes+1 WHERE id=?'
    }else if(action == 'decreaseLikes'){
      sql = 'UPDATE post SET likes=likes-1 WHERE id=?'
    }else if(action == 'increaseCollects'){
      sql = 'UPDATE post SET collects=collects+1 WHERE id=?'
    }else if(action == 'decreaseCollects'){
      sql = 'UPDATE post SET collects=collects-1 WHERE id=?'
    }else if(action == 'increaseComments'){
      sql = 'UPDATE post SET comments=comments+1 WHERE id=?'
    }else if(action == 'decreaseComments'){
      sql = 'UPDATE post SET comments=comments-1 WHERE id=?'
    }else if(action == 'increaseAnswers'){
      sql = 'UPDATE post SET answers=answers+1 WHERE id=?'
    }else if(action == 'decreaseAnswers'){
      sql = 'UPDATE post SET answers=answers-1 WHERE id=?'
    }else{
      return false
    }
    let result = await db.query(sql, [id])
    if(result){
      return true
    }
    return false
  },

}

module.exports = post