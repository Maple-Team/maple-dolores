import { useCallback, useEffect, useState } from 'react'
import type { Socket } from 'socket.io-client'
import { io } from 'socket.io-client'

export const useSocket = (room: string, username: string) => {
  const [socket, setSocket] = useState<Socket>()
  const [socketResponse, setSocketResponse] = useState<Message>()
  const [isConnected, setConnected] = useState(false)

  const sendData = useCallback(
    (payload: { message: string }) => {
      socket?.emit('chat-message', {
        room,
        message: payload.message,
        username,
        messageType: 'CLIENT',
      })
    },
    [socket, room, username]
  )

  useEffect(() => {
    // 指明socket.io的命名空间
    const socketBaseUrl = process.env.API_URL || 'http://localhost:4003/default'
    console.log('[ socketBaseUrl ] >', socketBaseUrl, new Date().toLocaleTimeString())
    if (!socketBaseUrl) return
    const s = io(socketBaseUrl, {
      query: {
        username,
        room,
      },
    })
    setSocket(s)
    s.on('connect', () => {
      console.log('socket.io connect')
      setConnected(true)
    })
    s.on('message', (msg) => {
      console.log('[ msg ] >', msg, new Date().toLocaleTimeString())
    })
    s.on('error', (error) => {
      console.error('SOCKET CONNECTION ERROR', error)
    })
    s.on('chat-message', (res: Message) => {
      setSocketResponse({
        room: res.room,
        message: res.message,
        username: res.username,
        messageType: res.messageType,
        createdAt: res.createdAt,
        id: res.id,
      })
    })

    return () => {
      s.disconnect()
    }
  }, [room, username])

  return { isConnected, socketResponse, sendData }
}
