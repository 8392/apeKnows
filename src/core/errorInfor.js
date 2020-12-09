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
  }
}