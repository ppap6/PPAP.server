/*
 * @Author: jwchan1996
 * @Date: 2019-07-01 23:27:13
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-07-02 00:13:45
 */

const router = require('koa-router')()
const role = require('../controller/role')

router
    .get('/', role.getRoleList)   //获取角色列表
    .post('/', role.addRole)   //添加角色
    .get('/:id', role.getRole)   //获取角色信息

module.exports = router