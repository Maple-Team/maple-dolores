import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Outlet, useLocation, useNavigate, useNavigation } from 'react-router-dom'
import { QueryErrorResetBoundary } from '@tanstack/react-query'
// import Scrollbar from './scrollbar'
import type { MenuProps } from 'antd'
import { Button, ConfigProvider, Menu, Result, Select, Skeleton, message } from 'antd'
import { ErrorBoundary } from 'react-error-boundary'
import type { ItemType, MenuItemType } from 'antd/es/menu/hooks/useItems'
import { StyleProvider } from '@ant-design/cssinjs'
import { Breadcrumbs } from '@/Components'
import { emitter } from '@/events'
import { useUserMenus } from '@/http'
import { LanguageNameMap } from '@/i18n/constant'
import type { LanguageKey } from '@/i18n/type'

message.config({ maxCount: 3 })

export default () => {
  const navigate = useNavigate()
  const location = useLocation()
  console.count('RootLayout')
  //   const matches = useMatches() as Match<ReactElement, Handle>[]
  const pathname = location.pathname

  React.useEffect(() => {
    // https://jasonwatmore.com/react-router-v6-listen-to-location-route-change-without-history-listen
    // https://stackoverflow.com/questions/70646421/how-to-listen-for-route-change-in-react-router-dom-v6
    // 监听路由变化
    // console.log('Location changed!', location.pathname)
  }, [location])

  const { data: menus } = useUserMenus()

  const items: ItemType<MenuItemType>[] = useMemo(
    () =>
      [
        {
          key: '/dashboard',
          label: 'Dashboard',
          onClick() {
            navigate('/dashboard')
          },
        },
        // {
        //  FIXME
        //   label: 'ToolTip example',
        //   style: { cursor: 'pointer' },
        //   onClick() {
        //     nav('/react-tooltip')
        //   },
        // },
        {
          label: 'React Query',
          key: '/react-query',
          onClick() {
            navigate('/react-query')
          },
        },
        {
          label: 'React Amap',
          key: '/react-amap',
          onClick() {
            navigate('/react-amap')
          },
        },
        // {
        //   label: 'Infinite Scroll',
        //   key: 'react-infinite-scroll-component',
        //   onClick() {
        //     nav('/react-infinite-scroll-component')
        //   },
        // },
        {
          label: 'React Demo',
          key: '/react-demo',
          onClick() {
            navigate('/react-demo')
          },
        },
        // {
        //   label: 'React Panel',
        //   key: '/react-panel',
        //   onClick() {
        //     navigate('/react-panel')
        //   },
        // },
        {
          label: 'Graphql Demo',
          key: '/graphql',
          onClick() {
            navigate('/graphql')
          },
        },
        {
          label: 'Socket.io Chat',
          key: '/socket-io-chat',
          onClick() {
            navigate('/socket-io-chat')
          },
        },
      ].filter((item) => menus?.includes(item.key)),
    [navigate, menus]
  )

  const navigation = useNavigation()
  useEffect(() => {
    emitter.on('SHOW_MESSAGE', ({ message: msg, type, key }) => {
      message[type]({ content: msg, key })
    })
    emitter.on('REDIRECT_LOGIN', (redirect?: string) => {
      if (!redirect || redirect === '/login') {
        navigate('/login', { replace: true })
        return
      }
      navigate(`/login?redirect=${redirect}`, { replace: true })
    })
    const handler403 = () => {
      navigate('/403')
    }
    emitter.on('REDIRECT_403', handler403)
    return () => {
      emitter.off('REDIRECT_403', handler403)
    }
  }, [navigate])

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e)
  }
  const selectedKeys = useMemo(() => {
    if (pathname === '/') return ['/dashboard']
    const keys = items
      .map((item) => item?.key)
      .filter((key) => key && pathname.startsWith(key as string))
      .filter(Boolean) as string[]
    return keys
  }, [items, pathname])

  const [language, setLanguage] = useState<LanguageKey>((localStorage.getItem('language') as LanguageKey) || 'zh_CN')
  const onLanguageChange = useCallback((v: LanguageKey) => {
    setLanguage(v)
    localStorage.setItem('language', v)
    // @ts-expect-error: 动态插件注入的
    i18n.changeLanguage(v)
  }, [])

  return (
    <ConfigProvider>
      <StyleProvider hashPriority="high">
        <div className="flex h-screen">
          <aside className="w-[246px]">
            <Menu
              items={items}
              onClick={onClick}
              defaultSelectedKeys={['/dashboard']}
              selectedKeys={selectedKeys}
            />
          </aside>
          <main className="flex-1 flex flex-col justify-between h-full">
            <header className="py-3 px-4 flex min-h-[44px] justify-between">
              <Breadcrumbs />
              <div className="flex items-center">
                <Select
                  className="w-[120px] mr-5"
                  value={language}
                  onChange={onLanguageChange}
                >
                  {Object.keys(LanguageNameMap).map((key) => {
                    return (
                      <Select.Option
                        value={key}
                        key={key}
                      >
                        {LanguageNameMap[key as LanguageKey]}
                      </Select.Option>
                    )
                  })}
                </Select>
                <span>用户中心</span>
              </div>
            </header>
            <div className="flex-1 px-4 bg-gray-100">
              <QueryErrorResetBoundary>
                {({ reset }) => (
                  <ErrorBoundary
                    onReset={reset}
                    fallbackRender={({ error, resetErrorBoundary }) => (
                      // FIXME 移除内部的箭头函数显式return
                      <Result
                        status={500}
                        title="内部子路由页面运行报错"
                        subTitle={error.message} // 页面中抛出的错误
                        extra={<Button onClick={resetErrorBoundary}>刷新重试</Button>}
                      />
                    )}
                  >
                    <Skeleton loading={navigation.state === 'loading'}>
                      <Outlet />
                    </Skeleton>
                  </ErrorBoundary>
                )}
              </QueryErrorResetBoundary>
            </div>
            <footer className="py-3 text-center">底部</footer>
          </main>
        </div>
      </StyleProvider>
    </ConfigProvider>
  )
}

// i18n-auto测试用
export function Login() {
  return (
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      {Object.keys(LanguageNameMap).map((key) => {
        return (
          <Select.Option
            value={key}
            key={key}
          >
            你好呀
          </Select.Option>
        )
      })}
    </section>
  )
}
// i18n-auto测试用
export const Foo = () => {
  return <div>你好吗</div>
}

// i18n-auto测试用
// TODO 待确定是否有react-hooks中含国际化的需求
export const useFoo = () => {
  const a = '你好不'
  return [a]
}
