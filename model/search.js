/*
 * @Author: jwchan1996
 * @Date: 2019-10-25 10:25:00
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-10-25 10:25:00
 */

const db = require('../util/db')

const search = {

  //获取帖子列表（关键词，页数，数目）
  async getPostList(keyword=' ', pageNum=1, pageSize=20){
    let start = (pageNum-1)*pageSize
    let sql
    if(keyword === ' '){
      sql = `SELECT p.id,p.uid,u.name AS uname,u.avatar,p.title,p.content,p.create_time,p.update_time,p.pv,p.likes,p.collects,p.topic_id,t.name AS topic_name 
        FROM post AS p,user AS u,topic AS t 
        WHERE p.topic_id=t.id AND p.uid=u.id
        ORDER BY p.create_time DESC
        LIMIT ${start},${pageSize}`
    }else{
      let keywordArr = keyword.trim().split(' ')
      let likeStr = ''
      for(let i=0; i<keywordArr.length; i++){
        if(i == 0){
          likeStr = `p.title LIKE '%${keywordArr[0]}%'`
        }else{
          if(keywordArr[i] == '') continue
          likeStr += ` OR p.title LIKE '%${keywordArr[i]}%'`
        }
      }
      sql = `SELECT p.id,p.uid,u.name AS uname,u.avatar,p.title,p.content,p.create_time,p.update_time,p.pv,p.likes,p.collects,p.topic_id,t.name AS topic_name 
        FROM post AS p,user AS u,topic AS t 
        WHERE p.topic_id=t.id AND p.uid=u.id AND (${likeStr})
        ORDER BY p.likes DESC
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
    let start = (pageNum-1)*pageSize
    let sql
    if(keyword === ' '){
      sql = `SELECT u.id,u.name,u.account,u.avatar,u.sex FROM user AS u LIMIT ${start},${pageSize}`
    }else{
      let keywordArr = keyword.trim().split(' ')
      let likeStr = ''
      for(let i=0; i<keywordArr.length; i++){
        if(i == 0){
          likeStr = `u.name LIKE '%${keywordArr[0]}%'`
        }else{
          if(keywordArr[i] == '') continue
          likeStr += ` OR u.name LIKE '%${keywordArr[i]}%'`
        }
      }
      sql = `SELECT u.id,u.name,u.account,u.avatar,u.sex 
             FROM user AS u 
             WHERE (${likeStr})
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