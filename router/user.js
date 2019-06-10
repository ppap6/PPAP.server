/*
 * @Author: jwchan1996
 * @Date: 2019-06-06 14:44:36
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-06-10 11:33:04
 */

const router = require('koa-router')()
const user = require('../controller/user')

router
  .get('/', user.getAllUser)
  .get('/:id', ctx => {
    ctx.body = ctx.params.id
  })
  .get('/login/:id', ctx => {
    ctx.body = ctx.params.id
  })

module.exports = router