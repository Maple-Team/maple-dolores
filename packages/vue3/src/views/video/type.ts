interface SourceType {
  src: string
  type: string
}

export interface PlayerOptions {
  autoplay?: boolean
  sources: SourceType[]
  // src?: string
  muted?: boolean
  controls?: boolean | undefined
  loop?: boolean
  height?: string | number
  poster?: string
  preload?: 'auto' | 'metadata' | 'none'
  aspectRatio?: string
  fluid?: boolean | undefined
  controlBar?: AnyToFix
  bigPlayButton?: boolean
}
export interface LzzModel {
  year: number
  date: string
  time: string[]
  _id: string
}
export type LzzResponse = Record<string, LzzModel[]>
