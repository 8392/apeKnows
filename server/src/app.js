const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const jwt = require('koa-jwt')
const { tokenSecret } = require('./config/jwt')

const users = require('./routes/users')
const catalogs = require('./routes/catalogs')
const article = require('./routes/article')
const catchError = require('./middlewares/exception')  //token 过期，没有token验证中间件
const deviceLoginOne = require('./middlewares/deviceLoginOne') //不同设备只能等了一次，验证中间件


// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))

app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/uploadFile'))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use(catchError) //token验证中间件
app
  .use(jwt({
    secret: tokenSecret,
  }).unless({
    path: [/\/register/, /\/login/],
  })).use(deviceLoginOne)


// routes
app.use(users.routes(), users.allowedMethods())
app.use(catalogs.routes(), catalogs.allowedMethods())
app.use(article.routes(), article.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
