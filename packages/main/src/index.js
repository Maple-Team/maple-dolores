import App from './App'
import React from 'react'
import ReactDOM from 'react-dom'
import Garfish from 'garfish'
import { configs } from '@liutsing/config'

ReactDOM.render(<App />, document.getElementById('root'))

const escapedApps = ['vue3']
const protocol = window.location.protocol
const hostname = window.location.hostname

const apps = Object.keys(configs)
  .filter((k) => k !== 'main')
  .map((k) => {
    return {
      name: configs[k].pkgName,
      activeWhen:
        //   () => true, // NOTE 同时挂载多个子应用
        `/${k}`, // NOTE 根据路由激活
      entry: `${protocol}//${hostname}:${configs[k].port}`,
      sandbox: !escapedApps.includes(k), // vite下关闭沙箱
      domGetter: '#container',
    }
  })

console.log(apps)

Garfish.run({
  basename: '/',
  //   domGetter: '#container',
  apps,
})
