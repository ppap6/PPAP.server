/*
 * @Author: jwchan1996
 * @Date: 2019-07-02 23:41:39
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-07-03 09:23:46
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
const accessModel = require('../model/access')

const access ={
 
  //获取权限列表
  async getAccessList(pageNum, pageSize){
    let accessList = await accessModel.getAccessList(pageNum, pageSize)
    if(accessList){
      //获取子级权限
    for(let i=0; i<accessList.length; i++){
      let childAccessList = await accessModel.getChildAccessList(accessList[i].id)
      if(childAccessList){
        accessList[i].child = childAccessList
      }else{
        accessList[i].child = []
      }
    }
      return {
        status: 200,
        message: accessList
      }
    }
    return {
      status: 10003,
      message: '未找到操作对象'
    }
  },

   //添加权限
  async addAccess(data){
    let result = await accessModel.addAccess(data)
    if(result){
      return {
        status: 200,
        message: '操作成功'
      }
    }
    return {
      status: 10000,
      message: '操作失败'
    }
  },
   
}

module.exports = access