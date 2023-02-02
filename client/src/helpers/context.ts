import { createContext } from 'react'
import { AppStateContext, Pages } from '../types'


export const AppStore = createContext<AppStateContext>({
  onItemEdit: async () => { },
  fetchItems: async () => { },
  onItemDel: async () => { },
  onItemAdd: async () => { },
  signup: async () => { },
  login: async () => { },
  resetPage: () => { },
  onLogout: () => { },
  page: Pages.LOGIN,
  items: null,
  user: null
})