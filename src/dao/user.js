const moment = require('moment')
const { User } = require('../db/model')

const createUser = async (query) => {
  // 查询用户名是否存在
  const isUser = await User.findOne({
    where: { userName: query.userName }
  })
  if (!isUser) { //没找到当前用户
    const result = await User.create(query)
    return '注册成功！'
  } else {
    return null
  }
}

const findUserList = async () => {
  const result = await User.findAndCountAll()
  const userList = result.rows.map((curr) => {
    console.log("curr", curr)
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