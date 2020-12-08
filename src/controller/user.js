const { createUser, findUserList } = require('../dao/user')
const { SuccessModel, ErrorModel } = require("../core/resModel")
const { registerUserExist } = require('../core/errorInfor')

const register = async (query) => {
  const result = await createUser(query)
  if (result) {
    return new SuccessModel(result)
  }
  return new ErrorModel(registerUserExist)
}

const getUserList = async () => {
  const result = await findUserList()
  return result
}

module.exports = {
  register,
  getUserList
}