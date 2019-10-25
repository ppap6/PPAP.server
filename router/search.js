/*
 * @Author: jwchan1996
 * @Date: 2019-10-25 10:25:00
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-10-25 10:25:00
 */

const router = require('koa-router')()
const search = require('../controller/search')

router
    .get('/post', search.getPostList)   //获取帖子列表

module.exports = router