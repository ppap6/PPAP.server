/*
 * @Author: jwchan1996
 * @Date: 2019-07-02 23:39:42
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-07-02 23:56:27
 */

const accessService = require('../service/access')

const access = {

  //获取权限列表
  async getAccessList(ctx){
    let pageNum = ctx.query.page_num === undefined ? 1 : parseInt(ctx.query.page_num)
    let pageSize = ctx.query.page_size === undefined ? 20 : parseInt(ctx.query.page_size)
    let accesses = await accessService.getAccessList(pageNum, pageSize)
    ctx.body = accesses
  },

  //添加权限
  async addAccess(ctx){
    //验证数据
    let result = await accessService.addAccess(ctx.request.body)
    ctx.body = result
  },

}

module.exports = access