/*
 * @Author: jwchan1996
 * @Date: 2019-09-10 01:37:44
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-12-13 14:41:58
 */

/**
 * 标识符（数据库、表、列名）用两个 ? 做占位符（即 ?? ）
 * 其他的用一个 ? 做占位符
 */

const db = require('../util/db')
const db_mongo = require('../util/db_mongo')

const person = {

    //获取用户帖子列表
    async getPostList(userId, pageNum, pageSize) {
        let start = (pageNum - 1) * pageSize
        let sql = `SELECT p.id,p.uid,u.name AS uname,u.avatar,p.title,p.content,p.md,p.create_time,p.update_time,p.pv,p.likes,p.collects,p.topic_id,t.name AS topic_name 
            FROM post AS p,user AS u,topic AS t 
            WHERE p.topic_id=t.id AND p.uid=u.id AND p.uid=? AND p.status=1
            ORDER BY p.create_time DESC
            LIMIT ${start},${pageSize}`
        let result = await db.query(sql, [userId])
        if (Array.isArray(result) && result.length > 0) {
            return result
        }
        return false
    },

    //获取帖子评论数
    async getPostCommentCount(postId){
        let result = await db_mongo.find('comment', {pid: postId})
        if(Array.isArray(result) && result.length > 0){
            return result.length
        }
        return 0
    },

    //获取帖子回复数
    async getPostAnswerCount(postId){
        let result = await db_mongo.find('answer', {pid: postId})
        if(Array.isArray(result) && result.length > 0){
            return result.length
        }
        return 0
    },

    //获取用户评论列表
    async getCommentList(userId, pageNum, pageSize){
        let start = (pageNum - 1) * pageSize
        let result = await db_mongo.find('comment', {uid: userId}, start, pageSize, {update_time: -1})
        if (Array.isArray(result) && result.length > 0) {
            return result
        }
        return false
    },

    //获取用户回复列表
    async getAnswerList(userId, pageNum, pageSize){
        let start = (pageNum - 1) * pageSize
        let result = await db_mongo.find('answer', {requestor_id: userId}, start, pageSize, {update_time: -1})
        if (Array.isArray(result) && result.length > 0) {
            return result
        }
        return false
    },

    //获取用户粉丝列表
    async getFansList(userId, pageNum, pageSize){
        let start = (pageNum - 1) * pageSize
        let result = await db_mongo.find('user_fans_relation', {follow_uid: userId, state: 1}, start, pageSize, {create_time: -1})
        if (Array.isArray(result) && result.length > 0) {
            return result
        }
        return false
    },

    //获取用户关注列表
    async getFollowList(userId, pageNum, pageSize){
        let start = (pageNum - 1) * pageSize
        let result = await db_mongo.find('user_fans_relation', {uid: userId, state: 1}, start, pageSize, {create_time: -1})
        if (Array.isArray(result) && result.length > 0) {
            return result
        }
        return false
    },

    //获取用户帖子总数
    async getUserPostCount(userId){
        let sql = `SELECT COUNT(uid) FROM post WHERE uid=?`
        let count = await db.query(sql, [userId])
        if(count[0]['COUNT(uid)']){
            return count[0]['COUNT(uid)']
        }
        return 0
    },

    //获取用户评论总数
    async getUserCommentCount(userId){
        let count = await db_mongo.count('comment', {uid: userId, status: 1})
        if (count) {
            return count
        }
        return 0
    },

    //获取用户回复总数
    async getUserAnswerCount(userId){
        let count = await db_mongo.count('answer', {requestor_id: userId, status: 1})
        if (count) {
            return count
        }
        return 0
    },

    //获取用户粉丝总数
    async getUserFansCount(userId){
        let count = await db_mongo.count('user_fans_relation', {follow_uid: userId, state: 1})
        if (count) {
            return count
        }
        return 0
    },

    //获取用户关注总数
    async getUserFollowCount(userId){
        let count = await db_mongo.count('user_fans_relation', {uid: userId, state: 1})
        if (count) {
            return count
        }
        return 0
    },

    //获取用户点赞总数
    async getUserLikeCount(userId){
        let likePosts = await db_mongo.find('user_likes_collects_lights_relation', {uid: userId})
        if (Array.isArray(likePosts) && likePosts.length > 0) {
            let pidArr = likePosts[0].like_posts
            return pidArr.length
        }
        return 0
    },

    //获取用户点赞总数
    async getUserLikeCount(userId){
        let likePosts = await db_mongo.find('user_likes_collects_lights_relation', {uid: userId})
        if (Array.isArray(likePosts) && likePosts.length > 0) {
            let pidArr = likePosts[0].like_posts
            return pidArr.length
        }
        return 0
    },

    //获取用户收藏总数
    async getUserCollectCount(userId){
        let collectPosts = await db_mongo.find('user_likes_collects_lights_relation', {uid: userId})
        if (Array.isArray(collectPosts) && collectPosts.length > 0) {
            let pidArr = collectPosts[0].collect_posts
            return pidArr.length
        }
        return 0
    },

    //获取用户话题总数
    async getUserTopicCount(userId){
        let count = await db_mongo.count('user_topic_relation', {uid: userId, state: 1})
        if (count) {
            return count
        }
        return 0
    },

    //获取用户点赞帖子数组（分页page）
    async getLikePidArr(userId, pageNum, pageSize){
        let start = (pageNum - 1) * pageSize
        let likePosts = await db_mongo.find('user_likes_collects_lights_relation', {uid: userId})
        if (Array.isArray(likePosts) && likePosts.length > 0) {
            let pidArr = likePosts[0].like_posts
            if(pidArr.length - start > pageSize){
                return pidArr.slice(start, pageSize)
            }
            return pidArr.slice(start)
        }
        return 0
    },

    //获取用户收藏帖子数组（分页page）
    async getCollectPidArr(userId, pageNum, pageSize){
        let start = (pageNum - 1) * pageSize
        let collectPosts = await db_mongo.find('user_likes_collects_lights_relation', {uid: userId})
        if (Array.isArray(collectPosts) && collectPosts.length > 0) {
            let pidArr = collectPosts[0].collect_posts
            if(pidArr.length - start > pageSize){
                return pidArr.slice(start, pageSize)
            }
            return pidArr.slice(start)
        }
        return 0
    },

    //获取用户关注话题列表
    async getTopicList(userId, pageNum, pageSize){
        let start = (pageNum - 1) * pageSize
        let result = await db_mongo.find('user_topic_relation', {uid: userId, state: 1}, start, pageSize)
        if (Array.isArray(result) && result.length > 0) {
            return result
        }
        return false
    },

    //获取关注用户的动态列表
    async getFollowUserDynamicList(queryArr, pageNum, pageSize){
        let start = (pageNum - 1) * pageSize
        let result = await db_mongo.find('user_log', {
            $or: queryArr
        }, start, pageSize, {create_time: -1})
        if (Array.isArray(result) && result.length > 0) {
            return result
        }
        return false
    },

}

module.exports = person