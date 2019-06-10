/*
 * @Author: jwchan1996
 * @Date: 2019-05-21 20:00:06
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-06-10 14:51:55
 */
const postModel = require('../model/post')

const post ={
  async getPostComment(){
    return await postModel.getPostComment()
  }
}

module.exports = post