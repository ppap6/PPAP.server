/*
 * @Author: jwchan1996
 * @Date: 2019-06-06 14:44:36
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-07-21 23:10:31
 */

const router = require('koa-router')()
const user = require('../controller/user')

router
  .get('/', user.getUserList)    //获取用户列表
  .post('/', user.addUser)    //添加用户
  .del('/:id', user.deleteUser)   //删除用户
  .get('/:id', user.getUser)    //获取用户信息
  .put('/:id', user.updateUser)    //修改用户信息
  .post('/login', user.login)    //用户登录

  .post('/follow', user.follow)    //用户关注
  .post('/cancel/follow', user.cancelFollow)    //用户取消关注
  .post('/follow/topic', user.followTopic)    //用户关注话题
  .post('/cancel/follow/topic', user.cancelFollowTopic)    //用户取消关注话题

module.exports = router