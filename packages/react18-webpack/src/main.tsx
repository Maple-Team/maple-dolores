import { reactBridge } from '@garfish/bridge-react-v18'
import { createRoot } from 'react-dom/client'
import React from 'react'
import ErrorPage from './error-page'
import { RootComponent } from '.'

export const provider = reactBridge({
  el: '#root',
  rootComponent: RootComponent,
  errorBoundary: () => <ErrorPage />,
})

if (!window.__GARFISH__) {
  const container = document.getElementById('root')
  const root = createRoot(container!)
  root.render(<RootComponent basename="/" />)
}
