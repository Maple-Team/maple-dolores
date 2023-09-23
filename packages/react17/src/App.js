import React from 'react'
import { BrowserRouter, Route, Routes, Link, Outlet } from 'react-router-dom'
import { Home } from './Home'
import { About } from './About'
import { PageNotFound } from './PageNotFound'

const App = ({ basename }) => {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route
          path="/"
          element={
            <div style={{ display: 'flex' }}>
              <aside style={{ display: 'flex', flexDirection: 'column', width: 240 }}>
                <Link to={'/home'}>Home</Link>
                <Link to={'/about'}>About</Link>
              </aside>
              <div style={{ flex: 1 }}>
                <Outlet />
              </div>
            </div>
          }
        >
          <Route
            path="/home"
            element={<Home />}
          />
          <Route
            path="/About"
            element={<About />}
          />
          <Route
            path="/*"
            element={<PageNotFound />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
