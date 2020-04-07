/*
 * @Author: jwchan1996
 * @Date: 2019-10-25 10:25:00
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-10-25 10:25:00
 */

const db = require('../util/db')
const { Segment, useDefault } = require('segmentit')
const segmentit = useDefault(new Segment())

const search = {

  //获取帖子列表（关键词，页数，数目）
  async getPostList(keyword=' ', pageNum=1, pageSize=20){
    let start = (pageNum-1) * pageSize
    let sql
    if(keyword === ' '){
      sql = `SELECT p.id, p.uid, u.name AS uname, u.avatar, p.title, p.content, p.md, p.create_time, p.update_time, p.pv, p.likes, p.collects, p.topic_id, t.name AS topic_name 
        FROM post AS p, user AS u, topic AS t 
        WHERE p.topic_id=t.id AND p.uid=u.id
        ORDER BY p.create_time DESC
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
      sql = `SELECT p.id, p.uid, u.name AS uname, u.avatar, p.title, p.content, p.md, p.create_time, p.update_time, p.pv, p.likes, p.collects, (CASE ${cond} END)+(p.pv/100 + p.likes + p.collects*2) AS similarity, (p.pv/100 + p.likes + p.collects*2) AS hots, p.topic_id, t.name AS topic_name 
        FROM post AS p, user AS u, topic AS t 
        WHERE p.topic_id=t.id AND p.uid=u.id AND (${likeStr})
        ORDER BY similarity DESC
        LIMIT ${start},${pageSize}`
    }
    let result = await db.query(sql)
    if(Array.isArray(result) && result.length > 0){
      return result
    }
    return false
  },

  //获取用户列表（关键词，页数，数目）
  async getUserList(keyword=' ', pageNum=1, pageSize=20){
    let start = (pageNum-1) * pageSize
    let sql
    if(keyword === ' '){
      sql = `SELECT u.id, u.name, u.account, u.avatar, u.sex FROM user AS u ORDER BY u.id ASC LIMIT ${start},${pageSize}`
    }else{
      let keywordArr = segmentit.doSegment(keyword).map(i => i.w)
      let likeStr = ''
      let cond = ''
      let index = 99
      for(let i=0; i<keywordArr.length; i++){
        if(i == 0){
          likeStr = `u.name LIKE '%${keywordArr[0]}%'`
          cond += ` WHEN u.name='${keywordArr[0]}' THEN ${index-1}`
          cond += ` WHEN u.name LIKE '${keywordArr[0]}%' THEN ${index-2}`
          cond += ` WHEN u.name LIKE '%${keywordArr[0]}%' THEN ${index-3}`
          cond += ` WHEN u.name LIKE '%${keywordArr[0]}' THEN ${index-4}`
          index -= 4
        }else{
          if(keywordArr[i] == '') continue
          likeStr += ` OR u.name LIKE '%${keywordArr[i]}%'`
          cond += ` WHEN u.name='${keywordArr[i]}' THEN ${index-1}`
          cond += ` WHEN u.name LIKE '${keywordArr[i]}%' THEN ${index-2}`
          cond += ` WHEN u.name LIKE '%${keywordArr[i]}%' THEN ${index-3}`
          cond += ` WHEN u.name LIKE '%${keywordArr[i]}' THEN ${index-4}`
          index -= 4
        }
      }
      sql = `SELECT u.id, u.name, u.account, u.avatar, u.sex, (CASE ${cond} END) AS similarity 
             FROM user AS u 
             WHERE (${likeStr})
             ORDER BY similarity DESC
             LIMIT ${start},${pageSize}`
    }
    let result = await db.query(sql)
    if(Array.isArray(result) && result.length > 0){
      return result
    }
    return false
  },

}

module.exports = search