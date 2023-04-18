/// <reference types="@liutsing/types-utils/global" />
/// <reference types="@welldone-software/why-did-you-render" />

declare interface BaseResponse<T> {
  status: number
  message: string
  data: T
}
