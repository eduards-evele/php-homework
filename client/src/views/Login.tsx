import { css, StyleSheet } from 'aphrodite'
import { useState, useEffect, useContext } from 'react'
import { AppStore } from '../helpers/context'


const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { login } = useContext(AppStore)

  const onClick = async () => {
    setLoading(true)

    await login(
      { email, password },
      (err) => {
        setLoading(false)
        setError(err || 'Unexpected error happened, we are sorry')
      }
    )
  }

  return (
    <>
    </>
  )
}


export default Login