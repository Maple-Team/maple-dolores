// import './wdyr'
import React, { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import './assets/svg-icons'
import 'antd/dist/reset.css'
import { Navigate, Outlet, RouterProvider, createBrowserRouter, redirect } from 'react-router-dom'
import { Skeleton, Spin } from 'antd'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import RootLayout from './layouts/rootLayout'
import Dashboard from './pages/Dashboard'
import ErrorPage from './error-page'
import ReactPanel from './pages/panel'
import { ReactQueryWrapper } from './pages/ReactQueryWrapper'
import { ReactDemo } from './pages/ReactDemo'
import { NestedComponent } from './pages/ReactDemo/NestedComponent'
import Login from './pages/Login'
import NotFound from './404'
import { fetchUserInfo, userInfoQueryKey } from './http'

const queryClient = new QueryClient()

// const RemoteControl = lazy(() => import('./pages/RemoteControl/RemoteCard'))
// FIXME for test
const ReactAmap = lazy(() => import('./pages/amap'))
/**
 * Each route can define a "loader" function to provide data to the route element before it renders.
 * @returns
 */
const rootLoader = async () => {
  const jwt = localStorage.getItem('jwt')
  const pathname = window.location.pathname
  if (!jwt) return redirect(`/login?redirect=${pathname}`)
  // 鉴权，获取用户数据
  const data = await queryClient.fetchQuery([userInfoQueryKey], fetchUserInfo, {
    staleTime: 10000,
  })

  if (!data) return redirect('/login')
  return data
}

const RootComponent = ({ basename }: { basename: string }) => {
  const router = createBrowserRouter(
    [
      {
        path: '/',
        id: 'root',
        element: <RootLayout />,
        loader: rootLoader,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: (
              <Navigate
                to="/dashboard"
                replace
              />
            ),
          },
          {
            id: 'dashboard',
            path: '/dashboard',
            element: <Dashboard />,
          },
          //   {
          //     id: 'remote-control',
          //     path: '/remote-control',
          //     element: (
          //       <Suspense fallback={<Spin spinning />}>
          //         <RemoteControl />
          //       </Suspense>
          //     ),
          //   },
          {
            id: 'react-amap',
            path: '/react-amap',
            element: (
              <Suspense fallback={<Spin spinning />}>
                <ReactAmap />
              </Suspense>
            ),
          },
          {
            id: 'react-query',
            path: '/react-query',
            element: <ReactQueryWrapper />,
          },
          {
            id: 'react-demo',
            path: '/react-demo',
            element: <Outlet />,

            handle: { crumb: (data: HandleData) => data.id },
            children: [
              {
                index: true,
                element: <ReactDemo />,
              },
              {
                id: ':id',
                path: ':id',
                element: <NestedComponent />,

                handle: {
                  crumb: (data: HandleData) => data.params.id,
                },
              },
            ],
          },
          {
            id: 'react-panel',
            path: '/react-panel',
            element: <ReactPanel />,
          },
        ],
      },
      {
        path: '/login',
        id: 'login',
        element: <Login />,
      },
      {
        path: '*',
        id: '404',
        element: <NotFound />,
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

if (!window.__GARFISH__) {
  const container = document.getElementById('app')
  const root = createRoot(container!)
  root.render(<RootComponent basename="/" />)
}
