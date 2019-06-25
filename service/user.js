/*
 * @Author: jwchan1996
 * @Date: 2019-05-21 20:00:06
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-06-25 23:54:45
 */
const userModel = require('../model/user')

const user = {

  //获取所有用户
  async getAllUser(pageNum, pageSize){
    return await userModel.getAllUser(pageNum, pageSize)
  },

  //添加用户
  async addUser(data){
    return await userModel.addUser(data)
  }
  
}

module.exports = user