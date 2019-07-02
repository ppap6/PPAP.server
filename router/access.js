/*
 * @Author: jwchan1996
 * @Date: 2019-07-02 23:38:42
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-07-02 23:45:28
 */

const router = require('koa-router')()
const access = require('../controller/access')

router
    .get('/', access.getAccessList)   //获取权限列表

module.exports = router