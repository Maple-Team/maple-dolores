import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { HelmetProvider } from 'react-helmet-async'
import type { RouteObject } from 'react-router-dom'
import { BrowserRouter as Router, useRoutes } from 'react-router-dom'
import { Button, Spin } from 'antd'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Root from './routes/root'
import ErrorPage from './error-page'
import { RemoteControlCard } from './pages/RemoteControl/RemoteCard'
import { ReactAmap } from './pages/amap'
import { ReactQueryWrapper } from './pages/ReactQueryWrapper'
import { ReactDemo } from './pages/ReactDemo'
import ReactPanel from './pages/panel'
import { FindPath } from './pages/FindPath'

// import { AuthProvider } from '@/lib/auth'

const ErrorFallback = () => {
  return (
    <div
      className="text-red-500 w-screen h-screen flex flex-col justify-center items-center"
      role="alert"
    >
      <h2 className="text-lg font-semibold">Ooops, something went wrong :( </h2>
      <Button
        className="mt-4"
        onClick={() => window.location.assign(window.location.origin)}
      >
        Refresh
      </Button>
    </div>
  )
}

interface AppProviderProps {
  children: React.ReactNode
  basename: string
}
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      retry: false,
    },
  },
})

export const AppProvider = ({ children, basename }: AppProviderProps) => {
  return (
    <React.Suspense
      fallback={
        <div className="flex items-center justify-center w-screen h-screen">
          <Spin
            size="large"
            spinning
            delay={200}
          />
        </div>
      }
    >
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            {process.env.NODE_ENV !== 'test' && <ReactQueryDevtools />}
            {/* <AuthProvider> */}
            <Router basename={basename}>{children}</Router>
            {/* </AuthProvider> */}
          </QueryClientProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </React.Suspense>
  )
}

export const AppRoutes = () => {
  const commonRoutes: RouteObject[] = [
    {
      path: '/',
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/react-amap',
          element: <ReactAmap />,
        },
        {
          path: '/react-hooks',
          element: <RemoteControlCard />,
        },
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
        {
          path: '/find-path',
          element: <FindPath />,
        },
      ],
    },
  ]

  //   const routes = auth.user ? protectedRoutes : publicRoutes
  // const element = useRoutes([...routes, ...commonRoutes])
  const element = useRoutes([...commonRoutes])

  return <>{element}</>
}

export const App = ({ basename }: { basename: string }) => {
  return (
    <AppProvider basename={basename}>
      <AppRoutes />
    </AppProvider>
  )
}
