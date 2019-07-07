/*
 * @Author: jwchan1996
 * @Date: 2019-05-21 20:02:00
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-07-07 23:46:22
 */

/**
 * 整合所有子路由
 */

const router = require('koa-router')()

const home = require('./home')
const user = require('./user')
const post = require('./post')
const topic = require('./topic')
const role = require('./role')
const access = require('./access')
const comment = require('./comment')

router.use('/', home.routes(), home.allowedMethods())
router.use('/user', user.routes(), user.allowedMethods())
router.use('/post', post.routes(), post.allowedMethods())
router.use('/topic', topic.routes(), topic.allowedMethods())
router.use('/role', role.routes(), role.allowedMethods())
router.use('/access', access.routes(), access.allowedMethods())
router.use('/comment', comment.routes(), access.allowedMethods())

module.exports = router