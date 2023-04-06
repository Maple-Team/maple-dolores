import { setCookie } from 'cookies-next'
import type { FC, ReactNode } from 'react'
import { createContext, useEffect, useState } from 'react'

export const DeviceContext = createContext<{
  windowWidth: number | '100vw'
  windowHeight: number | '100vh'
  isMobile: boolean
  isWeChat: boolean
} | null>(null)

export const DeviceProvider: FC<{
  windowWidth: number | '100vw'
  windowHeight: number | '100vh'
  uaIsMobile: boolean
  isWeChat: boolean
  children: ReactNode
}> = ({ windowWidth: propsWindowWidth, windowHeight: propsWindowHeight, uaIsMobile, isWeChat, children }) => {
  const [windowWidth, setWindowWidth] = useState<number | '100vw'>(propsWindowWidth)
  // 由于移动端的 height:100vh 不靠谱，故需要精确的数值用于设置高度
  const [windowHeight, setWindowHeight] = useState<number | '100vh'>(propsWindowHeight)

  const isMobile = typeof windowWidth === 'number' ? windowWidth < 1126 : uaIsMobile

  useEffect(() => {
    // 通过计算获取高度
    // https://stackoverflow.com/a/52936500/2777142
    setCookie('windowWidth', window.innerWidth)
    setCookie('windowHeight', window.innerHeight)
    setWindowWidth(window.innerWidth)
    setWindowHeight(window.innerHeight)
    // 设置精确的高度以控制滚动条
    document.body.style.minHeight = `${window.innerHeight}px`

    window.addEventListener('resize', () => {
      setCookie('windowWidth', window.innerWidth)
      setCookie('windowHeight', window.innerHeight)
      setWindowWidth(window.innerWidth)
      setWindowHeight(window.innerHeight)
      // 设置精确的高度以控制滚动条
      document.body.style.minHeight = `${window.innerHeight}px`
    })
  }, [])

  return (
    <DeviceContext.Provider value={{ windowWidth, windowHeight, isMobile, isWeChat }}>
      {children}
    </DeviceContext.Provider>
  )
}
