/*
 * @Author: jwchan1996
 * @Date: 2019-09-10 01:33:20
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-09-29 00:37:01
 */
const noticeService = require('../service/notice')

const notice = {

    //获取评论通知列表
    async getCommentList(ctx) {
        let userId = global.uid
        let pageNum = ctx.query.page_num === undefined ? 1 : parseInt(ctx.query.page_num)
        let pageSize = ctx.query.page_size === undefined ? 20 : parseInt(ctx.query.page_size)
        let comments = await noticeService.getCommentList(userId, pageNum, pageSize)
        ctx.body = comments
    },

    //获取回复通知列表
    async getAnswerList(ctx) {
        let userId = global.uid
        let pageNum = ctx.query.page_num === undefined ? 1 : parseInt(ctx.query.page_num)
        let pageSize = ctx.query.page_size === undefined ? 20 : parseInt(ctx.query.page_size)
        let answers = await noticeService.getAnswerList(userId, pageNum, pageSize)
        ctx.body = answers
    },

    //获取关注通知列表
    async getFollowList(ctx) {
        let userId = global.uid
        let pageNum = ctx.query.page_num === undefined ? 1 : parseInt(ctx.query.page_num)
        let pageSize = ctx.query.page_size === undefined ? 20 : parseInt(ctx.query.page_size)
        let follows = await noticeService.getFollowList(userId, pageNum, pageSize)
        ctx.body = follows
    },

    //获取点赞通知列表
    async getLikeList(ctx) {
        let userId = global.uid
        let pageNum = ctx.query.page_num === undefined ? 1 : parseInt(ctx.query.page_num)
        let pageSize = ctx.query.page_size === undefined ? 20 : parseInt(ctx.query.page_size)
        let likes = await noticeService.getLikeList(userId, pageNum, pageSize)
        ctx.body = likes
    },

    //获取收藏通知列表
    async getCollectList(ctx) {
        let userId = global.uid
        let pageNum = ctx.query.page_num === undefined ? 1 : parseInt(ctx.query.page_num)
        let pageSize = ctx.query.page_size === undefined ? 20 : parseInt(ctx.query.page_size)
        let collects = await noticeService.getCollectList(userId, pageNum, pageSize)
        ctx.body = collects
    },

    //获取全部通知列表
    async getAllList(ctx) {
        let userId = global.uid
        let pageNum = ctx.query.page_num === undefined ? 1 : parseInt(ctx.query.page_num)
        let pageSize = ctx.query.page_size === undefined ? 20 : parseInt(ctx.query.page_size)
        let alls = await noticeService.getAllList(userId, pageNum, pageSize)
        ctx.body = alls
    },

}

module.exports = notice