// import './wdyr'
import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import './assets/svg-icons'
import 'antd/dist/reset.css'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { reactBridge } from '@garfish/bridge-react-v18'
import { Skeleton, Spin } from 'antd'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Root from './routes/root'
import Dashboard from './pages/Dashboard'
import ErrorPage from './error-page'
import { RemoteControlCard } from './pages/RemoteControl'
import { ReactAmap } from './pages/amap'
import ReactPanel from './pages/panel'
import { ReactQueryWrapper } from './pages/ReactQueryWrapper'
import { ReactDemo } from './pages/ReactDemo'
import { NestedComponent } from './pages/ReactDemo/NestedComponent'

const loader = () => <Spin spinning />

const rootLoader = loader
const queryClient = new QueryClient({
  defaultOptions: {
    //   queries: {
    //     refetchOnWindowFocus: true,
    //     retry: false,
    //   },
  },
})

const RootComponent = ({ basename }: { basename: string }) => {
  const router = createBrowserRouter(
    [
      {
        path: '/',
        id: 'root',
        element: <Root />,
        loader: rootLoader,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            id: 'dashboard',
            path: '/dashboard',
            element: <Dashboard />,
            loader,
          },
          {
            id: 'remote-control',
            path: '/remote-control',
            element: <RemoteControlCard />,
            loader,
          },
          {
            id: 'react-amap',
            path: '/react-amap',
            element: <ReactAmap />,
            loader,
          },
          {
            id: 'react-query',
            path: '/react-query',
            element: <ReactQueryWrapper />,
            loader,
          },
          {
            id: 'react-demo',
            path: '/react-demo',
            element: <Outlet />,
            loader,
            children: [
              {
                index: true,
                element: <ReactDemo />,
              },
              {
                id: 'react-demo/:id',
                path: '/react-demo/:id',
                element: <NestedComponent />,
                loader,
              },
            ],
          },
          {
            id: 'react-panel',
            path: '/react-panel',
            element: <ReactPanel />,
            loader,
          },
        ],
      },
    ],
    { basename }
  )
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider
          router={router}
          fallbackElement={<Skeleton />}
        />
        <ReactQueryDevtools initialIsOpen />
      </QueryClientProvider>
    </StrictMode>
  )
}

export const provider = reactBridge({
  el: '#app',
  rootComponent: RootComponent,
  errorBoundary: (e) => <div>{JSON.stringify(e)}</div>,
})

if (!window.__GARFISH__) {
  const container = document.getElementById('app')
  const root = createRoot(container!)
  root.render(<RootComponent basename="/" />)
}
