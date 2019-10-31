/*
 * @Author: jwchan1996
 * @Date: 2019-07-02 23:39:42
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-07-03 09:50:35
 */

const accessService = require('../service/access')
const util = require('../util')

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
    let paramList = ['sid', 'name', 'code', 'description']
    if(!util.checkParamExist(paramList, ctx.request.body)){
      ctx.body = {
        status: 10002,
        message: '非法参数'
      }
      return
    }
    let result = await accessService.addAccess(ctx.request.body)
    ctx.body = result
  },

  //获取权限信息
  async getAccess(ctx){
    let result = await accessService.getAccess(ctx.params.id)
    ctx.body = result
  },

  //删除权限
  async deleteAccess(ctx){
    //验证身份
    let result = await accessService.deleteAccess(ctx.params.id)
    ctx.body = result
  },

  //修改权限信息
  async updateAccess(ctx){
    //验证数据
    let paramList = ['sid', 'name', 'code', 'description']
    if(!util.checkParamExist(paramList, ctx.request.body)){
      ctx.body = {
        status: 10002,
        message: '非法参数'
      }
      return
    }
    let result = await accessService.updateAccess(ctx.params.id, ctx.request.body)
    ctx.body = result
  }

}

module.exports = access