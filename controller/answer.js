/*
 * @Author: jwchan1996
 * @Date: 2019-07-12 00:20:53
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-07-15 23:51:24
 */

const answerService = require('../service/answer')
const util = require('../util')

const answer = {

  //获取评论回复列表
  async getAnswerList(ctx){
    let pageNum = ctx.query.page_num === undefined ? 1 : parseInt(ctx.query.page_num)
    let pageSize = ctx.query.page_size === undefined ? 20 : parseInt(ctx.query.page_size)
    let commentId = ctx.params.id === undefined ? 0 : ctx.params.id
    let answers = await answerService.getAnswerList(pageNum, pageSize, commentId)
    ctx.body = answers
  },

  //管理运营获取评论回复列表
  async getAnswerListForAdmin(ctx){
    let pageNum = ctx.query.page_num === undefined ? 1 : parseInt(ctx.query.page_num)
    let pageSize = ctx.query.page_size === undefined ? 20 : parseInt(ctx.query.page_size)
    let commentId = ctx.params.id === undefined ? 0 : ctx.params.id
    let answers = await answerService.getAnswerListForAdmin(pageNum, pageSize, commentId)
    ctx.body = answers
  },

  //添加评论回复
  async addAnswer(ctx){
    //验证数据
    let paramList = ['type', 'pid', 'comment_id', 'targetor_id', 'content']
    if(!util.checkParamExist(paramList, ctx.request.body)){
      ctx.body = {
        status: 10002,
        message: '非法参数'
      }
      return
    }
    let result = await answerService.addAnswer(ctx.request.body)
    ctx.body = result
  },

  //删除评论单条回复
  async deleteAnswer(ctx){
    //验证身份
    let result = await answerService.deleteAnswer(ctx.params.id)
    ctx.body = result
  },

  //获取评论单条回复信息
  async getAnswer(ctx){
    let result = await answerService.getAnswer(ctx.params.id)
    ctx.body = result
  },

  //修改评论回复信息
  async updateAnswer(ctx){
    let result = await answerService.updateAnswer(ctx.params.id, ctx.request.body)
    ctx.body = result
  }

}

module.exports = answer