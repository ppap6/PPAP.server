/*
 * @Author: jwchan1996
 * @Date: 2019-09-10 01:37:44
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-09-10 01:39:06
 */

/**
 * 标识符（数据库、表、列名）用两个 ? 做占位符（即 ?? ）
 * 其他的用一个 ? 做占位符
 */

const db = require('../util/db')
const db_mongo = require('../util/db_mongo')

const person = {

    //获取用户帖子列表
    async getPostList(pageNum, pageSize) {
        let uid = global.uid
        let start = (pageNum - 1) * pageSize
        let sql = `SELECT * FROM post WHERE uid=? LIMIT ${start},${pageSize}`
        let result = await db.query(sql, [uid])
        if (Array.isArray(result) && result.length > 0) {
            return result
        }
        return false
    },

}

module.exports = person