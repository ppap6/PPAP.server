/*
 * @Author: jwchan1996
 * @Date: 2019-09-10 01:33:20
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-09-10 01:33:20
 */
const userCode = require('../code/user')
const personService = require('../service/person')

const person = {

    //获取用户帖子列表
    async getPostList(ctx) {
        let pageNum = ctx.query.page_num === undefined ? 1 : ctx.query.page_num
        let pageSize = ctx.query.page_size === undefined ? 20 : ctx.query.page_size
        let posts = await personService.getPostList(pageNum, pageSize)
        ctx.body = posts
    }

}

module.exports = person