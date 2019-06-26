/*
 * @Author: jwchan1996
 * @Date: 2019-05-21 20:00:06
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-06-27 00:22:10
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
const userModel = require('../model/user')

const user = {

  //获取所有用户
  async getUserList(pageNum, pageSize){
    return await userModel.getUserList(pageNum, pageSize)
  },

  //添加用户
  async addUser(data){
    return await userModel.addUser(data)
  },

  //删除用户
  async deleteUser(id){
    return await userModel.deleteUser(id)
  },

  //获取用户信息
  async getUser(id){
    return await userModel.getUser(id)
  },

  //修改用户信息
  async updateUser(id, data){
    let exist = await userModel.getUser(id)
    if(exist){
      let result = await userModel.updateUser(id, data)
      if(result){
        return true
      }else{
        return false
      }
    }else{
      return false
    }
  },

  //用户登录
  async login(data){
    let exist = await userModel.getUserByAccount(data.account)
    if(exist){
      let result = await userModel.login(data.account, data.password)
      if(result){
        return {
          status: 200,
          message: '登录成功'
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

module.exports = user