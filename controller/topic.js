/*
 * @Author: jwchan1996
 * @Date: 2019-05-21 19:56:04
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-06-28 11:11:52
 */

const topicService = require('../service/topic')

const topic = {

  //获取话题列表
  async getTopicList(ctx){
    let pageNum = ctx.query.page_num === undefined ? 1 : parseInt(ctx.query.page_num)
    let pageSize = ctx.query.page_size === undefined ? 20 : parseInt(ctx.query.page_size)
    let topics = await topicService.getTopicList(pageNum, pageSize)
    ctx.body = topics
  }

}

module.exports = topic