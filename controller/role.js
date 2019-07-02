/*
 * @Author: jwchan1996
 * @Date: 2019-07-01 23:30:23
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-07-02 00:14:17
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

  //获取角色信息
  async getRole(ctx){
    let result = await roleService.getRole(ctx.params.id)
    ctx.body = result
  },

  //删除角色
  async deleteRole(ctx){
    //验证身份
    let result = await roleService.deleteRole(ctx.params.id)
    ctx.body = result
  },

}

module.exports = role