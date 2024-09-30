import React, { useState } from 'react'
import { ThemeProvider } from '@mui/material'
import ChatRoom from './components/ChatRoom'
import Login from './components/Login'
import theme from '@/theme'

export default function SocketIoChat() {
  const [username, setUserName] = useState<string>()
  const [room, setRoom] = useState<string>()
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  return (
    <ThemeProvider theme={theme}>
      {isLoggedIn ? (
        <ChatRoom
          username={username || ''}
          room={room || ''}
        />
      ) : (
        <Login
          setRoom={setRoom}
          setUsername={setUserName}
          setIsLoggedIn={setIsLoggedIn}
        />
      )}
    </ThemeProvider>
  )
}
