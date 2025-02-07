import portMap from './config.json'

type PortMapKey = keyof typeof portMap
export const isDevelopment = process.env.NODE_ENV !== 'production'
// TODO
export const getPublicPath = (appName: PortMapKey) => {
  const port = portMap[appName].port
  //   const publicPath = portMap[appName].publicPath
  return `http://localhost:${!isDevelopment ? port + 1000 : port}/`
}

export const getPort = (appName: string) => {
  const name: PortMapKey = appName.replace(/@liutsing\//, '') as PortMapKey
  return portMap[name].port
}

export const configs = portMap
