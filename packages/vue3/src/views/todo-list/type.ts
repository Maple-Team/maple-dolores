export type FilterType = 'all' | 'active' | 'completed'
export interface Todo {
  title: string
  completed?: boolean
  id: string
}
