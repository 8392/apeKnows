const router = require('koa-router')()

router.prefix('/users')

router.get('/', async (ctx, next) => {
  ctx.body = 'this is a users response!'
})


module.exports = router
