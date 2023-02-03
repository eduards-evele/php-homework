import axios from 'axios'
import { useState } from 'react'
import { css, StyleSheet } from 'aphrodite'
import { User, Item, SignupData, LoginData, ItemData, Pages } from './types'
import { GlobalStyleSheet } from './styles/global'
import { API_HOSTNAME } from './helpers/config'
import { AppStore } from './helpers/context'
import Dashboard from './views/Dashboard'
import Header from './components/Header'
import Modal from './components/Modal'
import Signup from './views/Signup'
import Login from './views/Login'


function App() {
  const [user, setUser] = useState<null | User>(null)
  const [page, setPage] = useState<Pages>(Pages.LOGIN)
  const [token, setToken] = useState<null | string>(null)
  const [items, setItems] = useState<null | Item[]>(null)
  const [component, setComponent] = useState<null | JSX.Element>(null)

  const fetchItems = async () => {
    try {
      const method = 'GET'
      const url = `${API_HOSTNAME}/api/items/get`
      const headers = { 'Authorization': `Bearer ${token}` }

      const { data } = await axios({ url, headers, method })

      setItems(data.data)
    } catch { }
  }

  const login = async (
    data: LoginData,
    onErr?: (err?: string) => void
  ) => {
    try {
      const method = 'POST'
      const url = `${API_HOSTNAME}/api/users/login`

      const { data: { token, error, user } } = await axios({ url, data, method })

      if (token) {
        const split = token.split(' ')

        setToken(split[1])

        setUser(user)

        return setPage(Pages.DASHBOARD)
      }

      if (onErr) onErr(error)
    } catch { }
  }

  const signup = async (
    data: SignupData,
    onErr?: (err?: string) => void
  ) => {
    try {
      const method = 'POST'
      const url = `${API_HOSTNAME}/api/users/register`

      const { data: { token, error, user } } = await axios({ url, data, method })

      if (token) {
        const split = token.split(' ')

        setToken(split[1])

        setUser(user)

        return setPage(Pages.DASHBOARD)
      }

      if (onErr) onErr(error)
    } catch { }
  }

  const onItemDel = async (id: number) => {
    setItems((i) => i!.filter((_i) => _i.id !== id))

    try {
      const data = { id }
      const method = 'POST'
      const url = `${API_HOSTNAME}/api/items/delete`
      const headers = { 'Authorization': `Bearer ${token}` }

      await axios({ url, data, method, headers })
    } catch { }
  }

  const onItemAdd = async (data: ItemData) => {
    try {
      const method = 'POST'
      const url = `${API_HOSTNAME}/api/items/register`
      const headers = { 'Authorization': `Bearer ${token}` }

      const res = await axios({ headers, method, data, url })

      setItems((i) => {
        if (i && user) {
          return [
            res.data.data,
            ...i
          ]
        }

        return i
      })

    } catch { }
  }

  const onItemEdit = async (
    id: number,
    payload: ItemData
  ) => {
    try {
      const method = 'POST'
      const data = { ...payload, id }
      const url = `${API_HOSTNAME}/api/items/register`
      const headers = { 'Authorization': `Bearer ${token}` }

      await axios({ headers, method, data, url })

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
    } catch { }
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