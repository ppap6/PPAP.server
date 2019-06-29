/*
 * @Author: jwchan1996
 * @Date: 2019-05-21 19:56:04
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-06-29 11:58:05
 */

const topicService = require('../service/topic')

const topic = {

  //获取话题列表
  async getTopicList(ctx){
    let pageNum = ctx.query.page_num === undefined ? 1 : parseInt(ctx.query.page_num)
    let pageSize = ctx.query.page_size === undefined ? 20 : parseInt(ctx.query.page_size)
    let topics = await topicService.getTopicList(pageNum, pageSize)
    ctx.body = topics
  },

  //添加话题
  async addTopic(ctx){
    //验证数据
    let result = await topicService.addTopic(ctx.request.body)
    ctx.body = result
  },

  //获取话题信息
  async getTopic(ctx){
    let result = await topicService.getTopic(ctx.params.id)
    ctx.body = result
  },

  //删除话题
  async deleteTopic(ctx){
    //验证身份
    let result = await topicService.deleteTopic(ctx.params.id)
    ctx.body = result
  },

}

module.exports = topic