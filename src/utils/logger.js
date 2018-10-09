const config = require('config')
const Raven = require('raven')
Raven.config(config.sentryDSN).install()
module.exports = {
  debug (title, data) {
    captureMessage(title, 'debug', data)
  },
  log (title, data) {
    captureMessage(title, 'info', data)
  },
  info (title, data) {
    captureMessage(title, 'info', data)
  },
  warn (title, data) {
    captureMessage(title, 'warning', data)
  },
  error (title, data) {
    captureMessage(title, 'error', data)
  },
  fatal (title, data) {
    captureMessage(title, 'fatal', data)
  }
}
function captureMessage (title = 'title', level = 'info', data = '') {
  let allowLevels = ['debug', 'info', 'warning', 'error', 'fatal']
  if (allowLevels.indexOf(level) === -1) {
    level = 'info'
  }
  Raven.captureMessage(`[${config.appName}] ${title}`, {
    extra: toObject(data),
    level
  }, (err) => {
    if (err) {
      console.log(err)
    }
    console.log(title, data)
  })
}
function toObject (data = '') {
  if (typeof data === 'object') {
    return data
  }
  try {
    data = JSON.stringify(data)
  } catch (err) {
    data = 'json parse data error'
  }
  return {
    '_data': data
  }
}
