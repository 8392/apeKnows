const router = require('koa-router')()
const jsonwebtoken = require('jsonwebtoken')
const { tokenSecret } = require('../config/jwt')
const { create, update, destroyC, articleDetail, getList } = require('../controller/article')
const { createUser } = require('../dao/user')
const { genValidator } = require('../middlewares/validator')
const articleValidate = require('../validator/article')

router.prefix('/article')


/* 创建文章 */
router.post('/addArtical', genValidator(articleValidate), async (ctx, next) => {
  let query = ctx.request.body
  const requestData = ['articleName', 'articleContent', 'articleImg', 'catalogId']
  const params = {}
  for(let key in query) {
    if(requestData.includes(key)) {
      params[key] = query[key]
    }
  }
  const result = await create(params)
  ctx.body = result
})

/*
  修改文章
*/
const validatorArticalId = async(ctx, next) => {
  let id = ''
  if(ctx.method === 'GET') {
    id = ctx.query.id
  }else {
    id = ctx.request.body.id
  }
  if(!id) {
    ctx.body = {
      code: 999,
      message: '文章id不能为空'
    }
    return
  }
  await next()
}

router.put('/updateArtical', validatorArticalId, genValidator(articleValidate), async (ctx, next) => {
  const query = ctx.request.body
  const id = query.id
  delete query.id
  const result = await update(id, query)
  ctx.body = result
})

/* 删除文章 */
router.delete('/delArtical', validatorArticalId, async (ctx, next) => {
  const id = ctx.request.body.id
  const result = await destroyC(id)
  ctx.body = result
})

/* 删除文章 */
router.delete('/delArtical', validatorArticalId, async (ctx, next) => {
  const id = ctx.request.body.id
  const result = await destroyC(id)
  ctx.body = result
})

/* 获取文章详情 */
router.get('/articleDetail', validatorArticalId, async (ctx, next) => {
  const id = ctx.query.id
  const result = await articleDetail(id)
  ctx.body = result
})

/* 获取文章列表 */
router.get('/getList', async (ctx, next) => {
  const query = {
    currPage: Number(ctx.query.currPage),
    pageSize: Number(ctx.query.pageSize)
  }
  const result = await getList(query)
  ctx.body = result
})

module.exports = router
