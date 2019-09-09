/*
 * @Author: jwchan1996
 * @Date: 2019-05-21 20:02:00
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-09-10 01:40:26
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
const answer = require('./answer')
const person = require('./person')

router.use('/', home.routes(), home.allowedMethods())
router.use('/user', user.routes(), user.allowedMethods())
router.use('/post', post.routes(), post.allowedMethods())
router.use('/topic', topic.routes(), topic.allowedMethods())
router.use('/role', role.routes(), role.allowedMethods())
router.use('/access', access.routes(), access.allowedMethods())
router.use('/comment', comment.routes(), comment.allowedMethods())
router.use('/answer', answer.routes(), answer.allowedMethods())
router.use('/person', person.routes(), person.allowedMethods())

module.exports = router