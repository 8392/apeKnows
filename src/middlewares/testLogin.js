const jsonwebtoken = require('jsonwebtoken')
const { get, set } = require('../cache/_redis')
const { tokenSecret } = require('../config/jwt')
const { alreadyLog } = require('../core/errorInfor')
const { ErrorModel } = require('../core/resModel')

const noLoginRout = ['/users/register', '/users/login']
const testLogin = async (ctx, next) => {
  if (noLoginRout.includes(ctx.url)) {
    await next()
    return
  }
  const token = ctx.request.header.authorization && ctx.request.header.authorization.split(' ')[1]
  const decoded = jsonwebtoken.verify(token, tokenSecret)
  const redisToken = await get(decoded.data.id)
  if (redisToken === token) { //只能在不同设备上登录一次
    await next()
  } else {
    ctx.body = new ErrorModel(alreadyLog)
  }
}

module.exports = testLogin
