/*
 * @Author: jwchan1996
 * @Date: 2019-06-06 14:42:32
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-06-06 14:44:20
 */

const router = require('koa-router')()

router.get('/', async(ctx) => {
  ctx.body = '403 forbidden'
})

module.exports = router