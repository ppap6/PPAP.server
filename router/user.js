/*
 * @Author: jwchan1996
 * @Date: 2019-06-06 14:44:36
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-06-26 00:40:02
 */

const router = require('koa-router')()
const user = require('../controller/user')

router
  .get('/', user.getUserList)    //获取用户列表
  .post('/', user.addUser)    //添加用户
  .get('/:id', ctx => {
    ctx.body = ctx.params.id
  })
  .get('/login/:id', ctx => {
    ctx.body = ctx.params.id
  })

module.exports = router