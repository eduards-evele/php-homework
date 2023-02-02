import { useState, useRef } from 'react'
import { css, StyleSheet } from 'aphrodite'
import { AppStore } from './helpers/context'
import { GlobalStyleSheet } from './styles/global'
import { User, Item, SignupData, LoginData, ItemData, Pages } from './types'
import Header from './components/Header'


function App() {
  const [user, setUser] = useState<null | User>(null)
  const [page, setPage] = useState<Pages>(Pages.LOGIN)
  const [items, setItems] = useState<null | Item[]>(null)

  const fetchingItems = useRef(false)

  const fetchItems = async () => {
    fetchingItems.current = true
  }

  const login = async (
    data: LoginData,
    onErr?: (err?: string) => void
  ) => {

  }

  const signup = async (
    data: SignupData,
    onSuccess: VoidFunction,
    onErr?: (err?: string) => void
  ) => {

  }

  const onItemDel = async (id: number) => {

  }

  const onItemAdd = async (
    data: ItemData
  ) => {

  }

  const onItemEdit = async (
    id: number,
    data: ItemData
  ) => {

  }

  const onLogout = () => {

  }

  const resetPage = (p: Pages) => {
    const UNAUTH = [Pages.LOGIN, Pages.SIGNUP]

    if (!user && UNAUTH.includes(p)) setPage(p)
  }


  const stylesheet = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      paddingTop: 80,
      paddingLeft: 30,
      paddingRight: 30,
      paddingBottom: 80,
    }
  })

  return (
    <AppStore.Provider value={{
      onItemAdd, onItemDel, signup,
      onLogout, login, items, user,
      resetPage, onItemEdit,
      fetchItems, page
    }}>
      <div className="App">
        <GlobalStyleSheet />
        <Header />
        <div className={css(stylesheet.container)}>

        </div>
      </div>
    </AppStore.Provider>
  )
}


export default App
