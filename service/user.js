/*
 * @Author: jwchan1996
 * @Date: 2019-05-21 20:00:06
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-06-10 11:27:26
 */
const userModel = require('../model/user')

const user ={
  async getAllUser(){
    return await userModel.getAllUser()
  }
}

module.exports = user