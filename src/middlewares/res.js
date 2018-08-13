const error = require('../utils/error-store')
const logger = require('../utils/logger')

module.exports = function () {
  return async (ctx, next) => {
    try {
      await next()
      let res = {
        payload: ctx.body || {}
      }
      ctx.status = error.OK.statusCode
      ctx.body = Object.assign(res, error.OK.data)
    } catch (err) {
      if (err.statusCode && err.data) { // 自定义的错误
        ctx.status = err.statusCode
        ctx.body = ctx.body = Object.assign({
          payload: ctx.body || {}
        }, err.data)
      } else {
        logger.error(err)
        ctx.status = error.SERVER_ERROR.statusCode
        ctx.body = ctx.body = Object.assign({
          payload: ctx.body || {}
        }, error.SERVER_ERROR.data)
      }
    }
  }
}
