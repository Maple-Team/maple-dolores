// import './wdyr'
import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import './assets/svg-icons'
import 'antd/dist/reset.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { reactBridge } from '@garfish/bridge-react-v18'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Root from './routes/root'
import ErrorPage from './error-page'

import { RemoteControlCard } from './pages/RemoteControl'
import { ReactAmap } from './pages/amap'
import { ReactDemo } from './pages/ReactDemo'
import ReactPanel from './pages/panel'
import { ReactQueryWrapper } from './pages/ReactQueryWrapper'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      retry: false,
    },
  },
})

const RootComponent = ({ basename }: { basename: string }) => (
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename={basename}>
        <Routes>
          <Route
            path="/"
            element={<Root />}
            errorElement={<ErrorPage />}
          >
            <Route
              path="/remote-control"
              element={<RemoteControlCard />}
            />
            <Route
              path="/react-amap"
              element={<ReactAmap />}
            />
            <Route
              path="/react-hooks"
              element={<RemoteControlCard />}
            />
            <Route
              path="/react-query"
              element={<ReactQueryWrapper />}
            />
            <Route
              path="/react-Demo"
              element={<ReactDemo />}
            />
            <Route
              path="/react-panel"
              element={<ReactPanel />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  </StrictMode>
)
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
