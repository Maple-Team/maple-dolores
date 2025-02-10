import type { Socket } from 'socket.io-client'
import dayjs from 'dayjs'
import { uuid } from '@liutsing/utils'
import type { ChatMessage, ClientToServerEvents, Message, ServerToClientEvents } from './types'
import emitter from '@/utils/emitter'

export class WebRtc extends EventTarget {
  private _localStream: MediaStream | null
  private socket: Socket<ServerToClientEvents, ClientToServerEvents>
  private pcConfig: RTCConfiguration | undefined
  private _myId: string | undefined | null
  private users: Record<string, string> = {}
  private streams: Record<string, MediaStream> = {}
  private dataChannels: Record<string, RTCDataChannel> = {}
  private room: string | undefined | null
  private _userName: string | undefined | null
  private inCall: boolean | undefined
  /** 当前会议室是否存在两个用户以上 */
  private isReady: boolean | undefined
  /** Initiates connections if true 是否发起者 */
  private isInitiator: boolean | undefined
  private _isAdmin: boolean | undefined
  private rtcPeer: RTCPeerConnection | null | undefined
  private dataChannel: RTCDataChannel | null | undefined

  constructor(socket: Socket<ServerToClientEvents, ClientToServerEvents>, pcConfig?: RTCConfiguration) {
    super()
    this.socket = socket
    this.pcConfig = pcConfig
    this._myId = null
    this.users = {}
    this.streams = {}
    this.room = null
    this.inCall = false
    this.isInitiator = false
    this.isReady = false
    this._isAdmin = false
    this._localStream = null
    this._onSocketListeners()
  }

  private _onSocketListeners() {
    console.log('socket listener initialized')

    /**
     * 已创建房间
     * 仅创建房间的用户可收到这个事件
     */
    this.socket?.on('created', (room, socketId) => {
      console.log(room, socketId)
      this.room = room
      this._isAdmin = true
      this.isInitiator = true

      emitter.emit('CREATED_ROOM', {
        room,
        socketId,
      })
    })

    // 已加入房间
    this.socket?.on('joined', (room, socketId) => {
      emitter.emit('JOINED_ROOM', {
        room,
        socketId,
      })
      this.isReady = true
      this.room = room
      this._myId = socketId
    })

    this.socket?.on('log', (msg) => {
      console.log(JSON.stringify(msg))
    })

    // Room is ready for connection 当前房间内收到
    this.socket?.on('ready', (user: string) => {
      if (this._myId === user) console.log('joined room')
      else console.log(`users: ${user} joined room`)

      if (this._myId !== user && this.inCall) this.isInitiator = true
    })

    // 已有其他用户加入到会议室，开启p2p连接
    this.socket?.on('join', (room) => {
      console.log(`Incoming request to join room: ${room}`)
      this.isReady = true
    })
    // 业务消息处理
    this.socket?.on('message', async (message, socketId) => {
      console.log(`from ${socketId}, received ${message.type}`)
      if (message.type === 'leave') {
        console.log(`${socketId} left the call.`)
        this._removeUser(socketId)
        this.isInitiator = true
        emitter.emit('USER_LEAVE', socketId)
      } else if (message.type === 'chat') {
        emitter.emit('CHAT_CONTENT', {
          content: message.content,
          from: message.from,
          userName: message.userName,
          uuid: message.uuid,
          ts: message.ts,
        })
      }

      if (this.rtcPeer?.connectionState === 'connected') {
        console.log(`connection with ${socketId}, is already established`, message.type)
        return
      }

      switch (message.type) {
        case 'initialize':
          this._connect(socketId, message.userName)
          break
        case 'offer':
          if (!this.rtcPeer) this._connect(socketId)
          this.rtcPeer
            ?.setRemoteDescription(new RTCSessionDescription(message as RTCSessionDescriptionInit))
            .catch(console.error)
          this._answer(socketId)
          break
        case 'answer':
          this.rtcPeer
            ?.setRemoteDescription(new RTCSessionDescription(message as RTCSessionDescriptionInit))
            .catch(console.error)
          break
        case 'candidate':
          // 获得candidate sdp
          // eslint-disable-next-line no-case-declarations
          const candidate = new RTCIceCandidate({
            sdpMLineIndex: message.label,
            candidate: message.candidate,
          })
          this.inCall = true
          this.rtcPeer?.addIceCandidate(candidate).catch(console.error)
          break
        default:
          break
      }
    })
  }

  private _answer(socketId: string) {
    console.log(`sending answer to ${socketId}`)
    this.rtcPeer
      ?.createAnswer()
      .then(async (answer) => {
        this._sendMessage(answer as Message, socketId)
        await this.rtcPeer?.setLocalDescription(answer)
      })
      .catch((e) => {
        console.error('createAnswer error: ', e)
      })
  }

