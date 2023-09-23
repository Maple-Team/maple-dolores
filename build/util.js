const portMap = require('./config.json')
const isDevelopment = process.env.NODE_ENV !== 'production'

const getPublicPath = (appName) => {
  const port = portMap[appName].port
  //   const publicPath = portMap[appName].publicPath
  return `http://localhost:${port}`
}

const getPort = (appName) => {
  const name = appName.replace(/@liutsing\//, '')
  return portMap[name].port
}
module.exports = {
  isDevelopment,
  getPublicPath,
  getPort,
}
