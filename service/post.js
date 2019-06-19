/*
 * @Author: jwchan1996
 * @Date: 2019-05-21 20:00:06
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-06-19 23:29:08
 */
const postModel = require('../model/post')

const post ={
  async getPostList(){
    return await postModel.getPostList()
  }
}

module.exports = post