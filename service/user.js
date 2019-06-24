/*
 * @Author: jwchan1996
 * @Date: 2019-05-21 20:00:06
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-06-24 23:28:31
 */
const userModel = require('../model/user')

const user ={
  async getAllUser(pageNum, pageSize){
    return await userModel.getAllUser(pageNum, pageSize)
  }
}

module.exports = user