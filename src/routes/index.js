const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const { tokenSecret } = require('../config/jwt')
const {get, set} = require('../cache/_redis')

router.get('/json', async (ctx, next) => {
  // const token = ctx.request.header.authorization.split(' ')[1]
  // console.log('token', token)
  // const decode = jwt.verify(token, tokenSecret)
  // const userId = decode.data.id.toString()
  // const redisToken = await get(userId)

  // console.log('token', token)

  // if(redisToken === token) {
  //   ctx.body = {
  //     code: 0,
  //     msg: '成功请求数据'
  //   }
  // }else {
  //   ctx.body = {
  //     code: 400,
  //     msg: '已在其它地方登陆，请从新登陆'
  //   }
  // }

  ctx.body = {
    code: 0,
    msg: '成功请求数据'
  }

})


router.get('/test', async (ctx, next) => {
  // ctx.body = 'this is a users response!'
  ctx.body = {
    code: 0,
    msg: '已在其它地方登陆，请从新登陆'
  }
  ctx.response.status = 500
})

module.exports = router
