const config = require('config')
function compose (...rest) {
  return rest.join(':')
}
// 综合管理redis的key
// 应用配置
let appName = config.appName || 'appName'
module.exports.appData = function () {
  return compose('app', appName, 'data')
}
