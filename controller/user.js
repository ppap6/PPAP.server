/*
 * @Author: jwchan1996
 * @Date: 2019-05-21 19:56:04
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-06-10 11:34:25
 */

const userCode = require('../code/user')
const userService = require('../service/user')

const user = {
  async getAllUser(ctx){
    let users = await userService.getAllUser()
    ctx.body = users
  }
}

module.exports = user