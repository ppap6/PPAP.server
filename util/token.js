/*
 * @Author: jwchan1996
 * @Date: 2019-09-05 09:15:19
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-09-10 01:15:06
 */
const jwt = require('jsonwebtoken')
const secret = 'secret'

//判断token是否应该更新有效期（续期）
const getTokenRenewStatus = () => {

  //检测当前token是否到达续期时间段
  let obj = parseToken()
  //解析token携带的信息
  global.uid = obj.uid
  global.name = obj.name
  global.account = obj.account
  global.roleId = obj.roleId
  //更新时间段在过期前3天
  if(obj.exp - new Date().getTime()/1000 > 60*60*24*3){
    return false
  }else{
    return true
  }

}

//获取一个期限为7天的token
const getToken = (payload = {}) => {
  return jwt.sign(payload, secret, { expiresIn: 60*60*24*7 });
}

//重新生成一个期限为7天的token
const createNewToken = () => {

  let token = global.token
  let obj = jwt.verify(token, secret)
  let payload = {
    account: obj.account,
    password: obj.password
  }
  return getToken(payload)

}

//解析token为对象
const parseToken = () => {
  
  let token = global.token
  return jwt.verify(token, secret)

}

module.exports = {
  secret,
  getTokenRenewStatus,
  getToken,
  createNewToken,
  parseToken
}