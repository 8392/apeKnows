
const { tokenExpire } = require('../core/errorInfor')
const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    if (error.status === 401) {
      ctx.body = tokenExpire
    }
  }
}

module.exports = catchError
