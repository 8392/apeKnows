const jsonwebtoken = require('jsonwebtoken')
const { get, set } = require('../cache/_redis')
const { tokenSecret } = require('../config/jwt')
const { tokenExpire, alreadyLog, tokenInvalid } = require('../core/errorInfor')
const { ErrorModel } = require('../core/resModel')

const testLogin = async (ctx, next) => {
  const token = ctx.request.header.authorization && ctx.request.header.authorization.split(' ')[1]
  const decoded = jsonwebtoken.verify(token, tokenSecret)
  const redisToken =  await get(decoded.data.id)
  if(redisToken === token) {
    ctx.body = new ErrorModel(alreadyLog)
  }else {
    await next()
  }
}

module.exports = testLogin
