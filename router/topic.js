/*
 * @Author: jwchan1996
 * @Date: 2019-06-06 14:44:36
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-06-29 11:50:28
 */

const router = require('koa-router')()
const topic = require('../controller/topic')

router
    .get('/', topic.getTopicList)   //获取话题列表
    .post('/', topic.addTopic)   //添加话题
    .get('/:id', topic.getTopic)   //获取话题信息
    .del('/:id', topic.deleteTopic)   //删除话题

module.exports = router