import { useState } from 'react'
import { css, StyleSheet } from 'aphrodite'
import { User, Item, SignupData, LoginData, ItemData, Pages } from './types'
import { GlobalStyleSheet } from './styles/global'
import { AppStore } from './helpers/context'
import Dashboard from './views/Dashboard'
import Header from './components/Header'
import { delay } from './helpers/delay'
import Modal from './components/Modal'
import Signup from './views/Signup'
import Login from './views/Login'


function App() {
  const [user, setUser] = useState<null | User>(null)
  const [page, setPage] = useState<Pages>(Pages.LOGIN)
  const [items, setItems] = useState<null | Item[]>(null)
  const [component, setComponent] = useState<null | JSX.Element>(null)

  const fetchItems = async () => {
    setItems([
      {
        id: 1,
        userId: 1,
        quantity: 10,
        name: 'Item 1',
        isAvailable: true,
        description: 'description'
      },
      {
        id: 2,
        userId: 1,
        quantity: 13,
        name: 'Item 2',
        isAvailable: true,
        description: 'description'
      },
      {
        id: 3,
        userId: 1,
        quantity: 1,
        name: 'Item 3',
        isAvailable: false,
        description: 'description'
      }
    ])
  }

  const login = async (
    data: LoginData,
    onErr?: (err?: string) => void
  ) => {
    await delay(3000)

    setUser({
      id: 1,
      name: 'Vasya Pupkin',
      email: 'vasya@gmail.com'
    })

    setPage(Pages.DASHBOARD)
  }

  const signup = async (
    data: SignupData,
    onErr?: (err?: string) => void
  ) => {
    await delay(3000)

    setUser({
      id: 1,
      name: 'Vasya Pupkin',
      email: 'vasya@gmail.com'
    })

    setPage(Pages.DASHBOARD)
  }

  const onItemDel = async (id: number) => {
    setItems((i) => i!.filter((_i) => _i.id !== id))
  }

  const onItemAdd = async (
    data: ItemData
  ) => {
    setItems((i) => {
      if (i && user) {
        return [
          { id: i.length, userId: user.id, ...data },
          ...i
        ]
      }

      return i
    })
  }

  const onItemEdit = async (
    id: number,
    data: ItemData
  ) => {
    setItems((i) => {
      if (i) {
        const item = i.find((it) => it.id === id)

        if (item) {
          item.description = data.description
          item.isAvailable = data.isAvailable
          item.quantity = data.quantity
          item.name = data.name

          return [item, ...i.filter((it) => it.id !== id)]
        }
      }

      return i
    })
  }

  const onLogout = () => {
    setPage(Pages.LOGIN)
    setItems(null)
    setUser(null)
  }

  const resetPage = (p: Pages) => {
    const UNAUTH = [Pages.LOGIN, Pages.SIGNUP]

    if (!user && UNAUTH.includes(p)) setPage(p)
  }

  const stylesheet = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      paddingTop: 120,
      paddingLeft: 30,
      paddingRight: 30,
      paddingBottom: 80,
    }
  })

  return (
    <AppStore.Provider value={{
      onItemAdd, onItemDel, signup,
      onLogout, login, items, user,
      fetchItems, page, component,
      toggleModal: setComponent,
      resetPage, onItemEdit
    }}>
      <div className="App">
        <GlobalStyleSheet />
        <Header />
        <Modal />
        <div className={css(stylesheet.container)}>
          {page === Pages.LOGIN && <Login />}
          {page === Pages.SIGNUP && <Signup />}
          {page === Pages.DASHBOARD && <Dashboard />}
        </div>
      </div>
    </AppStore.Provider>
  )
}


export default App