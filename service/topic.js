/*
 * @Author: jwchan1996
 * @Date: 2019-05-21 20:00:06
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-09-24 00:26:39
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
const userModel = require('../model/user')

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

  //管理运营获取话题列表
  async getTopicListForAdmin(pageNum, pageSize){
    //获取角色权限
    let roleId = await userModel.getRoleId()
    //验证身份权限
    if(roleId > 3){
      return {
        status: 10004,
        message: '没有操作权限'
      }
    }
    //获取一级话题
    let topicList = await topicModel.getTopicListForAdmin(pageNum, pageSize)
    if(topicList){
      //获取子级话题
      for(let i=0; i<topicList.length; i++){
        let childTopicList = await topicModel.getChildTopicListForAdmin(topicList[i].id)
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
        status: 10008,
        message: '未找到操作对象'
      }
    }
  },

  //添加话题
  async addTopic(data){
    //获取角色权限
    let roleId = await userModel.getRoleId()
    //验证身份权限
    if(roleId > 3){
      return {
        status: 10004,
        message: '没有操作权限'
      }
    }
    let result = await topicModel.addTopic(data)
    if(result){
      return {
        status: 200,
        message: '操作成功'
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
      let sname = ''
      if(topic.sid){
          let stopic = await topicModel.getTopic(topic.sid)
          if(stopic){
              sname = stopic.name
          }
      }
      let newTopic = {
        id: topic.id,
        sid: topic.sid,
        sname: sname,
        name: topic.name,
        intro: topic.intro,
        icon: topic.icon,
        create_time: topic.create_time,
        update_time: topic.update_time,
        posts: topic.posts,
        followers: topic.followers,
        status: topic.status
      }
      return {
        status: 200,
        message: newTopic
      }
    }
    return {
      status: 10003,
      message: '未找到操作对象'
    }
  },

  //删除话题
  async deleteTopic(id){
    //获取角色权限
    let roleId = await userModel.getRoleId()
    //验证身份权限
    if(roleId > 2){
      return {
        status: 10004,
        message: '没有操作权限'
      }
    }
    let topic = await topicModel.getTopic(id)
    if(topic){
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

  //修改话题信息
  async updateTopic(id, data){
    //获取角色权限
    let roleId = await userModel.getRoleId()
    //验证身份权限
    if(roleId > 3){
      return {
        status: 10004,
        message: '没有操作权限'
      }
    }
    let topic = await topicModel.getTopic(id)
    if(topic){
      let result = await topicModel.updateTopic(id, data)
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
  }
   
}
 
module.exports = topic