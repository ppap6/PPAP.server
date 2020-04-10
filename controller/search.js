/*
 * @Author: jwchan1996
 * @Date: 2019-10-25 10:25:00
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-10-25 10:25:00
 */

const searchService = require('../service/search')
const util = require('../util')

const search = {

  //获取帖子列表（分词）
  async getPostList(ctx){
    //验证数据
    let paramList = ['keyword']
    if(!util.checkParamExist(paramList, ctx.query)){
      ctx.body = {
        status: 10002,
        message: '非法参数'
      }
      return
    }
    let pageNum = ctx.query.page_num === undefined ? 1 : parseInt(ctx.query.page_num)
    let pageSize = ctx.query.page_size === undefined ? 20 : parseInt(ctx.query.page_size)
    let keyword = ctx.query.keyword === undefined ? ' ' : ctx.query.keyword
    let searchs = await searchService.getPostList(keyword, pageNum, pageSize)
    ctx.body = searchs
  },

  //获取帖子列表（分字）
  async getPostListByChar(ctx){
    //验证数据
    let paramList = ['keyword']
    if(!util.checkParamExist(paramList, ctx.query)){
      ctx.body = {
        status: 10002,
        message: '非法参数'
      }
      return
    }
    let pageNum = ctx.query.page_num === undefined ? 1 : parseInt(ctx.query.page_num)
    let pageSize = ctx.query.page_size === undefined ? 20 : parseInt(ctx.query.page_size)
    let keyword = ctx.query.keyword === undefined ? ' ' : ctx.query.keyword
    let searchs = await searchService.getPostListByChar(keyword, pageNum, pageSize)
    ctx.body = searchs
  },

  //获取帖子列表（索引）
  async getPostListByIndex(ctx){
    //验证数据
    let paramList = ['keyword']
    if(!util.checkParamExist(paramList, ctx.query)){
      ctx.body = {
        status: 10002,
        message: '非法参数'
      }
      return
    }
    let pageNum = ctx.query.page_num === undefined ? 1 : parseInt(ctx.query.page_num)
    let pageSize = ctx.query.page_size === undefined ? 20 : parseInt(ctx.query.page_size)
    let keyword = ctx.query.keyword === undefined ? ' ' : ctx.query.keyword
    let searchs = await searchService.getPostListByIndex(keyword, pageNum, pageSize)
    ctx.body = searchs
  },

  //获取用户列表（分词）
  async getUserList(ctx){
    //验证数据
    let paramList = ['keyword']
    if(!util.checkParamExist(paramList, ctx.query)){
      ctx.body = {
        status: 10002,
        message: '非法参数'
      }
      return
    }
    let pageNum = ctx.query.page_num === undefined ? 1 : parseInt(ctx.query.page_num)
    let pageSize = ctx.query.page_size === undefined ? 20 : parseInt(ctx.query.page_size)
    let keyword = ctx.query.keyword === undefined ? ' ' : ctx.query.keyword
    let searchs = await searchService.getUserList(keyword, pageNum, pageSize)
    ctx.body = searchs
  },

  //获取用户列表（分字）
  async getUserListByChar(ctx){
    //验证数据
    let paramList = ['keyword']
    if(!util.checkParamExist(paramList, ctx.query)){
      ctx.body = {
        status: 10002,
        message: '非法参数'
      }
      return
    }
    let pageNum = ctx.query.page_num === undefined ? 1 : parseInt(ctx.query.page_num)
    let pageSize = ctx.query.page_size === undefined ? 20 : parseInt(ctx.query.page_size)
    let keyword = ctx.query.keyword === undefined ? ' ' : ctx.query.keyword
    let searchs = await searchService.getUserListByChar(keyword, pageNum, pageSize)
    ctx.body = searchs
  }

}

module.exports = search