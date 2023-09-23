import App from './App'
import React from 'react'
import ReactDOM from 'react-dom'
import Garfish from 'garfish'
import configs from '../../../build/config.json'


ReactDOM.render(<App />, document.getElementById('root'))
const escapedApps = ['react-taste', 'admin', 'solidjs-taste', 'svelte-taste']
const protocol = window.location.protocol
const pathname = window.location.pathname
const apps = Object.keys(configs)
  .filter((k) => k !== 'main')
  .map((k) => ({
    name: configs[k].pkgName,
    activeWhen: k,
    entry: `${protocol}://${pathname}:${configs[k].port}`,
    sandbox: !escapedApps.includes(k), // vite下关闭沙箱
  }))

Garfish.run({
  basename: '/',
  domGetter: '#container',
  apps,
})
