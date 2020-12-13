const { createCatalog, updateCatalog, deleteCatalog } = require('../dao/catalog')
const { SuccessModel, ErrorModel } = require('../core/resModel')
const { destroy } = require('../db/model/Catalog')

/*
  创建标签
 */
const create = async (query) => {
  if(!query.catalogName) {
    return {
      code: 502,
      message: '标签名称不能为空'
    }
  }
  const result = await createCatalog(query)
  if(result === 1) {
    return new ErrorModel({
      code: 502,
      message: '标签名已存在'
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

/*
  更新标签
*/

const update = async (id, query)  => {
  const result = await updateCatalog(id, query)
  if(result) {
    return new SuccessModel('修改成功！')
  }
  return new ErrorModel({
    code: 502,
    message: '修改失败！'
  })
}

const destroyC = async (id) => {
  const result = await deleteCatalog(id)
  if(result) {
    return new SuccessModel('删除成功！')
  }
  return new ErrorModel({
    code: 502,
    message: '标签id不存在'
  })
}

module.exports = {
  create,
  update,
  destroyC
}