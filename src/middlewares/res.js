const error = require('../utils/error-store')
const logger = require('../utils/logger')

module.exports = function () {
  return async (ctx, next) => {
    try {
      await next()
      if (typeof ctx.body === 'string') {
        // 支持页面返回
        ctx.set('Content-Type', 'text/html; charset=utf8')
        ctx.status = ctx.status || error.OK.statusCode
      } else {
        let res = {
          payload: ctx.body || {}
        }
        ctx.status = ctx.status || error.OK.statusCode
        ctx.body = Object.assign(res, error.OK.data)
      }
    } catch (err) {
      if (err.statusCode && err.data) { // 自定义的错误
        ctx.status = err.statusCode
        ctx.body = ctx.body = Object.assign({
          payload: ctx.body || {}
        }, err.data)
      } else {
        logger.error('unexpected error', {
          err: err
        })
        console.log(err)
        ctx.status = error.SERVER_ERROR.statusCode
        ctx.body = ctx.body = Object.assign({
          payload: ctx.body || {}
        }, error.SERVER_ERROR.data)
      }
    }
  }
}
