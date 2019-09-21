/*
 * @Author: jwchan1996
 * @Date: 2019-09-10 01:33:20
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-09-21 23:39:08
 */
const userCode = require('../code/user')
const personService = require('../service/person')

const person = {

    //获取用户个人帖子列表
    async getPostList(ctx) {
        let userId = ctx.query.user_id
        let pageNum = ctx.query.page_num === undefined ? 1 : ctx.query.page_num
        let pageSize = ctx.query.page_size === undefined ? 20 : ctx.query.page_size
        let posts = await personService.getPostList(userId, pageNum, pageSize)
        ctx.body = posts
    },

    //获取用户个人评论列表
    async getCommentList(ctx) {
        let userId = ctx.query.user_id
        let pageNum = ctx.query.page_num === undefined ? 1 : ctx.query.page_num
        let pageSize = ctx.query.page_size === undefined ? 20 : ctx.query.page_size
        let comments = await personService.getCommentList(userId, pageNum, pageSize)
        ctx.body = comments
    },

    //获取用户个人回复列表
    async getAnswerList(ctx) {
        let userId = ctx.query.user_id
        let pageNum = ctx.query.page_num === undefined ? 1 : ctx.query.page_num
        let pageSize = ctx.query.page_size === undefined ? 20 : ctx.query.page_size
        let answers = await personService.getAnswerList(userId, pageNum, pageSize)
        ctx.body = answers
    },

    //获取用户个人粉丝列表
    async getFansList(ctx) {
        let userId = ctx.query.user_id
        let pageNum = ctx.query.page_num === undefined ? 1 : ctx.query.page_num
        let pageSize = ctx.query.page_size === undefined ? 20 : ctx.query.page_size
        let fans = await personService.getFansList(userId, pageNum, pageSize)
        ctx.body = fans
    },

}

module.exports = person