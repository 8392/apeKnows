const { createUser, findUserList, findUserName } = require('../dao/user')
const { SuccessModel, ErrorModel } = require('../core/resModel')
const { registerUserExist, loginUserNo, alreadyLog } = require('../core/errorInfor')
const jsonwebtoken = require('jsonwebtoken')
const { tokenSecret } = require('../config/jwt')
const { get, set } = require('../cache/_redis')

/*
  查询用户名是否存在
*/
const login = async (query) => {
  const result = await findUserName(query.userName)
  const expire = Math.floor(Date.now() / 1000) + (60 * 60)
  if (!result) {
    return new ErrorModel(loginUserNo)
  }
  const userInfor = result.dataValues
  const userId = userInfor.id
  const token = jsonwebtoken.sign({
    data: userInfor,
    // 设置 token 过期时间
    exp: expire
  }, tokenSecret)
  set(userId, token, expire) //设置token到redis中
  return new SuccessModel(token)
}

/*
  注册
 */
const register = async (query) => {
  const result = await createUser(query)
  if (result) {
    return new SuccessModel(result)
  }
  return new ErrorModel(registerUserExist)
}

/*
  获取用户列表
*/
const getUserList = async () => {
  const result = await findUserList()
  return new SuccessModel(result)
}

module.exports = {
  login,
  register,
  getUserList
}