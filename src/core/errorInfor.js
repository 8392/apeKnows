/*
  错误返回数据格式，code不为0时
*/
module.exports = {
  registerUserExist: {
    code: 10001,
    message: '用户名已存在'
  },
  tokenExpire: {
    code: 401,
    message: 'token已过期'
  },
  loginUserNo: {
    code: 10002,
    message: '用户名不存在'
  },
  alreadyLog: {
    code: 10003,
    message: '用户已在其它地方登录，请重新登录！'
  },
  tokenInvalid: {
    code: 10004,
    message: 'token无效！'
  }
}