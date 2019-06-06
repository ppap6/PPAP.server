/*
 * @Author: jwchan1996
 * @Date: 2019-05-21 20:02:00
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-06-06 14:24:16
 */

/**
 * 整合所有子路由
 */

const router = require('koa-router')()

// const user = require('./user')
// const post = require('./post')
// const topic = require('./topic')

router.get('/', async(ctx) => {
  ctx.body = '403 forbidden'
})

// router.use('/user', user.routes(), user.allowedMethods())
// router.use('/post', post.routes(), post.allowedMethods())
// router.use('/topic', topic.routes(), topic.allowedMethods())

module.exports = router