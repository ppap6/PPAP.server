/*
 * @Author: jwchan1996
 * @Date: 2019-06-06 14:44:36
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-06-28 11:41:33
 */

const router = require('koa-router')()
const topic = require('../controller/topic')

router
    .get('/', topic.getTopicList)

module.exports = router