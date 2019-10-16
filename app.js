/*
 * @Author: jwchan1996
 * @Date: 2019-05-21 10:08:31
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-10-11 23:57:52
 */
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const jwtKoa = require('koa-jwt')  // 用于路由权限控制
const app = new Koa()

const tokenUtil = require('./util/token')
const router = require('./router')

const jwtUnless = require('./util/jwt_unless')  //用于判断是否需要jwt验证

//配置ctx.body解析中间件
app.use(bodyParser())

// 错误处理
app.use((ctx, next) => {
  //获取token，保存全局变量
  if(ctx.request.header.authorization){
    global.token = ctx.request.header.authorization.split(' ')[1]
  }
  return next().then(() => {
    //判断不需要jwt验证的接口，跳过token续期判断
    if(jwtUnless.checkIsNonTokenApi(ctx)) return
    //判断token是否应该续期（有效时间）
    if(tokenUtil.getTokenRenewStatus()){
      //设置header
      ctx.set({
        new_token: tokenUtil.createNewToken()
      })
    }
  }).catch((err) => {
      if(err.status === 401){
          ctx.status = 401;
          ctx.body = {
            status: 401,
            message: '未携带token令牌或者token令牌已过期'
          }
      }else{
          throw err;
      }
  })
})

//配置不需要jwt验证的接口
app.use(jwtKoa({ secret: tokenUtil.secret }).unless({
  //自定义过滤函数，详细参考koa-unless
  custom: ctx => {
    if(jwtUnless.checkIsNonTokenApi(ctx)){
      return true
    }else{
      return false
    }
  }
}));

//初始化路由中间件
app.use(router.routes()).use(router.allowedMethods())

//监听启动窗口
app.listen(2333, () => console.log("PPAP.server is run on localhost:2333"))