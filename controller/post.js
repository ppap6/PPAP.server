/*
 * @Author: jwchan1996
 * @Date: 2019-05-21 19:56:04
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-06-27 00:15:30
 */

const userCode = require('../code/user')
const postService = require('../service/post')

const post = {

  //获取帖子列表
  async getPostList(ctx){
    let pageNum = ctx.query.page_num === undefined ? 1 : parseInt(ctx.query.page_num)
    let pageSize = ctx.query.page_size === undefined ? 20 : parseInt(ctx.query.page_size)
    let topicId = ctx.query.topic_id === undefined ? 0 : parseInt(ctx.query.topic_id)
    let posts = await postService.getPostList(pageNum, pageSize, topicId)
    ctx.body = posts
  },

  //添加帖子
  async addPost(ctx){

  }

}

module.exports = post