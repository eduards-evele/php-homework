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
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setDisabled(
      loading ||
      !validator.isEmail(email) ||
      !validator.isLength(password, { min: 8 })
    )
  }, [email, password, loading])

  const { login } = useContext(AppStore)

  const onClick = async () => {
    setLoading(true)
    setError(null)

    await login(
      { email, password },
      (err) => {
        setLoading(false)
        setError(err || 'Unexpected error happened, we are sorry')
      }
    )
  }

  const style = StyleSheet.create({
    space: { marginBottom: 24 },
    error: {
      color: 'var(--dark-red)',
      fontWeight: 400,
      fontSize: 14
    }
  })

  return (
    <Dialog label="Log In">
      {
        !!error && (
          <div className={css(style.space)}>
            <Warning label={error} />
          </div>
        )
      }
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
          label="Log In"
          {...{ onClick, disabled }}
          color={disabled ? 'var(--answer)' : 'var(--opposite-contrast)'}
        />
      </div>
    </Dialog>
  )
}


export default Login