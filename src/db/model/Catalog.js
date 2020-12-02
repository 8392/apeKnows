
const seq = require('../seq')
const { STRING } = require('sequelize')

const Catalog = seq.define('catalog', {
  catalogName: {
    type: STRING,
    allowNull: false,
    unique: true,
    comment: '种类名称'
  }
})

module.exports = Catalog
