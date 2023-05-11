import './wdyr'
import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// import './main.css'
import './assets/svg-icons'
// import 'antd/dist/reset.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Root from './routes/root'
import ErrorPage from './error-page'

import { RemoteControlCard } from './pages/RemoteControl'
import { ReactAmap } from './pages/amap'
import { ReactDemo } from './pages/ReactDemo'
import ReactPanel from './pages/panel'
import { ReactQueryWrapper } from './pages/ReactQueryWrapper'

const queryCache = new QueryCache()

window.queryCache = queryCache

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      retry: false,
    },
  },
  queryCache,
})

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/remote-control',
        element: <RemoteControlCard />,
      },
      {
        path: '/react-amap',
        element: <ReactAmap />,
      },

      {
        path: '/react-hooks',
        element: <RemoteControlCard />,
      },
      // {
      //   path: '/react-tooltip',
      //   element: <ReactAmap />,
      // },
      {
        path: '/react-query',
        element: <ReactQueryWrapper />,
      },
      {
        path: '/react-Demo',
        element: <ReactDemo />,
      },
      {
        path: '/react-panel',
        element: <ReactPanel />,
      },
    ],
  },
])

const rootElement = document.getElementById('app') as HTMLElement
const root = createRoot(rootElement)

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  </StrictMode>
)
