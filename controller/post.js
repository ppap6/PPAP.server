/*
 * @Author: jwchan1996
 * @Date: 2019-05-21 19:56:04
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-06-19 23:30:02
 */

const userCode = require('../code/user')
const postService = require('../service/post')

const post = {
  async getPostList(ctx){
    let postList = await postService.getPostList()
    ctx.body = postList
  }
}

module.exports = post