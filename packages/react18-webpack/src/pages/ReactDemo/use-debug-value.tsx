import React, { useDebugValue, useEffect, useState, useSyncExternalStore } from 'react'

function subscribe(callback: (event: Event) => void) {
  window.addEventListener('online', callback)
  window.addEventListener('offline', callback)
  return () => {
    window.removeEventListener('online', callback)
    window.removeEventListener('offline', callback)
  }
}

const useOnlineStatus = () => {
  const isOnline = useSyncExternalStore(
    subscribe,
    () => navigator.onLine,
    () => true
  )
  useDebugValue(isOnline ? 'Online' : 'Offline')

  return isOnline
}
// const useOnlineStatus2 = () => {
//   const [isOnline, setIsOnline] = useState<boolean>()
//   console.log('=======')
//   useEffect(() => {
//     const handler = (e: Event) => {
//       console.log(e, 'e')
//       //   setIsOnline(e)
//     }
//     window.addEventListener('online', handler)
//     window.addEventListener('offline', handler)
//     return () => {
//       window.removeEventListener('online', handler)
//       window.removeEventListener('offline', handler)
//     }
//   }, [])
//   return isOnline
// }

function StatusBar() {
  const isOnline = useOnlineStatus()
  return <h1>{isOnline ? '✅ Online' : '❌ Disconnected'}</h1>
}
function DefferDebug() {
  const [date, setDate] = useState<Date>(new Date())
  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate((date) => new Date(date.getTime() + 1000))
    }, 1000)
    return () => {
      clearInterval(intervalId)
    }
  }, [])
  // nothing happened
  useDebugValue(date, (date) => date.toLocaleTimeString())
  return <div>{date.toLocaleTimeString()}</div>
}
export const UseDebugValueDemo = () => {
  return (
    <>
      <StatusBar />
      <DefferDebug />
    </>
  )
}
