// import './wdyr'
import React, { StrictMode, Suspense, lazy, useCallback } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import './assets/svg-icons'
import 'antd/dist/reset.css'
import { Navigate, Outlet, RouterProvider, createBrowserRouter, redirect } from 'react-router-dom'
import { Button, Result, Skeleton, Spin } from 'antd'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { reactBridge } from '@garfish/bridge-react-v18'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { StyleProvider } from '@ant-design/cssinjs'
import ErrorPage from './error-page'
import ReactPanel from './pages/panel'
import { ReactQueryWrapper } from './pages/ReactQueryWrapper'
import { fetchUserInfo, fetchUserMenus, userInfoQueryKey, userMenusQueryKey } from './http'
import './i18n'
import RootLayout from './layouts/rootLayout'
import Login from './pages/Login'
import { Notifications } from './Components/Notifications/Notifications'
import Dashboard from './pages/Dashboard'
import { NestedComponent } from './pages/ReactDemo/NestedComponent'
import Graphql from './pages/Graphql'
import SocketIoChat from './pages/socket.io-chat'

const queryClient = new QueryClient()
const apolloClient = new ApolloClient({
  // from env
  uri: 'http://localhost:4003/graphql',
  cache: new InMemoryCache(),
})
// TODO 动态路由 跟随用户的已分配权限
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
/**
 * 已登录的话，则直接跳转
 * @returns
 */
const loginLoader = async () => {
  const jwt = localStorage.getItem('jwt')
  if (!jwt) return null
  // 鉴权，获取用户数据
  const data = await queryClient.fetchQuery([userInfoQueryKey], fetchUserInfo, {
    staleTime: 10000,
  })

  if (!data) return redirect('/login')
  return redirect('/')
}

/**
 * 菜单loader
 * TODO 更多的其他逻辑
 * @returns
 */
const menuLoader = async (path: string) => {
  // 鉴权，获取用户数据
  const data = await queryClient.fetchQuery([userMenusQueryKey], fetchUserMenus, {
    staleTime: 10000,
  })
  // 子嵌套路由问题，数据数组打平
  // 动态路由走数据权限，拦截返回码，展示特定的页面
  if (!data.includes(path)) return redirect('/403')
  return null
}

const RootComponent = ({ basename }: { basename: string }) => {
  // TODO 这个函数注入 const {t} = useTranslation()
  const newBaseName = basename.startsWith('/') ? basename : `/${basename}`
  const onBackHome = useCallback(() => {
    location.href = newBaseName
  }, [newBaseName])

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
            loader: () => menuLoader('/dashboard'),
            element: <Dashboard />,
          },
          {
            id: 'react-amap',
            path: '/react-amap',
            loader: () => menuLoader('/react-amap'),
            element: (
              <Suspense fallback={<Spin spinning />}>
                <ReactAmap />
              </Suspense>
            ),
          },
          {
            id: 'react-query',
            path: '/react-query',
            loader: () => menuLoader('/react-query'),
            element: <ReactQueryWrapper />,
          },
          {
            id: 'react-demo',
            path: '/react-demo',
            loader: () => menuLoader('/react-demo'),
            element: <Outlet />,
            handle: { crumb: (data: HandleData) => data.id },
            children: [
              {
                index: true,
                // NOTE 懒加载-> 拆包
                lazy: () => import('./pages/ReactDemo'),
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
            loader: () => menuLoader('/react-panel'),
            path: '/react-panel',
            element: <ReactPanel />,
          },
          {
            id: 'graphql-demo',
            path: '/graphql',
            // loader: () => menuLoader('/graphql'),
            element: <Graphql />,
          },
          {
            id: 'socket.io-chat',
            path: '/socket-io-chat',
            element: <SocketIoChat />,
          },
          {
            path: '/403',
            id: '403',
            element: (
              <Result
                status={403}
                title="403 无权限"
                subTitle="您无权限访问该路由地址"
                extra={
                  <Button
                    type="primary"
                    onClick={onBackHome}
                  >
                    返回
                  </Button>
                }
              />
            ),
          },
        ],
      },
      {
        path: '/login',
        id: 'login',
        loader: loginLoader,
        element: <Login />,
      },
      {
        path: '*',
        id: '404',
        element: (
          <Result
            status={404}
            // title="404 Not Found"
            // subTitle="该路由地址不存在"
            extra={
              <Button
                type="primary"
                onClick={onBackHome}
              >
                {/* 返回 */}
              </Button>
            }
          />
        ),
      },
    ],
    { basename: newBaseName }
  )
  console.log({ newBaseName }, router)

  return (
    <StrictMode>
      <ApolloProvider client={apolloClient}>
        <QueryClientProvider client={queryClient}>
          <StyleProvider hashPriority="high">
            <Notifications />
            <RouterProvider
              router={router}
              fallbackElement={<Skeleton />}
            />
          </StyleProvider>
          <ReactQueryDevtools initialIsOpen />
        </QueryClientProvider>
      </ApolloProvider>
    </StrictMode>
  )
}

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
