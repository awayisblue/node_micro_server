const Router = require('koa-router')
const router = new Router()
const validate = require('validate.js')
const error = require('../../../utils/error-store')
const redisKeyStore = require('../../../utils/redis-key-store')
const redisDB = require('../../../clients/redis')
const mysqlDB = require('../../../clients/mysql')
/**
 * @api {POST} /group/:group/users 创建某个群组下的用户
 *
 * @apiSuccess {Number} code 状态码为0
 * @apiSuccess {String} msg 状态说明信息
 *
 * @apiErrorExample {JSON} error_code: 0
 *    {
 *        payload: {
 *          user_id: 1
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
  let group = ctx.params.group
  let postBody = ctx.request.body
  let constrains = {
    user_name: {
      presence: {allowEmpty: false}
    }
  }
  if (validate(postBody, constrains)) {
    throw error.PARAM_ERROR
  }
  let ids = await mysqlDB('user').insert({
    user_name: postBody.user_name,
    group_id: group
  })
  await redisDB.hincrby(redisKeyStore.appData(), 'post-user', 1)
  ctx.body = {
    user_id: ids[0]
  }
})

/**
 * @api {GET} /groups/:group/users 获取某个群组下的所有用户
 * @apiName group
 * @apiGroup /
 *
 * @apiSuccess {Number} code 状态码为0
 * @apiSuccess {String} msg 状态说明信息
 *
 * @apiErrorExample {JSON} error_code: 0
 *    {
 *        payload: {
 *          users: [
 *            {
 *               id: 1,
 *               user_name: 'TOM'
 *            }
 *          ]
 *        },
 *        code : 0,
 *        msg : 'OK'
 *   }
 */
router.get('/', async function (ctx, next) {
  let group = ctx.params.group
  let users = await mysqlDB('user').where({
    group_id: group
  })
  ctx.body = {
    users
  }
})
module.exports = router
