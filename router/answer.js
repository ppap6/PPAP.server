/*
 * @Author: jwchan1996
 * @Date: 2019-07-12 00:18:14
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-07-12 00:20:44
 */

const router = require('koa-router')()
const answer = require('../controller/answer')

router
  .get('/comment/:id', answer.getAnswerList)    //获取评论回复列表

module.exports = router