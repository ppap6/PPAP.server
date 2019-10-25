/*
 * @Author: jwchan1996
 * @Date: 2019-05-21 20:02:00
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-09-28 21:36:19
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
const notice = require('./notice')
const search = require('./search')

router.use('/', home.routes(), home.allowedMethods())
router.use('/user', user.routes(), user.allowedMethods())
router.use('/post', post.routes(), post.allowedMethods())
router.use('/topic', topic.routes(), topic.allowedMethods())
router.use('/role', role.routes(), role.allowedMethods())
router.use('/access', access.routes(), access.allowedMethods())
router.use('/comment', comment.routes(), comment.allowedMethods())
router.use('/answer', answer.routes(), answer.allowedMethods())
router.use('/person', person.routes(), person.allowedMethods())
router.use('/notice', notice.routes(), notice.allowedMethods())
router.use('/search', search.routes(), search.allowedMethods())

module.exports = router