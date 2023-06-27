import type { Socket } from 'socket.io'
import emitter from '@/utils/emitter'

export interface ServerToClientEvents {
  /**
   * 已创建会议室
   * @param room
   * @param socketId
   * @returns
   */
  created: (room: string, socketId: string) => void
  /**
   * 已加入会议室
   * @param room
   * @param socketId
   * @returns
   */
  joined: (room: string, socketId: string) => void
}
export interface ClientToServerEvents {
  'create or join': (room: string) => void
}

export class WebRtc extends EventTarget {
  private _localStream: MediaStream | null
  private socket: Socket<ServerToClientEvents, ClientToServerEvents> | undefined
  private pcConfig: RTCConfiguration | undefined
  private _myId: string | undefined | null
  private pcs: Record<string, RTCPeerConnection> | undefined
  private streams: Record<string, MediaStream> | undefined
  private currentRoom: string | undefined | null
  private isCall: boolean | undefined
  /** 当前会议室是否存在两个用户以上 */
  private isReady: boolean | undefined
  /** Initiates connections if true */
  private isInitiator: boolean | undefined
  private _isAdmin: boolean | undefined

  constructor(socket: Socket<ServerToClientEvents, ClientToServerEvents>, pcConfig?: RTCConfiguration) {
    super()
    this.socket = socket
    this.pcConfig = pcConfig
    this._myId = null
    this.pcs = {}
    this.streams = {}
    this.currentRoom = null
    this.isCall = false
    this.isInitiator = false
    this.isReady = false
    this._isAdmin = false
    this._localStream = null
    this._onSocketListeners()
  }

  _onSocketListeners() {
    console.log('socket listener initialized')
    this.socket?.on('created', (room, socketId) => {
      console.log(room, socketId)
      emitter.emit('CREATED_ROOM', {
        room,
        socketId,
      })
    })
    this.socket?.on('joined', (room, socketId) => {
      console.log(room, socketId)
      emitter.emit('JOINED_ROOM', {
        room,
        socketId,
      })
    })
  }

  joinRoom(room: string) {
    this.socket?.emit('create or join', room)
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
}
