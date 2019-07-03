/*
 * @Author: jwchan1996
 * @Date: 2019-07-02 23:38:42
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-07-03 09:40:41
 */

const router = require('koa-router')()
const access = require('../controller/access')

router
    .get('/', access.getAccessList)   //获取权限列表
    .post('/', access.addAccess)   //添加权限
    .get('/:id', access.getAccess)   //获取权限信息
    .del('/:id', access.deleteAccess)   //删除权限

module.exports = router