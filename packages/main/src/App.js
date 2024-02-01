import React from 'react'
import apps from '../../../build/config.json'
import './index.css'

const App = () => {
  const keys = Object.keys(apps).filter((k) => k !== 'main')
  return (
    <div className="flex h-screen">
      <aside className="bg-white w-[160px]">
        <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400 pl-2">
          {keys.map((k) => (
            <li
              key={k}
              className="m-0 py-2"
            >
              <a href={`http://localhost:${apps['main'].port}/${k}`}>{k}</a>
            </li>
          ))}
        </ul>
      </aside>
      <main className="flex-1 ml-4 h-screen">
        <h1>Main APP</h1>
        <div id="container"></div>
      </main>
    </div>
  )
}

export default App
