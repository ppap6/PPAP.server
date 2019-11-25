/*
 * @Author: jwchan1996
 * @Date: 2019-09-10 01:35:09
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-10-10 01:55:59
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
const topicModel = require('../model/topic')

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
                    title: post.title,
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
                    title: post.title,
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
        if (pidArr) {
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
        if (pidArr) {
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

    //获取个人话题列表
    async getTopicList(userId, pageNum, pageSize){
        let followTopicList = await personModel.getTopicList(parseInt(userId), parseInt(pageNum), parseInt(pageSize))
        if (followTopicList) {
            let topicList = []
            //遍历
            for (let i = 0; i < followTopicList.length; i++) {
                let topic = await topicModel.getTopic(followTopicList[i].follow_topic_id)
                if(topic){
                    let sname = ''
                    if(topic.sid){
                        let stopic = await topicModel.getTopic(topic.sid)
                        if(stopic){
                            sname = stopic.name
                        }
                    }
                    let newTopic = {
                        id: topic.id,
                        sid: topic.sid,
                        sname: sname,
                        name: topic.name,
                        intro: topic.intro,
                        create_time: topic.create_time,
                        update_time: topic.update_time,
                        posts: topic.posts,
                        followers: topic.followers,
                    }
                    topicList.push(newTopic)
                }
            }
            return {
                status: 200,
                message: topicList
            }
        }
        return {
            status: 10003,
            message: '未找到操作对象'
        }
    },

    //获取关注用户的动态列表
    async getFollowUserDynamicList(pageNum, pageSize){
        let uid = global.uid
        let followList = await personModel.getFollowList(parseInt(uid), 1, 1000)
        if(followList){
            let queryArr = []
            for(let i=0; i<followList.length; i++){
                queryArr.push({
                        uid: followList[i].follow_uid
                    }
                )
            }
            let dynamicList = await personModel.getFollowUserDynamicList(queryArr, parseInt(pageNum), parseInt(pageSize))
            if(dynamicList){
                let responseList = []
                //遍历
                for (let i = 0; i < dynamicList.length; i++) {
                    //评论动态
                    if(dynamicList[i].type == 1){
                        let user = await userModel.getUser(dynamicList[i].uid)
                        let post = await postModel.getPost(dynamicList[i].pid)
                        let comment = await commentModel.getComment(dynamicList[i].comment_id)
                        responseList.push({
                            _id: dynamicList[i]._id,
                            type: dynamicList[i].type,
                            uid: dynamicList[i].uid,
                            uname: user.name,
                            avatar: user.avatar,
                            pid: dynamicList[i].pid,
                            pname: post.title,
                            comment_id: dynamicList[i].comment_id,
                            comment_content: comment.content,
                            create_time: dynamicList[i].create_time
                        })
                        continue
                    }
                    //回复动态
                    if(dynamicList[i].type == 2){
                        let user = await userModel.getUser(dynamicList[i].uid)
                        let post = await postModel.getPost(dynamicList[i].pid)
                        let answer = await answerModel.getAnswer(dynamicList[i].answer_id)
                        responseList.push({
                            _id: dynamicList[i]._id,
                            type: dynamicList[i].type,
                            uid: dynamicList[i].uid,
                            uname: user.name,
                            avatar: user.avatar,
                            pid: dynamicList[i].pid,
                            pname: post.title,
                            answer_id: dynamicList[i].answer_id,
                            answer_content: answer.content,
                            create_time: dynamicList[i].create_time
                        })
                        continue
                    }
                    //关注动态
                    if(dynamicList[i].type == 3){
                        let user = await userModel.getUser(dynamicList[i].uid)
                        let targetor = await userModel.getUser(dynamicList[i].follow_people_id)
                        responseList.push({
                            _id: dynamicList[i]._id,
                            type: dynamicList[i].type,
                            uid: dynamicList[i].uid,
                            uname: user.name,
                            avatar: user.avatar,
                            targetor_id: dynamicList[i].follow_people_id,
                            targetor_name: targetor.name,
                            targetor_avatar: targetor.avatar,
                            create_time: dynamicList[i].create_time
                        })
                        continue
                    }
                    //点赞动态
                    if(dynamicList[i].type == 4){
                        let user = await userModel.getUser(dynamicList[i].uid)
                        let post = await postModel.getPost(dynamicList[i].pid)
                        responseList.push({
                            _id: dynamicList[i]._id,
                            type: dynamicList[i].type,
                            uid: dynamicList[i].uid,
                            uname: user.name,
                            avatar: user.avatar,
                            pid: dynamicList[i].pid,
                            pname: post.title,
                            create_time: dynamicList[i].create_time
                        })
                        continue
                    }
                    //收藏动态
                    if(dynamicList[i].type == 5){
                        let user = await userModel.getUser(dynamicList[i].uid)
                        let post = await postModel.getPost(dynamicList[i].pid)
                        responseList.push({
                            _id: dynamicList[i]._id,
                            type: dynamicList[i].type,
                            uid: dynamicList[i].uid,
                            uname: user.name,
                            avatar: user.avatar,
                            pid: dynamicList[i].pid,
                            pname: post.title,
                            create_time: dynamicList[i].create_time
                        })
                        continue
                    }
                    //关注话题动态
                    if(dynamicList[i].type == 6){
                        let user = await userModel.getUser(dynamicList[i].uid)
                        let topic = await topicModel.getTopic(dynamicList[i].follow_topic_id)
                        responseList.push({
                            _id: dynamicList[i]._id,
                            type: dynamicList[i].type,
                            uid: dynamicList[i].uid,
                            uname: user.name,
                            avatar: user.avatar,
                            topic_id: dynamicList[i].follow_topic_id,
                            topic_name: topic.name,
                            create_time: dynamicList[i].create_time
                        })
                        continue
                    }
                    //发帖动态
                    if(dynamicList[i].type == 7){
                        let user = await userModel.getUser(dynamicList[i].uid)
                        let post = await postModel.getPost(dynamicList[i].pid)
                        responseList.push({
                            _id: dynamicList[i]._id,
                            type: dynamicList[i].type,
                            uid: dynamicList[i].uid,
                            uname: user.name,
                            avatar: user.avatar,
                            pid: dynamicList[i].pid,
                            pname: post.title,
                            create_time: dynamicList[i].create_time
                        })
                        continue
                    }
                }
                return {
                    status: 200,
                    message: responseList
                }
            }
            return {
                status: 10003,
                message: '未找到操作对象'
            }
        }else{
            return {
                status: 10003,
                message: '未找到操作对象'
            }
        }
        
    },

}

module.exports = person