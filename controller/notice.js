/*
 * @Author: jwchan1996
 * @Date: 2019-09-10 01:33:20
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-09-28 23:45:18
 */
const noticeService = require('../service/notice')

const notice = {

    //获取评论通知列表
    async getCommentList(ctx) {
        let userId = global.uid
        let pageNum = ctx.query.page_num === undefined ? 1 : ctx.query.page_num
        let pageSize = ctx.query.page_size === undefined ? 20 : ctx.query.page_size
        let comments = await noticeService.getCommentList(userId, pageNum, pageSize)
        ctx.body = comments
    },

    //获取回复通知列表
    async getAnswerList(ctx) {
        let userId = global.uid
        let pageNum = ctx.query.page_num === undefined ? 1 : ctx.query.page_num
        let pageSize = ctx.query.page_size === undefined ? 20 : ctx.query.page_size
        let answers = await noticeService.getAnswerList(userId, pageNum, pageSize)
        ctx.body = answers
    },

}

module.exports = notice