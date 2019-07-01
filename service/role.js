/*
 * @Author: jwchan1996
 * @Date: 2019-07-01 23:33:02
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-07-01 23:35:31
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
const roleModel = require('../model/role')

const role ={

  //获取角色列表
  async getRoleList(pageNum, pageSize){
    let roleList = await roleModel.getRoleList(pageNum, pageSize)
    if(roleList){
      return {
        status: 200,
        message: roleList
      }
    }
    return {
      status: 10003,
      message: '未找到操作对象'
    }
  },
  
}

module.exports = role