// Web app specific types

export interface SearchState {
  isLoading: boolean
  results: any[]
  error: string | null
  filters: {
    specialty: string
    location: string
    radius: number
  }
}

export interface UIState {
  isMobile: boolean
  theme: 'light' | 'dark'
  sidebarOpen: boolean
}

export interface AppState {
  search: SearchState
  ui: UIState
}
