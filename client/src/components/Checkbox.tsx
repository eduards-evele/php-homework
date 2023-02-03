import { css, StyleSheet } from 'aphrodite'
import { Check } from '../assets/SVG'


interface Props {
  label: string
  checked: boolean
  onCheck: (c: boolean) => void
}


const Checkbox: React.FC<Props> = ({
  label, checked, onCheck
}) => {
  const stylesheet = StyleSheet.create({
    container: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    label: {
      fontSize: 12,
      fontWeight: 400,
      color: 'var(--dark-clr)'
    },
    check: {
      height: 24,
      width: 24,
      borderRadius: 4,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: 'solid 1px var(--opposite-contrast)',
      backgroundColor: checked ? 'var(--opposite-contrast)' : 'transparent',
    }
  })

  return (
    <button
      className={css(stylesheet.container)}
      onClick={() => onCheck(!checked)}
    >
      <div className={css(stylesheet.label)}>
        {label}
      </div>
      <div className={css(stylesheet.check)}>
        <Check
          size={12}
          color={checked ? 'var(--white-clr)' : 'transparent'}
        />
      </div>
    </button>
  )
}


export default Checkbox