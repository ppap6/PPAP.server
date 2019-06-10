/*
 * @Author: jwchan1996
 * @Date: 2019-05-21 19:56:04
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-06-10 14:50:44
 */

const userCode = require('../code/user')
const postService = require('../service/post')

const post = {
  async getPostComment(ctx){
    let comments = await postService.getPostComment()
    ctx.body = comments
  }
}

module.exports = post