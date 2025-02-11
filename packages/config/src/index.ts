import portMap from './config.json'

type PortMapKey = keyof typeof portMap
export const isDevelopment = process.env.NODE_ENV !== 'production'

const getAppName = (name: string) => {
  return name.replace(/@liutsing\//, '') as PortMapKey
}
export const getPublicPath = (name: string) => {
  const port = portMap[getAppName(name)].port
  // TODO 动态下发？
  return `http://localhost:${!isDevelopment ? port + 1000 : port}/`
}

export const getPort = (name: string) => {
  const appName: PortMapKey = getAppName(name)
  return portMap[appName].port
}

export const configs = portMap
