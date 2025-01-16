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

if (!window.__GARFISH__) {
  const container = document.getElementById('root')
  const root = createRoot(container!, {
    identifierPrefix: 'id',
    onRecoverableError: (error) => {
      console.error('Recoverable error', error)
    },
  })

  //   const rootElement = React.createElement(RootComponent)

  root.render(<RootComponent basename="/" />)
}
