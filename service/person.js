/*
 * @Author: jwchan1996
 * @Date: 2019-09-10 01:35:09
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-09-18 00:07:23
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

}

module.exports = person