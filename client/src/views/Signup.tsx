import validator from 'validator'
import { css, StyleSheet } from 'aphrodite'
import { useState, useContext, useEffect } from 'react'
import { AppStore } from '../helpers/context'
import Warning from '../components/Warning'
import Dialog from '../components/Dialog'
import Button from '../components/Button'
import Input from '../components/Input'


const Login = () => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { signup } = useContext(AppStore)

  useEffect(() => {
    setDisabled(
      loading ||
      !validator.isEmail(email) ||
      !validator.isAlphanumeric(username) ||
      !validator.isLength(password, { min: 8 })
    )
  }, [email, password, username, loading])

  const onClick = async () => {
    setLoading(true)
    setError(null)

    await signup(
      { email, username, password },
      (err) => {
        setLoading(false)
        setError(err || 'Unexpected error happened, we are sorry')
      }
    )
  }

  const style = StyleSheet.create({
    space: { marginBottom: 24 }
  })

  return (
    <Dialog label="Sign Up">
      {
        !!error && (
          <div className={css(style.space)}>
            <Warning label={error} />
          </div>
        )
      }
      <div className={css(style.space)}>
        <Input
          type="text"
          value={username}
          label="Your Username"
          setValue={setUsername}
        />
      </div>
      <div className={css(style.space)}>
        <Input
          type="email"
          value={email}
          label="Your Email"
          setValue={setEmail}
        />
      </div>
      <div className={css(style.space)}>
        <Input
          type="password"
          value={password}
          label="Your Password"
          setValue={setPassword}
        />
      </div>
      <div>
        <Button
          fullcontainer
          label="Sign Up"
          {...{ onClick, disabled }}
          color={disabled ? 'var(--answer)' : 'var(--opposite-contrast)'}
        />
      </div>
    </Dialog>
  )
}


export default Login