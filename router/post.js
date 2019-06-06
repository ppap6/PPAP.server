/*
 * @Author: jwchan1996
 * @Date: 2019-06-06 14:44:36
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-06-06 14:49:03
 */

const router = require('koa-router')()

router.get('/', ctx => {
  ctx.body = 'post'
})

module.exports = router