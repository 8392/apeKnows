const { reset } = require('nodemon')
const { User } = require('../db/model')

const createUser = async () => {
  const result = await User.create({
    userName: 'userName1',
    password: '123456',
    created_at: '222',
    nickName: 'nickName1',
    gender: 1,
  })
  console.log('result', result)
  return result.dataValues
}

const findUserList = async () => {
  const result = await User.findAndCountAll()
  const userList = result.rows.map((curr) => {
    return curr.dataValues
  })
  return userList
}

module.exports = {
  createUser,
  findUserList
}