/*
 * @Author: jwchan1996
 * @Date: 2019-06-06 14:44:36
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-06-10 15:06:48
 */

const router = require('koa-router')()
const post = require('../controller/post')

router.get('/', post.getPostComment)

module.exports = router