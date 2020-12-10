const { createArticle, updateArticle, deleteArticle, getDetail, getArticleList } = require('../dao/article')
const { SuccessModel, ErrorModel, TableModel } = require('../core/resModel')

/*
  创建文章
 */
const create = async (query) => {
  const result = await createArticle(query)
  if(result === 1) {
    return new ErrorModel({
      code: 502,
      message: '文章名称已存在！'
    })
  }
  if (result) {
    return new SuccessModel('新增成功！')
  }
  return new ErrorModel({
    code: 502,
    message: '新增失败！'
  })
}

/*更新文章*/
const update = async (id, query)  => {
  const result = await updateArticle(id, query)
  if(result) {
    return new SuccessModel('修改成功！')
  }
  return new ErrorModel({
    code: 502,
    message: '修改失败！'
  })
}

/* 删除文章 */
const destroyC = async (id) => {
  const result = await deleteArticle(id)
  if(result) {
    return new SuccessModel('删除成功！')
  }
  return new ErrorModel({
    code: 502,
    message: '文章id不存在'
  })
}

/* 获取文章详情 */
const articleDetail = async (id) => {
  let result = await getDetail(id)
  const catalog = result.catalog.dataValues
  result = {
    ...result,
    ...catalog
  }
  delete result.catalog
  if(result) {
    return new SuccessModel(result)
  }
  return new ErrorModel({
    code: 502,
    message: '文章id不存在'
  })
}

/* 获取文章列表 */
const getList = async (query) => {
  const result = await getArticleList(query)
  return new TableModel(query, result)
}

module.exports = {
  create,
  update,
  destroyC,
  articleDetail,
  getList
}