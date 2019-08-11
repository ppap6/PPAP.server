/*
 * @Author: jwchan1996
 * @Date: 2019-05-21 10:08:31
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-08-11 23:42:38
 */
const Koa = require('koa')
const path = require('path')
const bodyParser = require('koa-bodyparser')
const jwt = require('jsonwebtoken') // 用于签发、解析`token`
const jwtKoa = require('koa-jwt')  // 用于路由权限控制
const app = new Koa()

const router = require('./router')

//配置ctx.body解析中间件
app.use(bodyParser())

// 错误处理
app.use((ctx, next) => {
  return next().catch((err) => {
      if(err.status === 401){
          ctx.status = 401;
          ctx.body = {
            status: 401,
            message: 'Protected resource, use Authorization header to get access'
          }
      }else{
          throw err;
      }
  })
})

const secret = 'secret'
app.use(jwtKoa({ secret: secret }).unless({
  // 设置login、register接口，可以不需要认证访问
  path: [
      /^\/user\/login/,
  ]
}));

//初始化路由中间件
app.use(router.routes()).use(router.allowedMethods())

//监听启动窗口
app.listen(2333, () => console.log("koa demo is run on localhost:2333"))