import React from 'react'
import { configs as apps } from '@liutsing/config'
import './index.css'

const App = () => {
  const keys = Object.keys(apps).filter((k) => k !== 'main')
  const isDev = process.env.NODE_ENV === 'development'
  return (
    <div className="flex h-screen">
      <aside className="bg-white w-[160px]">
        <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400 pl-2">
          {keys.map((k) => (
            <li
              key={k}
              className="m-0 py-2"
            >
              <a href={`http://localhost:${isDev ? apps['main'].port : +apps['main'].port + 1000}/${k}`}>{k}</a>
            </li>
          ))}
        </ul>
      </aside>
      <main className="flex-1 ml-4 h-screen">
        <h1>微前端 - 基座应用</h1>
        <div id="container"></div>
      </main>
    </div>
  )
}

export default App
