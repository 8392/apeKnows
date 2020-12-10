const router = require('koa-router')()
const jsonwebtoken = require('jsonwebtoken')
const { tokenSecret } = require('../config/jwt')
const { create, update, destroyC } = require('../controller/catalog')

router.prefix('/catalog')


/* 创建标签 */
router.post('/addCatalog', async (ctx, next) => {
  const token = ctx.request.header.authorization && ctx.request.header.authorization.split(' ')[1]
  const decoded = jsonwebtoken.verify(token, tokenSecret)
  const userId = decoded.data.id
  const query = {
    catalogName: ctx.request.body.catalogName,
    userId
  }
  const result = await create(query)
  ctx.body = result
})

/*
  修改标签
*/
router.put('/updateCatalog', async (ctx, next) => {
  const query = ctx.request.body
  const id = query.id
  if(!id) {
    ctx.body = {
      code: 502,
      message: '标签id不能为空'
    }
    return
  }
  if(!query.catalogName) {
    ctx.body = {
      code: 502,
      message: '标签名称不能为空'
    }
    return
  }
  const result = await update(id, {
    catalogName: query.catalogName
  })
  ctx.body = result
})

/* 删除标签 */

router.delete('/delCatalog', async (ctx, next) => {
  const id = ctx.request.body.id
  if(!id) {
    ctx.body = {
      code: 502,
      message: '标签id不能为空'
    }
    return
  }
  const result = await destroyC(id)
  ctx.body = result
})


module.exports = router
