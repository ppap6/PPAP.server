/*
 * @Author: jwchan1996
 * @Date: 2019-05-21 20:00:06
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-06-29 11:55:00
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
 
  //获取话题列表
  async getTopicList(pageNum, pageSize){
    //获取一级话题
    let topicList = await topicModel.getTopicList(pageNum, pageSize)
    if(topicList){
      //获取子级话题
      for(let i=0; i<topicList.length; i++){
        let childTopicList = await topicModel.getChildTopicList(topicList[i].id)
        if(childTopicList){
          topicList[i].child = childTopicList
        }else{
          topicList[i].child = []
        }
      }
      return {
        status: 200,
        message: topicList
      }
    }else{
      return {
        status: 10003,
        message: '未找到操作对象'
      }
    }
  },

  //添加话题
  async addTopic(data){
    let result = await topicModel.addTopic(data)
    if(result){
      return {
        status: 200,
        message: '添加成功'
      }
    }
    return {
      status: 10000,
      message: '操作失败'
    }
  },

  //获取话题信息
  async getTopic(id){
    let topic = await topicModel.getTopic(id)
    if(topic){
      return {
        status: 200,
        message: topic
      }
    }
    return {
      status: 10003,
      message: '未找到操作对象'
    }
  },

  //删除话题
  async deleteTopic(id){
    let exist = await topicModel.getTopic(id)
    if(exist){
      let result = await topicModel.deleteTopic(id)
      if(result){
        return {
          status: 200,
          message: '操作成功'
        }
      }else{
        return {
          status: 10000,
          message: '操作失败'
        }
      } 
    }else{
      return {
        status: 10003,
        message: '未找到操作对象'
      }
    }
  },
   
}
 
module.exports = topic