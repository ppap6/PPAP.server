/*
 * @Author: jwchan1996
 * @Date: 2019-09-10 01:37:44
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-09-22 00:28:19
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
        let sql = `SELECT p.id,p.uid,u.name AS uname,u.avatar,p.title,p.content,p.create_time,p.update_time,p.pv,p.likes,p.collects,p.topic_id,t.name AS topic_name 
            FROM post AS p,user AS u,topic AS t 
            WHERE p.topic_id=t.id AND p.uid=u.id AND p.uid=?
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

    

}

module.exports = person