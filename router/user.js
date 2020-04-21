/*
 * @Author: jwchan1996
 * @Date: 2019-06-06 14:44:36
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-10-10 00:52:02
 */

const router = require('koa-router')()
const user = require('../controller/user')

router
  .get('/verify', user.verify)   //邮箱验证码 
  .get('/', user.getUserList)    //获取用户列表
  .get('/login/status', user.getUserLoginStatus)    //获取用户登录状态
  .get('/auth', user.getUserAuthList)   //获取用户权限列表
  .post('/', user.addUser)    //添加用户
  .del('/:id', user.deleteUser)   //删除用户
  .get('/:id', user.getUser)    //获取用户信息
  .put('/:id', user.updateUser)    //修改用户信息
  .put('/', user.updateSelf)    //用户修改自己的信息
  .put('/pwd/:id', user.updateUserPwd)    //修改用户密码
  .post('/login', user.login)    //用户登录
  .post('/register', user.register)    //用户注册

  .get('/post/status/:id', user.getPostStatus)    //获取用户对帖子的点赞收藏状态
  .get('/topic/status/:id', user.getTopicStatus)    //获取用户对话题的关注状态
  .get('/follow/status/:id', user.getFollowStatus)    //获取用户对用户的关注状态

  .post('/follow', user.follow)    //用户关注
  .post('/cancel/follow', user.cancelFollow)    //用户取消关注
  .post('/follow/topic', user.followTopic)    //用户关注话题
  .post('/cancel/follow/topic', user.cancelFollowTopic)    //用户取消关注话题

  .post('/like/post', user.likePost)    //用户点赞帖子
  .post('/cancel/like/post', user.cancelLikePost)    //用户取消点赞帖子
  .post('/collect/post', user.collectPost)    //用户收藏帖子
  .post('/cancel/collect/post', user.cancelCollectPost)    //用户取消收藏帖子
  .post('/light/comment', user.lightComment)    //用户点亮评论
  .post('/cancel/light/comment', user.cancelLightComment)    //用户取消点亮评论
  .post('/light/answer', user.lightAnswer)    //用户点亮回复
  .post('/cancel/light/answer', user.cancelLightAnswer)    //用户取消点亮回复

module.exports = router