export interface Video {
  title: string
  code: string
  actresses: string[]
  tags?: string[]
  series?: string
  releaseDate?: Date
  previews?: string[]
  cover?: string
  thumb?: string
  director?: string
  comments?: string
}

export interface Actress {
  name: string
  avatar?: string
}
