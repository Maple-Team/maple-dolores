export interface Label {
  name: string
  type: LabelType
  id: number
}

export interface Fiction {
  bookName: string
  chapterName: string
  chapterContent: string
  chapterNo: number
  words: number
  labels?: string[]
}
