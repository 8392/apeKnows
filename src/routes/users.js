const router = require('koa-router')()
const jsonwebtoken = require('jsonwebtoken')
const { tokenSecret } = require('../config/jwt')
const {get, set} = require('../cache/_redis')
const { register, getUserList } = require('../controller/user')
const {genValidator} = require('../middlewares/validator')
const userValidate = require('../validator/user')

router.prefix('/users')

router.post('/login', async (ctx, next) => {
  const infor = ctx.request.body
  const userId = ctx.request.body.id.toString()
  // console.log('toekn',  ctx.request.header)
  // const res =  await get(userId)

  const token = jsonwebtoken.sign({
    data: infor,
    // 设置 token 过期时间
    exp: Math.floor(Date.now() / 1000) + (60 * 60), // 60 seconds * 60 minutes = 1 hour
  }, tokenSecret)

  set(userId, token) //设置token到redis中
  ctx.body = {
    token
  }

})


/*
  注册
*/
router.post('/register', genValidator(userValidate), async (ctx, next) => {
  // console.log('query', ctx.request.body)
  // register()
  const queryArr = ['userName', 'password', 'nickName', 'gender', 'picture', 'city']

  ctx.body = {
    code: 0,
    msg: '注册成功！'
  }
})

/*
  获取用户列表
*/
router.get('/getUserList', async (ctx, next) => {
  const res = await getUserList()
  ctx.body = {
    code: 0,
    data: res
  }
})


module.exports = router
