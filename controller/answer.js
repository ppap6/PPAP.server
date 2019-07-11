/*
 * @Author: jwchan1996
 * @Date: 2019-07-12 00:20:53
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-07-12 00:24:17
 */

const answerService = require('../service/answer')

const answer = {

  //获取评论回复列表
  async getAnswerList(ctx){
    let pageNum = ctx.query.page_num === undefined ? 1 : parseInt(ctx.query.page_num)
    let pageSize = ctx.query.page_size === undefined ? 20 : parseInt(ctx.query.page_size)
    let commentId = ctx.params.id === undefined ? 0 : ctx.params.id
    let answers = await answerService.getAnswerList(pageNum, pageSize, commentId)
    ctx.body = answers
  },

}

module.exports = answer