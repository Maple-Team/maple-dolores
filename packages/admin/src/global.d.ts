declare interface BaseList<T> {
  pagination: {
    total: number
    current: number
    pageSize: number
  }
  records: T[]
}

declare interface BaseResponse<T> {
  status: number
  message: string
  data: T
}

declare type LabelType = 'normal' | 'fiction' | 'image'

declare type AnyToFix = any

declare type Params<T> = Partial<T> & {
  current?: number
  pageSize?: number
}

declare interface Bean {
  _id: string
  id: string
}
