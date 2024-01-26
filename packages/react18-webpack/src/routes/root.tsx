import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { QueryErrorResetBoundary } from '@tanstack/react-query'
// import Scrollbar from './scrollbar'
import { Button, Menu } from 'antd'
import type { ItemType } from 'antd/es/menu/hooks/useItems'
import { ErrorBoundary } from 'react-error-boundary'

export default () => {
  const nav = useNavigate()
  const items: ItemType[] = [
    // {
    //   key: 'hooks-example',
    //   label: 'Hooks Example',
    //   style: { cursor: 'pointer' },
    //   onClick() {
    //     nav('/react-hooks')
    //   },
    // },
    // {
    //  FIXME
    //   label: 'ToolTip example',
    //   key: 'react-tooltip',
    //   style: { cursor: 'pointer' },
    //   onClick() {
    //     nav('/react-tooltip')
    //   },
    // },
    {
      label: 'React Query',
      key: 'react-query',
      style: { cursor: 'pointer' },
      onClick() {
        nav('/react-query')
      },
    },
    {
      label: 'React Amap',
      key: 'react-amap',
      style: { cursor: 'pointer' },
      onClick() {
        nav('/react-amap')
      },
    },
    // {
    //   label: 'Infinite Scroll',
    //   key: 'react-infinite-scroll-component',
    //   style: { cursor: 'pointer' },
    //   onClick() {
    //     nav('/react-infinite-scroll-component')
    //   },
    // },
    {
      label: 'React Demo',
      key: 'react-demo',
      style: { cursor: 'pointer' },
      onClick() {
        nav('/react-demo')
      },
    },
    {
      label: 'React Panel',
      key: 'react-panel',
      style: { cursor: 'pointer' },
      onClick() {
        nav('/react-panel')
      },
    },
  ]
  return (
    <div className="flex h-screen">
      <aside className="w-[246px]">
        <Menu
          defaultSelectedKeys={['2']}
          items={items}
        />
      </aside>
      <main className="flex-1 flex flex-col justify-between h-full">
        <header className="py-3 px-4">&nbsp;</header>
        <div className="flex-1 px-4 bg-gray-100">
          <QueryErrorResetBoundary>
            {({ reset }) => (
              <ErrorBoundary
                onReset={reset}
                fallbackRender={({ resetErrorBoundary }) => (
                  <div>
                    There was an error!
                    <Button onClick={() => resetErrorBoundary()}>Try again</Button>
                  </div>
                )}
              >
                <Outlet />
              </ErrorBoundary>
            )}
          </QueryErrorResetBoundary>
        </div>
        <footer className="py-3 text-center">footer</footer>
      </main>
    </div>
  )
}
