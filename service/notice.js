/*
 * @Author: jwchan1996
 * @Date: 2019-09-10 01:35:09
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-09-28 21:56:33
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
const noticeModel = require('../model/notice')
const userModel = require('../model/user')
const postModel = require('../model/post')
const commentModel = require('../model/comment')

const notice = {
    
    //获取评论通知列表
    async getCommentList(userId, pageNum, pageSize) {
        let commentLogList = await noticeModel.getCommentLogList(userId, pageNum, pageSize)
        if (commentLogList) {
            let noticeList = []
            //遍历
            for (let i = 0; i < commentLogList.length; i++) {
              let user = await userModel.getUser(commentLogList[i].uid)
              let post = await postModel.getPost(commentLogList[i].pid)
              let comment = await commentModel.getComment(commentLogList[i].comment_id)
              noticeList.push({
                _id: commentLogList[i]._id,
                uid: commentLogList[i].uid,
                uname: user.name,
                avatar: user.avatar,
                pid: commentLogList[i].pid,
                pname: post.title,
                comment_id: commentLogList[i].comment_id,
                comment_content: comment.content,
                create_time: commentLogList[i].create_time
              })
            }
            return {
                status: 200,
                message: noticeList
            }
        }
        return {
            status: 10003,
            message: '未找到操作对象'
        }
    },

}

module.exports = notice