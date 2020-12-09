const router = require('koa-router')()
const { userNameExit, register, getUserList } = require('../controller/user')
const { genValidator } = require('../middlewares/validator')
const { userSchema } = require('../db/model/User')
const userValidate = require('../validator/user')

router.prefix('/users')


/* 登录 */
router.post('/login', async (ctx, next) => {
  const result = await userNameExit(ctx.request.body)
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


module.exports = router
