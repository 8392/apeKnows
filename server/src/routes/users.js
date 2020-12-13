const router = require('koa-router')()
const { login, register, getUserList, updateUserC } = require('../controller/user')
const { genValidator } = require('../middlewares/validator')
const { userSchema } = require('../db/model/User')
const userValidate = require('../validator/user')

router.prefix('/users')


/* 登录 */
router.post('/login', async (ctx, next) => {
  const result = await login(ctx.request.body)
  ctx.body = result
})

/*
  注册
*/
router.post('/register', genValidator(userValidate), async (ctx, next) => {
  const query = ctx.request.body
  let resQuery = {}
  for (let key in query) {  //筛选出要存入数据库的字段
    if (Object.keys(userSchema).includes(key)) {
      resQuery[key] = query[key]
    }
  }
  const result = await register(resQuery)
  ctx.body = result
})

/*
  获取用户列表
*/
router.get('/getUserList', async (ctx, next) => {
  const result = await getUserList()
  ctx.body = result
})

/*
  修改用户信息
*/
const validatorUserId = async (ctx, next) => {
  if (!ctx.request.body.userId) {
    ctx.body = {
      code: 999,
      message: '用户Id不能为空'
    }
    return
  }
  await next()
}
router.put('/updateUser', validatorUserId, genValidator(userValidate), async (ctx, next) => {
  const query = ctx.request.body
  const id = query.userId
  delete query.id
  const result = await updateUserC(id, query)
  ctx.body = result
})


module.exports = router
