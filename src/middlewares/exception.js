const catchError = async (ctx, next) => {
  try {
    console.log('路过')
    await next()
  } catch (error) {
    if(error.status == 401) {
      ctx.body = {
        code: 401,
        msg: 'token已过期'
      }
    }
  }
}

module.exports = catchError
