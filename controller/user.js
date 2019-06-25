/*
 * @Author: jwchan1996
 * @Date: 2019-05-21 19:56:04
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-06-25 23:59:12
 */

const userCode = require('../code/user')
const userService = require('../service/user')

const user = {

  //获取用户列表
  async getUserList(ctx){
    let pageNum = ctx.query.page_num === undefined ? 1 : ctx.query.page_num
    let pageSize = ctx.query.page_size === undefined ? 20 : ctx.query.page_size
    let users = await userService.getUserList(pageNum, pageSize)
    ctx.body = users
  },

  //添加用户
  async addUser(ctx){
    //验证数据
    let result = await userService.addUser(ctx.request.body)
    ctx.body = result
  }
  
}

module.exports = user