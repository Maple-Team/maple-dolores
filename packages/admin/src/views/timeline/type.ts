export interface Timeline {
  date: string
  time: string
  content: string
  type: 'timeline' | 'treehole'
}

export type TimelineParams = Timeline & {}
