import App from './App'
import React from 'react'
import ReactDOM from 'react-dom'
import Garfish from 'garfish'
import configs from '../../../build/config.json'

ReactDOM.render(<App />, document.getElementById('root'))

const escapedApps = ['admin']
const protocol = window.location.protocol
const hostname = window.location.hostname

const apps = Object.keys(configs)
  .filter((k) => k !== 'main')
  .map((k) => {
    return {
      name: configs[k].pkgName,
      activeWhen: k,
      entry: `${protocol}//${hostname}:${configs[k].port}`,
      sandbox: !escapedApps.includes(k), // vite下关闭沙箱
    }
  })

Garfish.run({
  basename: '/',
  domGetter: '#container',
  apps,
})
