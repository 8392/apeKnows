const moment = require('moment')
const { User, Catalog, Article } = require('../db/model')

// 创建文章
const createArticle = async (query) => {
  const isArticle = await Article.findOne({
    where: {articleName: query.articleName}
  })
  if(isArticle) {
    return 1
  }
  const result = await Article.create(query)
  return result
}

/* 修改 */
const updateArticle = async (id, query) => {
  const result = await Article.update(query, {
    where: {
      id
    }
  })
  return result[0] === 1
}

/* 删除 */
const deleteArticle = async (id) =>{
  const result = await Article.destroy({
    where: { id }
  })
  return result === 1
}

/* 获取文章详情 */
const getDetail = async (id) => {
  // const result = await Article.findOne({})
  const result = await Article.findOne({
    where: { id },
    include: [{
      model: Catalog,
      attributes: ['catalogName']
    }]
  })
  if(result) {
    return result.dataValues
  }
  return result
}

/* 获取文章列表 */
const getArticleList = async ({currPage, pageSize}) => {
  const result = await Article.findAndCountAll({
    offset: pageSize * (currPage - 1),
    limit: currPage
  })
  return result
}

module.exports = {
  createArticle,
  updateArticle,
  deleteArticle,
  getDetail,
  getArticleList
}