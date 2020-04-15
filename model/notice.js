/*
 * @Author: jwchan1996
 * @Date: 2019-09-10 01:37:44
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-10-07 21:43:32
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
        let result = await db_mongo.find('user_log', {post_owner_id: userId, type: 1, uid: {$ne: userId}}, start, pageSize, {create_time: -1})
        if (Array.isArray(result) && result.length > 0) {
            return result
        }
        return false
    },

    //获取评论通知总数
    async getCommentLogCount(userId){
        let count = await db_mongo.count('user_log', {post_owner_id: userId, type: 1, uid: {$ne: userId}})
        if (count) {
            return count
        }
        return 0
    },

    //获取回复通知列表
    async getAnswerLogList(userId, pageNum, pageSize){
        let start = (pageNum - 1) * pageSize
        let result = await db_mongo.find('user_log', {targetor_id: userId, type: 2, uid: {$ne: userId}}, start, pageSize, {create_time: -1})
        if (Array.isArray(result) && result.length > 0) {
            return result
        }
        return false
    },

    //获取回复通知总数
    async getAnswerLogCount(userId){
        let count = await db_mongo.count('user_log', {targetor_id: userId, type: 2, uid: {$ne: userId}})
        if (count) {
            return count
        }
        return 0
    },

    //获取关注通知列表
    async getFollowLogList(userId, pageNum, pageSize){
        let start = (pageNum - 1) * pageSize
        let result = await db_mongo.find('user_log', {follow_people_id: userId, type: 3, uid: {$ne: userId}}, start, pageSize, {create_time: -1})
        if (Array.isArray(result) && result.length > 0) {
            return result
        }
        return false
    },

    //获取关注通知总数
    async getFollowLogCount(userId){
        let count = await db_mongo.count('user_log', {follow_people_id: userId, type: 3, uid: {$ne: userId}})
        if (count) {
            return count
        }
        return 0
    },

    //获取点赞通知列表
    async getLikeLogList(userId, pageNum, pageSize){
        let start = (pageNum - 1) * pageSize
        let result = await db_mongo.find('user_log', {post_owner_id: userId, type: 4, uid: {$ne: userId}}, start, pageSize, {create_time: -1})
        if (Array.isArray(result) && result.length > 0) {
            return result
        }
        return false
    },

    //获取点赞通知总数
    async getLikeLogCount(userId){
        let count = await db_mongo.count('user_log', {post_owner_id: userId, type: 4, uid: {$ne: userId}})
        if (count) {
            return count
        }
        return 0
    },

    //获取收藏通知列表
    async getCollectLogList(userId, pageNum, pageSize){
        let start = (pageNum - 1) * pageSize
        let result = await db_mongo.find('user_log', {post_owner_id: userId, type: 5, uid: {$ne: userId}}, start, pageSize, {create_time: -1})
        if (Array.isArray(result) && result.length > 0) {
            return result
        }
        return false
    },

    //获取收藏通知总数
    async getCollectLogCount(userId){
        let count = await db_mongo.count('user_log', {post_owner_id: userId, type: 5, uid: {$ne: userId}})
        if (count) {
            return count
        }
        return 0
    },

    //获取全部通知列表
    async getAllLogList(userId, pageNum, pageSize){
        let start = (pageNum - 1) * pageSize
        let result = await db_mongo.find('user_log', {
            $or: [
                {post_owner_id: userId, type: 1, uid: {$ne: userId}},
                {targetor_id: userId, type: 2, uid: {$ne: userId}},
                {follow_people_id: userId, type: 3, uid: {$ne: userId}},
                {post_owner_id: userId, type: 4, uid: {$ne: userId}},
                {post_owner_id: userId, type: 5, uid: {$ne: userId}},
                // {uid: userId, type: 6},
                // {uid: userId, type: 7}
            ]
        }, start, pageSize, {create_time: -1})
        if (Array.isArray(result) && result.length > 0) {
            return result
        }
        return false
    },

    //获取全部通知总数
    async getAllLogCount(userId){
        let count = await db_mongo.count('user_log', {
            $or: [
                {post_owner_id: userId, type: 1, uid: {$ne: userId}},
                {targetor_id: userId, type: 2, uid: {$ne: userId}},
                {follow_people_id: userId, type: 3, uid: {$ne: userId}},
                {post_owner_id: userId, type: 4, uid: {$ne: userId}},
                {post_owner_id: userId, type: 5, uid: {$ne: userId}},
                // {uid: userId, type: 6},
                // {uid: userId, type: 7}
            ]
        })
        if (count) {
            return count
        }
        return 0
    },

}

module.exports = notice