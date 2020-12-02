const User = require('./User')
const Catalog = require('./Catalog')
const Article = require('./Article')

Catalog.hasMany(Article)
Article.belongsTo(Catalog, {
  foreignKey: 'catalogId'
})

User.hasMany(Article)
Article.belongsTo(User, {
  foreignKey: 'userId'
})

module.exports = {
  User,
  Catalog,
  Article
}