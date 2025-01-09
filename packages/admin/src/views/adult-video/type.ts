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

export interface AdultVideo {
  _id: string
  code: string
  title: string
  date: string
  previews: string[]
  cover: string
  director: string
  actresses: string[]
  tags?: string[]
  comments?: string
  series?: string[]
}
