export interface Blog extends Bean {
  title: string
  reads: number
  content: string
  category: string
  date: string
  url: string
  isRecommend: boolean
}
