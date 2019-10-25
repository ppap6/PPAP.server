/*
 * @Author: jwchan1996
 * @Date: 2019-10-25 10:25:00
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-10-25 10:25:00
 */

const searchService = require('../service/search')

const search = {

  //获取帖子列表
  async getPostList(ctx){
    let pageNum = ctx.query.page_num === undefined ? 1 : parseInt(ctx.query.page_num)
    let pageSize = ctx.query.page_size === undefined ? 20 : parseInt(ctx.query.page_size)
    let keyword = ctx.query.keyword === undefined ? ' ' : ctx.query.keyword
    let searchs = await searchService.getPostList(keyword, pageNum, pageSize)
    ctx.body = searchs
  },

  //获取用户列表
  async getUserList(ctx){
    let pageNum = ctx.query.page_num === undefined ? 1 : parseInt(ctx.query.page_num)
    let pageSize = ctx.query.page_size === undefined ? 20 : parseInt(ctx.query.page_size)
    let keyword = ctx.query.keyword === undefined ? ' ' : ctx.query.keyword
    let searchs = await searchService.getUserList(keyword, pageNum, pageSize)
    ctx.body = searchs
  }

}

module.exports = search