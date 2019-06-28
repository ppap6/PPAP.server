/*
 * @Author: jwchan1996
 * @Date: 2019-05-21 20:00:06
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-06-28 11:18:53
 */

 /**
  * 200 操作成功
  * 10000操作失败
  * 10001未登陆授权
  * 10002非法参数
  * 10003未找到操作对象
  * 10004没有操作权限
  * 10005数据库错误
  */
 const topicModel = require('../model/topic')

 const topic ={
 
   //获取帖子列表
   async getTopicList(pageNum, pageSize){
     return await topicModel.getTopicList(pageNum, pageSize)
   }
   
 }
 
 module.exports = topic