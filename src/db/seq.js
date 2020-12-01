const { Sequelize } = require('sequelize')

const seq = new Sequelize('apeKnows', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql'
})

module.exports = seq