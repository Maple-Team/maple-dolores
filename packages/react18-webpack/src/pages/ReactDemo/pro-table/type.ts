export interface Timeline {
  content: string
  type: 'timeline' | 'treehole'
  createdAt: string
  updatedAt: string
  id: string
  ts?: number
}
