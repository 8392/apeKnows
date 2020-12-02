const moment = require('moment')
const { User } = require('../db/model')

const createUser = async (query) => {
  const result = await User.create(query)
  return result.dataValues
}

const findUserList = async () => {
  const result = await User.findAndCountAll()
  const total = result.count

  console.log("result", result)
  const userList = result.rows.map((curr) => {
    const currData = curr.dataValues
    const { createdAt, updatedAt } = currData
    currData.createdAt = moment(createdAt).format('YYYY-MM-DD HH:mm:ss')
    currData.updatedAt = moment(updatedAt).format('YYYY-MM-DD HH:mm:ss')
    return currData
  })
  return userList
}

module.exports = {
  createUser,
  findUserList
}