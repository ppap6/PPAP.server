/*
 * @Author: jwchan1996
 * @Date: 2019-09-10 01:35:09
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-09-22 23:33:14
 */

/**
 * 200 操作成功
 * 10000操作失败
 * 10001未登陆授权
 * 10002非法参数
 * 10003未找到操作对象
 * 10004没有操作权限
 * 10005数据库错误
 */
const personModel = require('../model/person')
const postModel = require('../model/post')
const userModel = require('../model/user')
const commentModel = require('../model/comment')
const answerModel = require('../model/answer')

const person = {
    
    //获取个人帖子列表
    async getPostList(userId, pageNum, pageSize) {
        let postList = await personModel.getPostList(userId, pageNum, pageSize)
        if (postList) {
            //遍历
            for (let i = 0; i < postList.length; i++) {
                let commentCount = await personModel.getPostCommentCount(postList[i].id)
                let answerCount = await personModel.getPostAnswerCount(postList[i].id)
                postList[i].comments = commentCount
                postList[i].answers = answerCount
            }
            return {
                status: 200,
                message: postList
            }
        }
        return {
            status: 10003,
            message: '未找到操作对象'
        }
    },

    //获取个人评论列表
    async getCommentList(userId, pageNum, pageSize) {
        let commentList = await personModel.getCommentList(parseInt(userId), parseInt(pageNum), parseInt(pageSize))
        if (commentList) {
            let newList = []
            for(let i=0; i<commentList.length; i++){
                let post = await postModel.getPost(commentList[i].pid)
                let item = {
                    _id: commentList[i]._id,
                    uid: commentList[i].uid,
                    pid: commentList[i].pid,
                    ptitle: post.title,
                    content: commentList[i].content,
                    create_time: commentList[i].create_time,
                    update_time: commentList[i].update_time,
                    lights: commentList[i].lights
                }
                newList.push(item)
            }
            return {
                status: 200,
                message: newList
            }
        }
        return {
            status: 10003,
            message: '未找到操作对象'
        }
    },

    //获取个人回复列表
    async getAnswerList(userId, pageNum, pageSize) {
        let answerList = await personModel.getAnswerList(parseInt(userId), parseInt(pageNum), parseInt(pageSize))
        if (answerList) {
            let newList = []
            for(let i=0; i<answerList.length; i++){
                let post = await postModel.getPost(answerList[i].pid)
                let user = await userModel.getUser(answerList[i].targetor_id)
                let comment = await commentModel.getComment(answerList[i].comment_id)
                let answer = await answerModel.getAnswer(answerList[i].target_answer_id)
                let item = {
                    _id: answerList[i]._id,
                    type: answerList[i].type,
                    comment_id: answerList[i].comment_id,
                    comment_content: comment.content,
                    target_answer_id: answerList[i].target_answer_id,
                    target_answer_content: answer.content,
                    requestor_id: answerList[i].requestor_id,
                    targetor_id: answerList[i].targetor_id,
                    targetor_name: user.name,
                    targetor_avatar: user.avatar,
                    pid: answerList[i].pid,
                    ptitle: post.title,
                    content: answerList[i].content,
                    create_time: answerList[i].create_time,
                    update_time: answerList[i].update_time,
                    lights: answerList[i].lights
                }
                newList.push(item)
            }
            return {
                status: 200,
                message: newList
            }
        }
        return {
            status: 10003,
            message: '未找到操作对象'
        }
    },

    //获取个人粉丝列表
    async getFansList(userId, pageNum, pageSize) {
        let fansList = await personModel.getFansList(parseInt(userId), parseInt(pageNum), parseInt(pageSize))
        if (fansList) {
            let newFansList = []
            //遍历
            for (let i = 0; i < fansList.length; i++) {
                let user = await userModel.getUser(fansList[i].uid)
                let fansCount = await personModel.getUserFansCount(parseInt(fansList[i].uid))
                let followCount = await personModel.getUserFollowCount(parseInt(fansList[i].uid))
                newFansList.push({
                    id: user.id,
                    name: user.name,
                    avatar: user.avatar,
                    fans_count: fansCount,
                    follow_count: followCount
                })
            }
            return {
                status: 200,
                message: newFansList
            }
        }
        return {
            status: 10003,
            message: '未找到操作对象'
        }
    },

    //获取个人关注列表
    async getFollowList(userId, pageNum, pageSize) {
        let followList = await personModel.getFollowList(parseInt(userId), parseInt(pageNum), parseInt(pageSize))
        if (followList) {
            let newFollowList = []
            //遍历
            for (let i = 0; i < followList.length; i++) {
                let user = await userModel.getUser(followList[i].follow_uid)
                let fansCount = await personModel.getUserFansCount(parseInt(followList[i].follow_uid))
                let followCount = await personModel.getUserFollowCount(parseInt(followList[i].follow_uid))
                newFollowList.push({
                    id: user.id,
                    name: user.name,
                    avatar: user.avatar,
                    fans_count: fansCount,
                    follow_count: followCount
                })
            }
            return {
                status: 200,
                message: newFollowList
            }
        }
        return {
            status: 10003,
            message: '未找到操作对象'
        }
    },

    //获取个人点赞列表
    async getLikeList(userId, pageNum, pageSize){
        let pidArr = await personModel.getLikePidArr(parseInt(userId), parseInt(pageNum), parseInt(pageSize))
        if (pidArr.length) {
            let likeList = []
            //遍历
            for (let i = 0; i < pidArr.length; i++) {
                let post = await postModel.getPost(pidArr[i])
                likeList.push(post)
            }
            return {
                status: 200,
                message: likeList
            }
        }
        return {
            status: 10003,
            message: '未找到操作对象'
        }
    },

    //获取个人收藏列表
    async getCollectList(userId, pageNum, pageSize){
        let pidArr = await personModel.getCollectPidArr(parseInt(userId), parseInt(pageNum), parseInt(pageSize))
        if (pidArr.length) {
            let collectList = []
            //遍历
            for (let i = 0; i < pidArr.length; i++) {
                let post = await postModel.getPost(pidArr[i])
                collectList.push(post)
            }
            return {
                status: 200,
                message: collectList
            }
        }
        return {
            status: 10003,
            message: '未找到操作对象'
        }
    },

}

module.exports = person