/// <reference types="@liutsing/types-utils/global" />
/// <reference types="ant-design-vue/typings/global" />

declare type LabelType = 'normal' | 'fiction' | 'image'

declare interface Bean {
  _id: string
  id: string
}

declare type Params<T> = Partial<T> & {
  current?: number
  pageSize?: number
}
