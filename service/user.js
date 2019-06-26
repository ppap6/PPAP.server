/*
 * @Author: jwchan1996
 * @Date: 2019-05-21 20:00:06
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-06-26 10:33:51
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
  }
  
}

module.exports = user