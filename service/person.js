/*
 * @Author: jwchan1996
 * @Date: 2019-09-10 01:35:09
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-09-10 23:43:57
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

const person = {
    
    //获取个人帖子列表
    async getPostList(pageNum, pageSize) {
        let postList = await personModel.getPostList(pageNum, pageSize)
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

}

module.exports = person