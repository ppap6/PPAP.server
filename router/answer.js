/*
 * @Author: jwchan1996
 * @Date: 2019-07-12 00:18:14
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-07-13 09:53:22
 */

const router = require('koa-router')()
const answer = require('../controller/answer')

router
  .get('/comment/:id', answer.getAnswerList)    //获取评论回复列表
  .post('/', answer.addAnswer)     //添加评论回复

module.exports = router