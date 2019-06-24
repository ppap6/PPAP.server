/*
 * @Author: jwchan1996
 * @Date: 2019-05-21 19:56:04
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-06-24 23:28:00
 */

const userCode = require('../code/user')
const userService = require('../service/user')

const user = {
  async getAllUser(ctx){
    let pageNum = ctx.request.query.page_num === undefined ? 1 : ctx.request.query.page_num
    let pageSize = ctx.request.query.page_size === undefined ? 20 : ctx.request.query.page_size
    let users = await userService.getAllUser(pageNum, pageSize)
    ctx.body = users
  }
}

module.exports = user