import { useContext } from 'react'
import { css, StyleSheet } from 'aphrodite'
import { AppStore } from '../helpers/context'
import Form from '../views/ItemForm'
import { Pages } from '../types'


const Header = () => {
  const {
    user, page, toggleModal,
    onLogout, resetPage
  } = useContext(AppStore)

  const stylesheet = StyleSheet.create({
    container: {
      top: 0,
      left: 0,
      height: 80,
      zIndex: 100,
      width: '100vw',
      display: 'flex',
      paddingLeft: 30,
      paddingRight: 30,
      position: 'fixed',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: 'var(--white-clr)',
      borderBottom: 'solid 1px var(--frame-clr)'
    },
    logo: {
      fontFamily: 'Comfortaa',
      fontWeight: 700,
      fontSize: 28
    },
    buttons: {
      display: 'flex',
      alignItems: 'center'
    },
    button: {
      fontSize: 13,
      marginLeft: 24,
      fontWeight: 600,
      cursor: 'pointer',
      color: 'var(--dark-clr)',
      textDecoration: 'underline'
    }
  })

  return (
    <header className={css(stylesheet.container)}>
      <div className={css(stylesheet.logo)}>
        Logo
      </div>
      <div className={css(stylesheet.buttons)}>
        {
          user && (
            <>
              <button
                className={css(stylesheet.button)}
                onClick={() =>
                  toggleModal(
                    <Form mode="CREATE" />
                  )
                }
              >
                Add Item
              </button>
              <button
                onClick={onLogout}
                className={css(stylesheet.button)}
              >
                Logout
              </button>
            </>
          )
        }
        {
          !user && (
            <>
              {
                page === Pages.LOGIN
                  ? (
                    <button
                      onClick={() => resetPage(Pages.SIGNUP)}
                      className={css(stylesheet.button)}
                    >
                      Sign Up
                    </button>
                  )
                  : (
                    <button
                      onClick={() => resetPage(Pages.LOGIN)}
                      className={css(stylesheet.button)}
                    >
                      Log In
                    </button>
                  )
              }
            </>
          )
        }
      </div>
    </header>
  )
}


export default Header