  private _removeUser(socketId: string) {
    this.socket?.emit('message', { type: 'leave' }, socketId)
  }

  /**
   * Try connecting to peers
   * if got local stream and is ready for connection
   * @param socketId
   */
  private _connect(socketId: string, userName?: string) {
    if (typeof this._localStream === 'undefined' || !this.isReady) return

    if (userName) this.users[socketId] = userName

    this._createPeerConnection(socketId)
    if (this._localStream)
      for (const track of this._localStream?.getTracks()) this.rtcPeer?.addTrack(track, this._localStream)
    if (this.isInitiator) this._makeOffer(socketId)
  }

  private _makeOffer(socketId: string) {
    // NOTE 发起offser连接
    console.log(`Creating offer for ${socketId}`)
    this.rtcPeer
      ?.createOffer()
      .then(async (offer) => {
        this._sendMessage(offer as Message, socketId)
        await this.rtcPeer?.setLocalDescription(new RTCSessionDescription(offer))
      })
      .catch((e) => {
        console.log('Create offer error: ', e)
      })
  }

  private _createPeerConnection(socketId: string) {
    if (this.rtcPeer) {
      console.warn('has peer connection instance')
      return
    }
    this.rtcPeer = new RTCPeerConnection(this.pcConfig)

    // 处理peer之间的连接协商
    this.rtcPeer.addEventListener('icecandidate', (ev: RTCPeerConnectionIceEvent) => {
      console.log('icecandidate event: ', ev)
      if (!ev.candidate) return
      // 开始candidate协商
      this._sendMessage(
        {
          type: 'candidate',
          label: ev.candidate.sdpMLineIndex,
          id: ev.candidate.sdpMid,
          candidate: ev.candidate.candidate,
        },
        socketId
      )
    })

    // 处理远程轨道（track）的到达
    this.rtcPeer.addEventListener('track', (ev: RTCTrackEvent) => {
      console.log(`Remote stream added for ${socketId}`, ev.streams)
      // NOTE 这里的流含有多个轨道(音轨，视频轨，比如多个视频/音频输入)
      if (ev.streams[0]) {
        this.streams[socketId] = ev.streams[0]
        emitter.emit('NEW_USER', { socketId, stream: ev.streams[0], userName: this.users[socketId] || 'unknown' })
      }
    })

    const dataChannel = this.rtcPeer?.createDataChannel('dataChannel')

    this.rtcPeer?.addEventListener('datachannel', (e) => {
      const { channel } = e
      channel.addEventListener('message', (msg) => {
        console.log('收到数据: ', msg.data)
      })
    })

    this.dataChannel = dataChannel
  }

  private _sendMessage(message: Message, toId?: string | null, roomId?: string | null) {
    this.socket?.emit('message', message, toId, roomId)
  }

  /**
   * 发送消息
   * @param msg
   */
  sendText(msg: string, toId?: string) {
    const chatMessage: ChatMessage = {
      content: msg,
      from: this.myId!,
      userName: this.userName!,
      uuid: uuid(),
      ts: dayjs().valueOf(),
    }
    emitter.emit('CHAT_CONTENT', chatMessage)
    this.socket?.emit('message', { type: 'chat', ...chatMessage }, toId, this.room)
    if (this.dataChannel?.readyState === 'open')
      //   this.dataChannel?.send(new Blob([JSON.stringify(chatMessage)], { type: 'application/json' }))
      this.dataChannel.send(new Uint8Array([2, 3, 4]))
  }

  /**
   * 在房间内发送gotstream类型事件
   */
  initialize() {
    if (this.room) this._sendMessage({ type: 'initialize', userName: this.userName }, null, this.room)
    else console.log('no room')
  }

  joinRoom(userName: string, room: string) {
    this.room = room
    this._userName = userName
    this.socket?.emit('create or join', room)
  }

  leaveRoom() {
    if (this.room) {
      // emit
      this.isInitiator = false
      this.socket?.emit('leave room', this.room)
    }
  }

  kick(socketId: string) {
    this.socket?.emit('kickout', socketId, this.room!)
  }

  getLocalStream(
    videoConstraints: MediaTrackConstraints,
    audioConstraints?: MediaTrackConstraints
  ): Promise<MediaStream> {
    return new Promise((resolve, reject) => {
      navigator.mediaDevices
        .getUserMedia({
          audio: audioConstraints || true,
          video: videoConstraints,
        })
        .then((stream) => {
          this._localStream = stream
          resolve(stream)
        })
        .catch((e) => {
          reject(e)
          console.error(e)
        })
    })
  }

  get localStream() {
    return this._localStream
  }

  get myId() {
    return this._myId
  }

  get isAdmin() {
    return this._isAdmin
  }

  get roomId() {
    return this.room
  }

  get participants() {
    return []
  }

  get userName() {
    return this._userName
  }
}
