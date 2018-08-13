const Router = require('koa-router')
const userRoute = require('./user/route')
const router = new Router()
const mysqlDB = require('../../clients/mysql')
const redisDB = require('../../clients/redis')
const error = require('../../utils/error-store')
const redisKeyStore = require('../../utils/redis-key-store')
const validate = require('validate.js')
router.use('/:group/users', userRoute.routes())
/**
 * @api {GET} /groups 获取groups列表
 * @apiSuccess {Number} code 状态码为0
 * @apiSuccess {String} msg 状态说明信息
 *
 * @apiErrorExample {JSON} error_code: 0
 *    {
 *        payload: {
 *          groups: [
 *             {
 *               id: 1,
 *               group_name: "name"
 *             }
 *          ]
 *        },
 *        code : 0,
 *        msg : 'OK'
 *   }
 */
router.get('/', async function (ctx, next) {
  let groups = await mysqlDB('group')
  ctx.body = {
    groups
  }
})
/**
 * @api {POST} /groups 创建group
 * @apiSuccess {Number} code 状态码为0
 * @apiSuccess {String} msg 状态说明信息
 *
 * @apiErrorExample {JSON} error_code: 0
 *    {
 *        payload: {
 *        },
 *        code : 0,
 *        msg : 'OK'
 *   }
 * @apiErrorExample {JSON} error_code: 2000
 *    {
 *        payload: {
 *        },
 *        code : 2000,
 *        msg : '参数错误'
 *   }
 */
router.post('/', async function (ctx, next) {
  let postBody = ctx.request.body
  let constrains = {
    group_name: {
      presence: {allowEmpty: false}
    }
  }
  if (validate(postBody, constrains)) {
    throw error.PARAM_ERROR
  }
  let ids = await mysqlDB('group').insert({
    group_name: postBody.group_name
  })
  await redisDB.hincrby(redisKeyStore.appData(), 'post-group', 1)
  ctx.body = {
    group_id: ids[0]
  }
})
module.exports = router
