const { createUser, findUserList } = require('../dao/user')

const register = async () => {
  createUser()
}

const getUserList = async () => {
  const res = await findUserList()
  return res
}

module.exports = {
  register,
  getUserList
}