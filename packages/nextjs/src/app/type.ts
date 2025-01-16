export interface Video {
  title: string
  code: string
  actresses: string[]
  tags?: string[]
  series?: string
  previews?: string[]
  cover?: string
  thumb?: string
  director?: string
  comments?: string
  date?: string
}

export interface Actress {
  name: string
  avatar?: string
}
