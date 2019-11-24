/*
 * @Author: jwchan1996
 * @Date: 2019-09-10 01:33:20
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-10-10 00:54:20
 */
const personService = require('../service/person')
const util = require('../util')

const person = {

    //获取用户个人帖子列表
    async getPostList(ctx) {
        //验证数据
        let paramList = ['user_id']
        if(!util.checkParamExist(paramList, ctx.query)){
            ctx.body = {
                status: 10002,
                message: '非法参数'
            }
            return
        }
        let userId = ctx.query.user_id
        let pageNum = ctx.query.page_num === undefined ? 1 : ctx.query.page_num
        let pageSize = ctx.query.page_size === undefined ? 20 : ctx.query.page_size
        let posts = await personService.getPostList(userId, pageNum, pageSize)
        ctx.body = posts
    },

    //获取用户个人评论列表
    async getCommentList(ctx) {
        //验证数据
        let paramList = ['user_id']
        if(!util.checkParamExist(paramList, ctx.query)){
            ctx.body = {
                status: 10002,
                message: '非法参数'
            }
            return
        }
        let userId = ctx.query.user_id
        let pageNum = ctx.query.page_num === undefined ? 1 : ctx.query.page_num
        let pageSize = ctx.query.page_size === undefined ? 20 : ctx.query.page_size
        let comments = await personService.getCommentList(userId, pageNum, pageSize)
        ctx.body = comments
    },

    //获取用户个人回复列表
    async getAnswerList(ctx) {
        //验证数据
        let paramList = ['user_id']
        if(!util.checkParamExist(paramList, ctx.query)){
            ctx.body = {
                status: 10002,
                message: '非法参数'
            }
            return
        }
        let userId = ctx.query.user_id
        let pageNum = ctx.query.page_num === undefined ? 1 : ctx.query.page_num
        let pageSize = ctx.query.page_size === undefined ? 20 : ctx.query.page_size
        let answers = await personService.getAnswerList(userId, pageNum, pageSize)
        ctx.body = answers
    },

    //获取用户个人粉丝列表
    async getFansList(ctx) {
        //验证数据
        let paramList = ['user_id']
        if(!util.checkParamExist(paramList, ctx.query)){
            ctx.body = {
                status: 10002,
                message: '非法参数'
            }
            return
        }
        let userId = ctx.query.user_id
        let pageNum = ctx.query.page_num === undefined ? 1 : ctx.query.page_num
        let pageSize = ctx.query.page_size === undefined ? 20 : ctx.query.page_size
        let fansList = await personService.getFansList(userId, pageNum, pageSize)
        ctx.body = fansList
    },

    //获取用户个人关注列表
    async getFollowList(ctx) {
        //验证数据
        let paramList = ['user_id']
        if(!util.checkParamExist(paramList, ctx.query)){
            ctx.body = {
                status: 10002,
                message: '非法参数'
            }
            return
        }
        let userId = ctx.query.user_id
        let pageNum = ctx.query.page_num === undefined ? 1 : ctx.query.page_num
        let pageSize = ctx.query.page_size === undefined ? 20 : ctx.query.page_size
        let followList = await personService.getFollowList(userId, pageNum, pageSize)
        ctx.body = followList
    },

    //获取用户个人点赞列表
    async getLikeList(ctx) {
        //验证数据
        let paramList = ['user_id']
        if(!util.checkParamExist(paramList, ctx.query)){
            ctx.body = {
                status: 10002,
                message: '非法参数'
            }
            return
        }
        let userId = ctx.query.user_id
        let pageNum = ctx.query.page_num === undefined ? 1 : ctx.query.page_num
        let pageSize = ctx.query.page_size === undefined ? 20 : ctx.query.page_size
        let likeList = await personService.getLikeList(userId, pageNum, pageSize)
        ctx.body = likeList
    },

    //获取用户个人收藏列表
    async getCollectList(ctx) {
        //验证数据
        let paramList = ['user_id']
        if(!util.checkParamExist(paramList, ctx.query)){
            ctx.body = {
                status: 10002,
                message: '非法参数'
            }
            return
        }
        let userId = ctx.query.user_id
        let pageNum = ctx.query.page_num === undefined ? 1 : ctx.query.page_num
        let pageSize = ctx.query.page_size === undefined ? 20 : ctx.query.page_size
        let collectList = await personService.getCollectList(userId, pageNum, pageSize)
        ctx.body = collectList
    },

    //获取用户个人话题列表
    async getTopicList(ctx) {
        //验证数据
        let paramList = ['user_id']
        if(!util.checkParamExist(paramList, ctx.query)){
            ctx.body = {
                status: 10002,
                message: '非法参数'
            }
            return
        }
        let userId = ctx.query.user_id
        let pageNum = ctx.query.page_num === undefined ? 1 : ctx.query.page_num
        let pageSize = ctx.query.page_size === undefined ? 20 : ctx.query.page_size
        let topicList = await personService.getTopicList(userId, pageNum, pageSize)
        ctx.body = topicList
    },

    
    //获取关注用户的动态列表
    async getFollowUserDynamicList(ctx){
        let pageNum = ctx.query.page_num === undefined ? 1 : ctx.query.page_num
        let pageSize = ctx.query.page_size === undefined ? 20 : ctx.query.page_size
        let dynamicList = await personService.getFollowUserDynamicList(pageNum, pageSize)
        ctx.body = dynamicList
    },

}

module.exports = person