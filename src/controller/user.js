const { createUser, findUserList } = require('../dao/user')

const register = async (query) => {
  const result = await createUser(query)
  return {
    code: 0,
    data: result
  }
}

const getUserList = async () => {
  const res = await findUserList()
  return res
}

module.exports = {
  register,
  getUserList
}