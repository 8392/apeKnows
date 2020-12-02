
const validate = require('../validator/_validate')
/**
 * 生成 json schema 验证的中间件
 * @param {function} validateFn 验证函数
 */

const genValidator = (SCHEMA) => {
  // 定义中间件函数
  async function validator(ctx, next) {
    const data = ctx.request.body
    const error = validate(SCHEMA, data)
    if (error) {
      // 验证失败
      ctx.body = {
        code: 10009,
        message: error.message
      }
      return
    }
    // 验证成功，继续
    await next()
  }
  // 返回中间件
  return validator
}

module.exports = {
  genValidator
}
