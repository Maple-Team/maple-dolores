/* eslint-disable @typescript-eslint/restrict-template-expressions */
import * as fs from 'fs'
import { createServer } from 'https'
import type { Socket } from 'socket.io'
import { Server } from 'socket.io'
import express from 'express'
import type { ClientToServerEvents, ServerToClientEvents } from './src/views/conference/types'

const privateKey = fs.readFileSync('./localhost+3-key.pem')
const certificate = fs.readFileSync('./localhost+3.pem')

const app = express()

const httpServer = createServer({ key: privateKey, cert: certificate }, app)

const port = process.env.PORT || 18081
const env = process.env.NODE_ENV || 'development'

// Redirect to https
app.get('*', (req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https' && env !== 'development')
    res.redirect(['https://', req.get('Host'), req.url].join(''))

  next()
})

httpServer.listen(port, () => {
  console.log(`listening on port ${port}`)
})

const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
})

io.sockets.on('connection', (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
  let rootAdmin: string | undefined
  function log(...args: unknown[]) {
    const array = ['Server:']
    socket.emit('log', [...array, ...args])
  }
  socket.on('create or join', (room) => {
    log(`Create or Join room, ${room}`)
    const clientsRoom = io.sockets.adapter.rooms.get(room)
    const numClients = clientsRoom ? clientsRoom.size : 0

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    socket.join(room)

    if (numClients === 0) {
      rootAdmin = socket.id
      socket.emit('created', room, socket.id)
    } else {
      log(`Clients ${socket.id} joined room ${room}`)
      // join room
      io.sockets.in(room).emit('join', room) // 通知房间内的其他用户
      io.to(socket.id).emit('joined', room, socket.id) // 通知客户端它加入了房间
      io.sockets.in(room).emit('ready', socket.id) // 房间准备创建连接
    }
  })

  socket.on('message', (message, toId, room) => {
    log(`Client ${socket.id} said: `, message)
    if (toId) {
      console.log(`From ${socket.id} to ${toId} ${message.type}`)
      io.to(toId).emit('message', message, socket.id)
    } else if (room) {
      console.log(`From ${socket.id} to room ${room} ${message.type}`)
      socket.broadcast.to(room).emit('message', message, socket.id)
    } else {
      console.log(`From ${socket.id} to everyone ${message.type}`)
      socket.broadcast.emit('message', message, socket.id)
    }
  })

  socket.on('kickout', (socketId, room) => {
    if (socket.id === rootAdmin) {
      socket.broadcast.emit('kickout', socketId)
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      io.sockets.sockets.get(socketId)?.leave(room)
    }
  })

  socket.on('leave room', (room) => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    socket.leave(room)
    socket.emit('left room', room)
    socket.broadcast.to(room).emit('message', { type: 'leave' }, socket.id)
  })
  socket.on('disconnecting', () => {
    socket.rooms.forEach((room) => {
      if (room === socket.id) return
      socket.broadcast.to(room).emit('message', { type: 'leave' }, socket.id)
    })
  })
})
