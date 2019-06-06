/*
 * @Author: jwchan1996
 * @Date: 2019-06-06 14:44:36
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-06-06 15:13:48
 */

const router = require('koa-router')()

router
  .get('/:id', ctx => {
    ctx.body = ctx.params.id
  })
  .get('/login/:id', ctx => {
    ctx.body = ctx.params.id
  })

module.exports = router