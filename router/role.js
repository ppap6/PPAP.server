/*
 * @Author: jwchan1996
 * @Date: 2019-07-01 23:27:13
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-07-04 23:17:47
 */

const router = require('koa-router')()
const role = require('../controller/role')

router
    .get('/', role.getRoleList)   //获取角色列表
    .post('/', role.addRole)   //添加角色
    .get('/:id', role.getRole)   //获取角色信息
    .del('/:id', role.deleteRole)   //删除角色
    .put('/:id', role.updateRole)   //修改角色信息

    .get('/access/:id', role.getRoleAccess)   //获取角色权限

module.exports = router