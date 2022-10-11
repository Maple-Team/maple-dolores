import { useEffect, useState, createContext } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Layout } from '@arco-design/web-react'
import './App.less'
import { getWeekNumber } from '@liutsing/utils'

export const SubAppContext = createContext({})
const Content = Layout.Content

export const prefixCls = 'sub-app-react18'

const App = () => {
  const location = useLocation()
  const [_isActive, setIsActive] = useState('home')

  useEffect(() => {
    setIsActive(location.pathname.includes('about') ? 'about' : 'home')
  }, [location.pathname])

  return (
    <SubAppContext.Consumer>
      {() => {
        return (
          <Content>
            <div className="App">
              <header className="App-header">
                <p>
                  Current Week of {new Date().getFullYear()} is No.{getWeekNumber()}
                </p>
              </header>
              <Outlet />
            </div>
          </Content>
        )
      }}
    </SubAppContext.Consumer>
  )
}

export default App
