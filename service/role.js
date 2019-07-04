/*
 * @Author: jwchan1996
 * @Date: 2019-07-01 23:33:02
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-07-05 00:07:01
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
const roleModel = require('../model/role')

const role ={

  //获取角色列表
  async getRoleList(pageNum, pageSize){
    let roleList = await roleModel.getRoleList(pageNum, pageSize)
    if(roleList){
      return {
        status: 200,
        message: roleList
      }
    }
    return {
      status: 10003,
      message: '未找到操作对象'
    }
  },

  //添加角色
  async addRole(data){
    let result = await roleModel.addRole(data)
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

  //获取角色信息
  async getRole(id){
    let role = await roleModel.getRole(id)
    if(role){
      return {
        status: 200,
        message: role
      }
    }
    return {
      status: 10003,
      message: '未找到操作对象'
    }
  },

  //删除角色
  async deleteRole(id){
    let exist = await roleModel.getRole(id)
    if(exist){
      let result = await roleModel.deleteRole(id)
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

  //修改角色信息
  async updateRole(id, data){
    let exist = await roleModel.getRole(id)
    if(exist){
      let result = await roleModel.updateRole(id, data)
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

  //获取角色权限
  async getRoleAccess(id){
    let roleAccess = await roleModel.getRoleAccess(id)
    if(roleAccess){
      return {
        status: 200,
        message: roleAccess
      }
    }
    return {
      status: 10003,
      message: '未找到操作对象'
    }
  },
  
}

module.exports = role