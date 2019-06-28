/*
 * @Author: jwchan1996
 * @Date: 2019-06-06 14:44:36
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-06-28 16:54:20
 */

const router = require('koa-router')()
const topic = require('../controller/topic')

router
    .get('/', topic.getTopicList)   //获取话题列表

module.exports = router