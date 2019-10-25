/**
 * 用于判断客户端当前请求接口是否需要jwt验证
 */

//定义不需要jwt验证的接口数组
const nonTokenApiArr = [
  '/',
  //user模块
  '/user/login',
  '/user/register',
  //topic模块
  '/topic',
  //post模块
  '/post',
  '/post/add/pv',
  //person模块
  '/person/post',
  '/person/comment',
  '/person/answer',
  '/person/fans',
  '/person/follow',
  '/person/like',
  '/person/collect',
  '/person/topic',
  //search模块
  '/search/post',
  '/search/user'
]

//定义不需要jwt验证的接口正则数组(都是get方法)
const nonTokenApiRegArr = [
  /^\/user\/\d/,
  /^\/topic\/\d/, 
  /^\/post\/\d/, 
  /^\/comment\/post\/\d/, 
  /^\/comment\/\d/, 
  /^\/answer\/comment\/\d/, 
  /^\/answer\/\d/, 
]

//判断请求api是否在数组里
const isNonTokenApi = (path) => {
  return nonTokenApiArr.includes(path)
}

//判断请求api是否在正则数组里
const isNonTokenRegApi = (path) => {
  return nonTokenApiRegArr.some(p => {
    return (typeof p === 'string' && p === path) ||
      (p instanceof RegExp && !! p.exec(path))
  });
}

//判断当前请求api是否不需要jwt验证
const checkIsNonTokenApi = (ctx) => {
  if(isNonTokenApi(ctx.path) || (isNonTokenRegApi(ctx.path) && ctx.method == 'GET')){
    return true
  }else{
    return false
  }
}

module.exports = {
  nonTokenApiArr,
  nonTokenApiRegArr,
  isNonTokenApi,
  isNonTokenRegApi,
  checkIsNonTokenApi
}