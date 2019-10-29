/*
 * @Author: jwchan1996
 * @Date: 2019-07-01 23:35:41
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-07-06 11:21:24
 */

const util = require('../util')
const db = require('../util/db')

const role = {

  //获取角色列表
  async getRoleList(pageNum=1, pageSize=20){
    let start = (pageNum-1)*pageSize
    let sql = 'SELECT * FROM role WHERE id!=1 LIMIT ?,?'
    let result = await db.query(sql, [start, pageSize])
    if(Array.isArray(result) && result.length > 0){
      return result
    }
    return false
  },

  //添加角色
  async addRole(data){
    let sql = 'INSERT INTO role(name,create_time,update_time,description) VALUES(?,?,?,?)'
    let values = [
      data.name,
      util.changeTimeToStr(new Date()),
      util.changeTimeToStr(new Date()),
      data.description
    ]
    let result = await db.query(sql, [...values])
    if(result.insertId){
      return result.insertId
    }
    return false
  },

  //获取角色信息(根据id)
  async getRole(id){
    let sql = 'SELECT * FROM role WHERE id=?'
    let result = await db.query(sql, [id])
    if(Array.isArray(result) && result.length > 0){
      return result[0]
    }
    return false
  },

  //删除角色数据
  async deleteRole(id){
    let sql = 'DELETE FROM role WHERE id=?'
    let result = await db.query(sql, [id])
    if(result.affectedRows){
      return true
    }
    return false
  },

  //修改角色信息
  async updateRole(id, data){
    let sql = 'UPDATE role SET name=?,description=?,update_time=? WHERE id=?'
    let values = [
      data.name,
      data.description,
      util.changeTimeToStr(new Date())
    ]
    let result = await db.query(sql, [...values, id])
    if(result){
      return true
    }
    return false
  },

  //获取角色权限
  async getRoleAccess(id){
    //获取一级权限
    let sql = `SELECT a.id,a.sid,a.name,a.code
      FROM access AS a,role_access_relation AS rar
      WHERE rar.access_id=a.id AND rar.role_id=? AND a.sid=0`
    let result = await db.query(sql, [id])
    if(Array.isArray(result) && result.length > 0){
      //获取子权限
      for(let i=0; i<result.length; i++){
        let sql = `SELECT child.id,child.sid,child.name,child.code
          FROM access AS child,access AS parent,role_access_relation AS rar
          WHERE child.sid=parent.id AND rar.role_id=? AND rar.access_id=child.id AND parent.id=?`
        let res = await db.query(sql, [id, result[i].id])
        if(Array.isArray(res) && res.length > 0){
          result[i].child = res
        }else{
          result[i] = []
        }
      }
      return result
    }
    return false
  },

  //删除角色权限关联记录
  async deleteRoleAccessRelation(id){
    let sql = 'DELETE FROM role_access_relation WHERE role_id=?'
    let result = await db.query(sql, [id])
    if(result.affectedRows){
      return true
    }
    return false
  },

  //添加角色权限关联记录
  async addRoleAccessRelation(id, data){
    let accessArr = data.access.split(',')
    let result
    for(let i=0; i<accessArr.length; i++){
      let sql = 'INSERT INTO role_access_relation(role_id,access_id) VALUES(?,?)'
      result = await db.query(sql, [id, accessArr[i]])
    } 
    if(result.affectedRows){
      return true
    }
    return false
  },

}

module.exports = role