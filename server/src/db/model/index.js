const { User } = require('./User')
const Catalog = require('./Catalog')
const Article = require('./Article')

Catalog.hasMany(Article)
Article.belongsTo(Catalog, {
  foreignKey: 'catalogId'
})

User.hasMany(Catalog)
Catalog.belongsTo(User, {
  foreignKey: 'userId'
})

module.exports = {
  User,
  Catalog,
  Article
}