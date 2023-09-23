import ReactDOM from 'react-dom'
import React from 'react'
import { reactBridge } from '@garfish/bridge-react'
import RootComponent from './App'
import ErrorBoundary from './ErrorBoundary'

let _root
let _props
const getRootDom = (dom) => (dom ? dom.querySelector('#root') : document.querySelector('#root'))

export const render = () => ReactDOM.render(<RootComponent {..._props} />, _root)

export const provider = reactBridge({
  el: '#root', //mount node
  // NOTE 方式1
  // a promise that resolves with the react component. Wait for it to resolve before mounting
  //   loadRootComponent: (appInfo) => {
  //     _root = getRootDom(appInfo.dom)
  //     _props = appInfo
  //     console.log(appInfo)
  //     return Promise.resolve(() => <RootComponent {...appInfo} />)
  //   },
  // NOTE 方式2
  rootComponent: RootComponent,
  errorBoundary: (e) => <ErrorBoundary />,
})

// 这能够让子应用独立运行起来，以保证后续子应用能脱离主应用独立运行，方便调试、开发
if (!window.__GARFISH__) {
  ReactDOM.render(
    // TODO production
    <RootComponent basename={process.env.NODE_ENV === 'production' ? '/react17' : '/'} />,
    document.querySelector('#root')
  )
}
