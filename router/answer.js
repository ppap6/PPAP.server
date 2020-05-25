/*
 * @Author: jwchan1996
 * @Date: 2019-07-12 00:18:14
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-07-15 23:50:33
 */

const router = require('koa-router')()
const answer = require('../controller/answer')

router
  .get('/comment/:id', answer.getAnswerList)    //获取评论回复列表
  .get('/admin/comment/:id', answer.getAnswerListForAdmin)    //管理运营获取评论回复列表
  .post('/', answer.addAnswer)     //添加评论回复
  .del('/:id', answer.deleteAnswer)   //删除评论单条回复
  .get('/:id', answer.getAnswer)    //获取评论单条回复信息
  .get('/detail/:id', answer.getAnswerDetail)    //查看回复详情相关信息
  .put('/:id', answer.updateAnswer)     //修改评论回复信息

module.exports = router