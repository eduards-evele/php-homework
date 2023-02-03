import { useContext } from 'react'
import { css, StyleSheet } from 'aphrodite'
import { AppStore } from '../helpers/context'
import { CloseIcon } from '../assets/SVG'


interface Props {
  label: string
  cancellable?: boolean
}


const Dialog: React.FC<React.PropsWithChildren<Props>> = ({
  children, cancellable, label
}) => {
  const { toggleModal } = useContext(AppStore)

  const style = StyleSheet.create({
    container: {
      justifyContent: 'center',
      position: 'relative',
      alignItems: 'center',
      display: 'flex',
      height: '100%',
      width: '100%',
      padding: 20
    },
    dialog: {
      width: '100%',
      maxWidth: 567,
      display: 'flex',
      borderRadius: 10,
      alignItems: 'center',
      flexDirection: 'column',
      backgroundColor: 'var(--white-clr)',
      border: 'solid 1px var(--frame-clr)'
    },
    header: {
      height: 55,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: 'solid 1px var(--frame-clr)'
    },
    title: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--dark-clr)'
    },
    body: {
      padding: 20,
      width: '100%',
      position: 'relative'
    },
    close: {
      padding: 16,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  })

  return (
    <div className={css(style.container)}>
      <div className={css(style.dialog)}>
        <header className={css(style.header)}>
          <div>
            {
              cancellable && (
                <button
                  onClick={() => toggleModal(null)}
                  className={css(style.close)}
                >
                  <CloseIcon
                    size={16}
                    color="var(--opposite-contrast)"
                  />
                </button>
              )
            }
          </div>
          <h1 className={css(style.title)}>
            {label}
          </h1>
          <div />
        </header>
        <div className={css(style.body)}>
          {children}
        </div>
      </div>
    </div>
  )
}


export default Dialog