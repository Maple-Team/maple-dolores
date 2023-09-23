import React from 'react'
import apps from '../../../build/config.json'
import './index.css'

const App = () => {
  const keys = Object.keys(apps).filter((k) => k !== 'main')
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <aside style={{ width: 160 }}>
        <nav>
          <ul>
            {keys.map((k) => (
              <li key={k}>
                <a href={`http://localhost:${apps['main'].port}/${k}`}>{k}</a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main style={{ flex: 1 }}>
        <h1 style={{ textAlign: 'center' }}>Main App Title</h1>
        <div id="container"></div>
      </main>
    </div>
  )
}

export default App
