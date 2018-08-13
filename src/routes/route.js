const Router = require('koa-router')
const groupRoute = require('./group/route')
const router = new Router()

router.use('/groups', groupRoute.routes())
module.exports = router
