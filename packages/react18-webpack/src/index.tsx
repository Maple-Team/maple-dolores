// import './wdyr'
import React from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import './assets/svg-icons'
import 'antd/dist/reset.css'
import { reactBridge } from '@garfish/bridge-react-v18'
import { App } from './App'

const RootComponent = ({ basename }: { basename: string }) => <App basename={basename} />
export const provider = reactBridge({
  el: '#root',
  rootComponent: RootComponent,
  errorBoundary: (e) => <div>{JSON.stringify(e)}</div>,
})

if (!window.__GARFISH__) {
  const container = document.getElementById('root')
  const root = createRoot(container!)
  root.render(<RootComponent basename="/" />)
}
