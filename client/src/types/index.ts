

export enum Pages {
  LOGIN = 'login',
  SIGNUP = 'signup',
  DASHBOARD = 'dashboard'
}


export interface Item {
  id: number
  name: string
  userId: string
  quantity: number
  description: string
  isAvailable: boolean
}


export interface User {
  id: number
  name: string
  email: string
}


export interface LoginData {
  email: string
  password: string
}


export interface SignupData {
  email: string
  username: string
  password: string
}


export interface ItemData {
  name: string
  quantity: number
  description: string
  availability: boolean
}


export interface AppStateContext {
  login: (data: LoginData, onErr?: (err?: string) => void) => void
  signup: (
    data: SignupData,
    onSuccess: VoidFunction,
    onErr?: (err?: string) => void
  ) => void
  onItemEdit: (id: number, data: ItemData) => Promise<void>
  onItemAdd: (data: ItemData) => Promise<void>
  onItemDel: (id: number) => Promise<void>
  fetchItems: () => Promise<void>
  resetPage: (p: Pages) => void
  onLogout: VoidFunction
  items: Item[] | null
  user: User | null
  page: Pages
}