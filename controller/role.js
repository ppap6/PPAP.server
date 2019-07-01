/*
 * @Author: jwchan1996
 * @Date: 2019-07-01 23:30:23
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-07-01 23:32:50
 */

const roleService = require('../service/role')

const role = {

  //获取角色列表
  async getRoleList(ctx){
    let pageNum = ctx.query.page_num === undefined ? 1 : parseInt(ctx.query.page_num)
    let pageSize = ctx.query.page_size === undefined ? 20 : parseInt(ctx.query.page_size)
    let roles = await roleService.getRoleList(pageNum, pageSize)
    ctx.body = roles
  },

}

module.exports = role