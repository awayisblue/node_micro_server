let errCode = 2000
module.exports = {
  OK: {
    statusCode: 200,
    data: {
      code: 0,
      msg: 'OK'
    }
  },
  PARAM_ERROR: {
    statusCode: 400,
    data: {
      code: errCode++,
      msg: '参数错误'
    }
  },
  SERVER_ERROR: {
    statusCode: 500,
    data: {
      code: errCode++,
      msg: '服务器错误'
    }
  },
  DB_ERROR: {
    statusCode: 500,
    data: {
      code: errCode++,
      msg: '数据库错误'
    }
  },
  UNAUTHORIZED: {
    statusCode: 403,
    data: {
      code: errCode++,
      msg: '未登录'
    }
  }
}
