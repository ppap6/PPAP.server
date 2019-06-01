const Koa = require('koa')
const path = require('path')
const KoaRouter = require('koa-router')
const bodyParser = require('koa-bodyparser')
const app = new Koa()
const router = new KoaRouter()

app.use(bodyParser())

router.get('/', async(ctx) => {
    ctx.body = `我是首页面,我的文件路径是在${path.join(__dirname)}下的app.js`
})

// 配置路由模块
app.use(router.routes()).use(router.allowedMethods())

app.listen(2333, () => console.log("koa demo is run on localhost:2333"))