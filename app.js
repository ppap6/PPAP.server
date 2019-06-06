const Koa = require('koa')
const path = require('path')
const bodyParser = require('koa-bodyparser')
const app = new Koa()

const router = require('./router')

//配置ctx.body解析中间件
app.use(bodyParser())

//初始化路由中间件
app.use(router.routes()).use(router.allowedMethods())

//监听启动窗口
app.listen(2333, () => console.log("koa demo is run on localhost:2333"))