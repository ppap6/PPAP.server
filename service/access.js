/*
 * @Author: jwchan1996
 * @Date: 2019-07-02 23:41:39
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-07-03 09:51:25
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
const accessModel = require('../model/access')
const userModel = require('../model/user')

const access ={
 
  //获取权限列表
  async getAccessList(pageNum, pageSize){
    //获取角色权限
    let roleId = await userModel.getRoleId()
    //验证身份权限
    if(roleId > 1){
      return {
        status: 10004,
        message: '没有操作权限'
      }
    }
    let accessList = await accessModel.getAccessList(pageNum, pageSize)
    if(accessList){
      //获取子级权限
      for(let i=0; i<accessList.list.length; i++){
        let childAccessList = await accessModel.getChildAccessList(accessList.list[i].id)
        if(childAccessList){
          accessList.list[i].child = childAccessList
        }else{
          accessList.list[i].child = []
        }
      }
      return {
        status: 200,
        message: accessList
      }
    }
    return {
      status: 10003,
      message: '未找到操作对象'
    }
  },

   //添加权限
  async addAccess(data){
    //获取角色权限
    let roleId = await userModel.getRoleId()
    //验证身份权限
    if(roleId > 1){
      return {
        status: 10004,
        message: '没有操作权限'
      }
    }
    let result = await accessModel.addAccess(data)
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

  //获取权限信息
  async getAccess(id){
    //获取角色权限
    let roleId = await userModel.getRoleId()
    //验证身份权限
    if(roleId > 1){
      return {
        status: 10004,
        message: '没有操作权限'
      }
    }
    let access = await accessModel.getAccess(id)
    if(access){
      return {
        status: 200,
        message: access
      }
    }
    return {
      status: 10003,
      message: '未找到操作对象'
    }
  },

  //删除权限
  async deleteAccess(id){
    //获取角色权限
    let roleId = await userModel.getRoleId()
    //验证身份权限
    if(roleId > 1){
      return {
        status: 10004,
        message: '没有操作权限'
      }
    }
    let access = await accessModel.getAccess(id)
    if(access){
      let result = await accessModel.deleteAccess(id)
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

  //修改权限信息
  async updateAccess(id, data){
    //获取角色权限
    let roleId = await userModel.getRoleId()
    //验证身份权限
    if(roleId > 1){
      return {
        status: 10004,
        message: '没有操作权限'
      }
    }
    let access = await accessModel.getAccess(id)
    if(access){
      let result = await accessModel.updateAccess(id, data)
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

module.exports = access