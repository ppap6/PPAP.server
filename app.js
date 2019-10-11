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

//定义不需要token的接口数组
const nonTokenApiArr = [
  '/user/login',
  '/user/register',
]

//配置ctx.body解析中间件
app.use(bodyParser())

// 错误处理
app.use((ctx, next) => {
  //获取token，保存全局变量
  if(ctx.request.header.authorization){
    global.token = ctx.request.header.authorization.split(' ')[1]
  }
  return next().then(() => {
    // 设置login、register接口，不需要判断token续期
    if(nonTokenApiArr.includes(ctx.path)){
      return
    }
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

app.use(jwtKoa({ secret: tokenUtil.secret }).unless({
  // 设置login、register接口，可以不需要认证访问
  path: nonTokenApiArr
}));

//初始化路由中间件
app.use(router.routes()).use(router.allowedMethods())

//监听启动窗口
app.listen(2333, () => console.log("PPAP.server is run on localhost:2333"))