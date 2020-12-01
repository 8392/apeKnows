const router = require('koa-router')()
const jsonwebtoken = require("jsonwebtoken")
const { tokenSecret } = require("../config/jwt")

router.prefix('/users')

router.get('/login', async (ctx, next) => {
  // ctx.body = 'this is a users response!'
  const infor = {
    userName: '张三',
    password: '123456'
  }

  const token = jsonwebtoken.sign({
    data: infor,
    // 设置 token 过期时间
    exp: Math.floor(Date.now() / 1000) + (60 * 60), // 60 seconds * 60 minutes = 1 hour
  }, tokenSecret)

  ctx.body = {
    token
  }

})

router.get('/register', async (ctx, next) => {
  ctx.body = 'this is a users response!'
})


module.exports = router
