import { css, StyleSheet } from 'aphrodite'


interface Props {
  label: string
  color?: string
  disabled?: boolean
  fullcontainer?: boolean
  onClick: React.MouseEventHandler<HTMLButtonElement>
}


const Button: React.FC<Props> = ({
  label, color, disabled,
  onClick, fullcontainer
}) => {
  const style = StyleSheet.create({
    container: {
      width: fullcontainer ? '100%' : undefined,
      color: 'var(--white-clr)',
      backgroundColor: color,
      textAlign: 'center',
      display: 'block',
      borderRadius: 6,
      fontWeight: 600,
      fontSize: 13,
      padding: 12
    }
  })

  return (
    <button
      className={css(style.container)}
      {...{ onClick, disabled }}
    >
      {label}
    </button>
  )
}


export default Button