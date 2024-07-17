import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import { uuid } from '@liutsing/utils'
import { useSocket } from '../hooks/useSocket'
import ChatBubble from './ChatBubble'

function ChatRoom({ username, room }: { username: string; room: string }) {
  const { isConnected, socketResponse, sendData } = useSocket(room, username)

  console.log('[ isConnected ] >', isConnected, new Date().toLocaleTimeString())

  const [messageInput, setMessageInput] = useState('')
  const [messageList, setMessageList] = useState<Message[]>([])

  const addMessageToList = useMemo(() => {
    return (val: Message) => {
      if (val.room === '') return
      setMessageList([...messageList])
    }
  }, [messageList])

  const sendMessage = (e: MouseEvent) => {
    e.preventDefault()
    if (messageInput !== '') {
      sendData({
        message: messageInput,
      })
      addMessageToList({
        message: messageInput,
        username,
        createdAt: new Date(),
        messageType: 'CLIENT',
        id: uuid(),
        room,
      })
      setMessageInput('')
    }
  }

  useEffect(() => {
    if (!socketResponse) return
    addMessageToList(socketResponse)
  }, [addMessageToList, socketResponse])

  return (
    <Container>
      <Grid
        container
        gap={3}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="97vh"
      >
        <Grid
          item
          sx={{ width: '60%' }}
        >
          <Typography variant="h5">
            Welcome to room <b>{room}</b>, {username}.
          </Typography>
        </Grid>
        <Grid
          item
          sx={{ width: '60%', bgcolor: '#ccd8e2', paddingX: '2rem', borderRadius: 6 }}
        >
          <Box
            className="chat-box"
            sx={{
              width: '100%',
              paddingY: '2rem',
              borderRadius: 4,
              height: '60vh',
              overflow: 'auto',
            }}
          >
            {messageList.map((message) => {
              if (message.messageType === 'CLIENT') {
                console.log(message)
                return (
                  <ChatBubble
                    key={message.id}
                    isSender={message.username === username}
                    username={message.username}
                    message={message.message}
                    time="12:12"
                  />
                )
              }
              return null
            })}
          </Box>
          <Grid
            container
            alignItems="center"
            width="100%"
            sx={{
              paddingY: '0.5rem',
              borderTop: '2px solid #99b1c5',
            }}
          >
            <Grid
              item
              xs={11}
            >
              <TextField
                variant="standard"
                placeholder="Type your message"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                fullWidth
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    paddingX: '0.5rem',
                  },
                }}
              />
            </Grid>
            <Grid
              item
              xs={1}
            >
              <Button onClick={sendMessage}>Send</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default ChatRoom
