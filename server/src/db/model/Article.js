
const seq = require('../seq')
const { STRING, TEXT, INTEGER } = require('sequelize')

const Article = seq.define('article', {
  articleName: {
    type: STRING,
    allowNull: false,
    unique: true,
    comment: '文章名称'
  },
  articleContent: {
    type: TEXT,
    allowNull: false,
    comment: '文章内容'
  },
  articleImg: {
    type: STRING,
    allowNull: true,
    comment: '文章图片'
  },
  browse: {
    type: INTEGER,
    allowNull: true,
    defaultValue: 0,
    comment: '文章浏览次数'
  },
  catalogId: {
    type: INTEGER,
    allowNull: false,
    comment: '种类ID'
  },
})

module.exports = Article
