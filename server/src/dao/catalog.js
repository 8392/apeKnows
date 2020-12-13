const moment = require('moment')
const { User, Catalog } = require('../db/model')

// 创建标签
const createCatalog = async (query) => {
  const isCatalog = await Catalog.findOne({
    where: {catalogName: query.catalogName}
  })
  if(isCatalog) {
    return 1
  }
  const result = await Catalog.create(query)
  return result
}

/* 修改 */
const updateCatalog = async (id, query) => {
  const result = await Catalog.update(query, {
    where: {
      id
    }
  })
  return result[0] === 1
}

/* 删除 */
const deleteCatalog = async (id) =>{
  const result = await Catalog.destroy({
    where: { id }
  })
  return result === 1
}

module.exports = {
  createCatalog,
  updateCatalog,
  deleteCatalog
}