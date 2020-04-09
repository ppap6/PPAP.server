/*
 * @Author: jwchan1996
 * @Date: 2019-10-25 10:25:00
 * @LastEditors  : jwchan1996
 * @LastEditTime : 2020-01-03 15:51:30
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
const searchModel = require('../model/search')

const search ={
 
  //获取帖子列表
  async getPostList(keyword, pageNum, pageSize){
    let postList = await searchModel.getPostList(keyword, pageNum, pageSize)
    if(postList){
      return {
        status: 200,
        message: postList
      }
    }
    return {
      status: 10003,
      message: '未找到操作对象'
    }
  },
 
  //获取帖子列表（索引）
  async getPostListByIndex(keyword, pageNum, pageSize){
    let postList = await searchModel.getPostListByIndex(keyword, pageNum, pageSize)
    if(postList){
      return {
        status: 200,
        message: postList
      }
    }
    return {
      status: 10003,
      message: '未找到操作对象'
    }
  },
  
  //获取用户列表
  async getUserList(keyword, pageNum, pageSize){
    let userList = await searchModel.getUserList(keyword, pageNum, pageSize)
    if(userList){
      return {
        status: 200,
        message: userList
      }
    }
    return {
      status: 10003,
      message: '未找到操作对象'
    }
  }
   
}
 
module.exports = search