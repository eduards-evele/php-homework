import { useContext } from 'react'
import { css, StyleSheet } from 'aphrodite'
import { AppStore } from '../helpers/context'


const Modal = () => {
  const { component } = useContext(AppStore)

  if (!component) return null

  const stylesheet = StyleSheet.create({
    container: {
      backgroundColor: 'var(--dark-hover-clr)',
      display: 'flex', alignItems: 'center',
      top: 0, left: 0, position: 'fixed',
      width: '100vw', height: '100vh',
      justifyContent: 'center',
      padding: 20, zIndex: 120
    }
  })

  return (
    <div className={css(stylesheet.container)}>
      {component}
    </div>
  )
}


export default Modal