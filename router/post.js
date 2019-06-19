/*
 * @Author: jwchan1996
 * @Date: 2019-06-06 14:44:36
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-06-19 23:31:17
 */

const router = require('koa-router')()
const post = require('../controller/post')

router.get('/', post.getPostList)

module.exports = router