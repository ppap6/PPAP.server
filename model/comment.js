/*
 * @Author: jwchan1996
 * @Date: 2019-07-07 23:35:31
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-07-07 23:51:19
 */

const util = require('../util')
const db_mongo = require('../util/db_mongo')

const comment = {

  //获取帖子评论数据（页数，数目，帖子id）
  async getCommentList(pageNum=1, pageSize=20, postId=0){
    let start = (pageNum-1)*pageSize
    let result = await db_mongo.find('comment', {
        pid: postId
    })
    if(Array.isArray(result) && result.length > 0){
      return result
    }
    return false
  },

}

module.exports = comment