import { css, StyleSheet } from 'aphrodite'


interface Props {
  label: string
}


const Warning: React.FC<Props> = ({ label }) => {
  const style = StyleSheet.create({
    container: {
      border: 'solid 2px var(--dark-red)',
      color: 'var(--dark-red)',
      padding: '10px 12px',
      borderRadius: 6,
      fontWeight: 400,
      width: '100%',
      fontSize: 12
    }
  })

  return (
    <div className={css(style.container)}>
      {label}
    </div>
  )
}


export default Warning