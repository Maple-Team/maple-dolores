import type { Socket } from 'socket.io'
import type { ClientToServerEvents, Message, ServerToClientEvents } from './types'
import emitter from '@/utils/emitter'

export class WebRtc extends EventTarget {
  private _localStream: MediaStream | null
  private socket: Socket<ServerToClientEvents, ClientToServerEvents> | undefined
  private pcConfig: RTCConfiguration | undefined
  private _myId: string | undefined | null
  private pcs: Record<string, RTCPeerConnection> = {}
  private streams: Record<string, MediaStream> = {}
  private room: string | undefined | null
  private inCall: boolean | undefined
  /** 当前会议室是否存在两个用户以上 */
  private isReady: boolean | undefined
  /** Initiates connections if true 是否发起者 */
  private isInitiator: boolean | undefined
  private _isAdmin: boolean | undefined

  constructor(socket: Socket<ServerToClientEvents, ClientToServerEvents>, pcConfig?: RTCConfiguration) {
    super()
    this.socket = socket
    this.pcConfig = pcConfig
    this._myId = null
    this.pcs = {}
    this.streams = {}
    this.room = null
    this.inCall = false
    this.isInitiator = false
    this.isReady = false
    this._isAdmin = false
    this._localStream = null
    this._onSocketListeners()
  }

  _onSocketListeners() {
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
      console.log(`users: ${user} joined room`)
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
      }

      if (this.pcs[socketId] && this.pcs[socketId].connectionState === 'connected') {
        console.log(`connection with ${socketId}, is already established`, message.type)
        return
      }

      switch (message.type) {
        case 'initialize':
          this._connect(socketId)
          break
        case 'offer':
          if (!this.pcs[socketId]) this._connect(socketId)
          // @ts-expect-error: 设置发送过来的offer
          this.pcs[socketId].setRemoteDescription(new RTCSessionDescription(message)).catch(console.error)
          this._answer(socketId)
          break
        case 'answer':
          // @ts-expect-error: 获得发送的offer的answer
          this.pcs[socketId].setRemoteDescription(new RTCSessionDescription(message)).catch(console.error)
          break
        case 'candidate':
          // 获得candidate sdp
          this.inCall = true
          // eslint-disable-next-line no-case-declarations
          const candidate = new RTCIceCandidate({
            sdpMLineIndex: message.label,
            candidate: message.candidate,
          })
          this.pcs[socketId].addIceCandidate(candidate).catch(console.error)
          break
        default:
          break
      }
    })
  }

  _answer(socketId: string) {
    console.log(`sending answer to ${socketId}`)
    this.pcs[socketId]
      .createAnswer()
      .then(async (answer) => {
        // @ts-expect-error: 忽略类型问题
        this._sendMessage(answer, socketId)
        await this.pcs[socketId].setLocalDescription(answer)
      })
      .catch((e) => {
        console.error('createAnswer error: ', e)
      })
  }

  _removeUser(socketId: string) {
    console.log(socketId)
    throw new Error('Method not implemented.')
  }

  /**
   * Try connecting to peers
   * if got local stream and is ready for connection
   * @param socketId
   */
  _connect(socketId: string) {
    if (typeof this._localStream === 'undefined' || !this.isReady) return
    this._createPeerConnection(socketId)
    if (this._localStream)
      for (const track of this._localStream?.getTracks()) this.pcs[socketId].addTrack(track, this._localStream)
    if (this.isInitiator) this._makeOffer(socketId)
  }

  _makeOffer(socketId: string) {
    // NOTE 发起offser连接
    console.log(`Creating offer for ${socketId}`)
    this.pcs[socketId]
      .createOffer()
      .then(async (offer) => {
        // @ts-expect-error: 处理类型问题
        this._sendMessage(offer, socketId)
        await this.pcs[socketId].setLocalDescription(new RTCSessionDescription(offer))
      })
      .catch((e) => {
        console.log('Create offer error: ', e)
      })
  }

  _createPeerConnection(socketId: string) {
    if (this.pcs[socketId]) {
      console.warn(`connection with ${socketId}, already established`)
      return
    }
    this.pcs[socketId] = new RTCPeerConnection(this.pcConfig)
    // 处理peer之间的连接协商
    this.pcs[socketId].addEventListener('icecandidate', (ev: RTCPeerConnectionIceEvent) => {
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
    this.pcs[socketId].addEventListener('track', (ev: RTCTrackEvent) => {
      console.log(`Remote stream added for ${socketId}`)
      // NOTE 这里的流含有多个轨道(音轨，视频轨，比如多个视频/音频输入)
      if (ev.streams[0] && this.streams[socketId]?.id !== ev.streams[0].id) {
        this.streams[socketId] = ev.streams[0]
        emitter.emit('NEW_USER', { socketId, stream: ev.streams[0] })
      }
    })
  }

  _sendMessage(message: Message, toId?: string | null, roomId?: string | null) {
    this.socket?.emit('message', message, toId, roomId)
  }

  /**
   * 在房间内发送gotstream类型事件
   */
  initialize() {
    if (this.room) this._sendMessage({ type: 'initialize' }, null, this.room)
    else console.log('no room')
  }

  joinRoom(room: string) {
    if (room) {
      this.room = room
      this.socket?.emit('create or join', room)
    }
  }

  leaveRoom() {
    if (this.room) {
      // emit
      this.isInitiator = false
      this.socket?.emit('leave room', this.room)
    }
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
    return this.room
  }

  get isAdmin() {
    return this._isAdmin
  }

  get roomId() {
    return this.room
  }

  get participants() {
    return this.pcs ? Object.keys(this.pcs) : []
  }
}
