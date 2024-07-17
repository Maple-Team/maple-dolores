/// <reference types="@liutsing/types-utils/global" />
/// <reference types="@welldone-software/why-did-you-render" />
/// <reference types="@tanstack/react-query" />

declare interface BaseResponse<T> {
  status: number
  message: string
  data: T
}
declare interface Window {
  queryCache: QueryCache
  __GARFISH__: boolean
}

declare type HandleData = Omit<Match<AnyToFix, AnyToFix>, 'data' | 'handle'>
declare interface Handle {
  crumb: (data: HandleData) => string
}
declare interface Match<T, U> {
  id: string
  pathname: string
  params: Params<string>
  data: T // loader element?
  handle: U
}

interface Message {
  id: string
  room: string
  message: string
  username: string
  messageType: 'CLIENT' | 'SERVER'
  createdAt: Date
}
