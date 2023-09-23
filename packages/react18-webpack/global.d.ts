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
}
