

export enum Pages {
  LOGIN = 'login',
  SIGNUP = 'signup',
  DASHBOARD = 'dashboard'
}


export interface Item {
  id: number
  name: string
  userId: number
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
  isAvailable: boolean
}


export interface AppStateContext {
  signup: (data: SignupData, onErr?: (err?: string) => void) => Promise<void>
  login: (data: LoginData, onErr?: (err?: string) => void) => Promise<void>
  onItemEdit: (id: number, data: ItemData) => Promise<void>
  toggleModal: (elem: JSX.Element | null) => void
  onItemAdd: (data: ItemData) => Promise<void>
  onItemDel: (id: number) => Promise<void>
  fetchItems: () => Promise<void>
  resetPage: (p: Pages) => void
  component: JSX.Element | null
  onLogout: VoidFunction
  items: Item[] | null
  user: User | null
  page: Pages
}