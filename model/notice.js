/*
 * @Author: jwchan1996
 * @Date: 2019-09-10 01:37:44
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-09-29 00:31:02
 */

/**
 * 标识符（数据库、表、列名）用两个 ? 做占位符（即 ?? ）
 * 其他的用一个 ? 做占位符
 */

const db_mongo = require('../util/db_mongo')

const notice = {

    //获取评论通知列表
    async getCommentLogList(userId, pageNum, pageSize){
        let start = (pageNum - 1) * pageSize
        let result = await db_mongo.find('user_log', {post_owner_id: userId, type: 1}, start, pageSize, {create_time: -1})
        if (Array.isArray(result) && result.length > 0) {
            return result
        }
        return false
    },

    //获取回复通知列表
    async getAnswerLogList(userId, pageNum, pageSize){
        let start = (pageNum - 1) * pageSize
        let result = await db_mongo.find('user_log', {targetor_id: userId, type: 2}, start, pageSize, {create_time: -1})
        if (Array.isArray(result) && result.length > 0) {
            return result
        }
        return false
    },

    //获取关注通知列表
    async getFollowLogList(userId, pageNum, pageSize){
        let start = (pageNum - 1) * pageSize
        let result = await db_mongo.find('user_log', {follow_people_uid: userId, type: 3}, start, pageSize, {create_time: -1})
        if (Array.isArray(result) && result.length > 0) {
            return result
        }
        return false
    },

    //获取点赞通知列表
    async getLikeLogList(userId, pageNum, pageSize){
        let start = (pageNum - 1) * pageSize
        let result = await db_mongo.find('user_log', {post_owner_id: userId, type: 4}, start, pageSize, {create_time: -1})
        if (Array.isArray(result) && result.length > 0) {
            return result
        }
        return false
    },

}

module.exports = notice