const winston = require('winston')
const config = require('config')
const SLS = require('winston-sls')
require('winston-daily-rotate-file')

const logsPath = './logs'
let transports = [
  new winston.transports.Console(),
  new (winston.transports.DailyRotateFile)({
    name: 'info',
    filename: `${logsPath}/%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    maxSize: '10m',
    level: 'info'
  })
]

if (process.env['NODE_ENV'] === 'production') {
  transports.push(
    new (SLS)({
      accessKeyId: config.aliyun.key,
      secretAccessKey: config.aliyun.secret,
      endpoint: 'http://cn-shenzhen.log.aliyuncs.com',
      apiVersion: '2015-06-01',
      projectName: config.aliyun.sls.project,
      logStoreName: config.aliyun.sls.store,
      timeout: 5000, // 可选
      handleExceptions: true
    }))
}

const logger = new winston.Logger({
  transports
})

module.exports = logger
