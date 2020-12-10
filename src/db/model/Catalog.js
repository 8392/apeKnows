
const seq = require('../seq')
const { STRING, INTEGER } = require('sequelize')

const Catalog = seq.define('catalog', {
  catalogName: {
    type: STRING,
    allowNull: false,
    unique: true,
    comment: '种类名称'
  },
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户ID'
  }
})

module.exports = Catalog
