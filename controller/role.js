/*
 * @Author: jwchan1996
 * @Date: 2019-07-01 23:30:23
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-07-02 00:00:26
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

  //添加角色
  async addRole(ctx){
    //验证数据
    let result = await roleService.addRole(ctx.request.body)
    ctx.body = result
  },

}

module.exports = role