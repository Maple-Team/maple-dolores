import { reactBridge } from '@garfish/bridge-react-v18'
import React from 'react'
import { createRoot } from 'react-dom/client'
import ErrorPage from './error-page'
import { RootComponent } from '.'

export const provider = reactBridge({
  el: '#root',
  rootComponent: RootComponent,
  errorBoundary: () => <ErrorPage />,
})

// NOTE 非Garfish环境下
if (!window.__GARFISH__) {
  const container = document.getElementById('root')
  const root = createRoot(container!, {
    identifierPrefix: 'id',
    onRecoverableError: (error) => {
      console.error('Recoverable error', error)
    },
  })

  root.render(<RootComponent basename="/" />)
}
// 测试父子流水线2
