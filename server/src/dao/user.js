const moment = require('moment')
const { User } = require('../db/model')

// 查询用户名是否存在
const findUserName = async (userName) => {
  const isUser = await User.findOne({
    where: { userName: userName }
  })
  return isUser
}

const createUser = async (query) => {
  const isUser = await findUserName(query.userName)
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
    const currData = curr.dataValues
    const { createdAt, updatedAt } = currData
    currData.createdAt = moment(createdAt).format('YYYY-MM-DD HH:mm:ss')
    currData.updatedAt = moment(updatedAt).format('YYYY-MM-DD HH:mm:ss')
    return currData
  })
  return userList
}

/*
  修改用户信息
*/
const updateUser = async (id, query) => {
  const result = await User.update(query, {
    where: {
      id
    }
  })
  return result[0] === 1
}

module.exports = {
  findUserName,
  createUser,
  findUserList,
  updateUser
}