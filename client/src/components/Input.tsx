import { css, StyleSheet } from 'aphrodite'


interface Props {
  value: string
  label: string
  disabled?: boolean
  multiline?: boolean
  setValue: (v: string) => void
  type: React.HTMLInputTypeAttribute
}


const Input: React.FC<Props> = ({
  label, value, multiline,
  setValue, type, disabled
}) => {
  const style = StyleSheet.create({
    container: { position: 'relative', width: '100%' },
    input: {
      fontSize: 14,
      width: '100%',
      resize: 'none',
      borderRadius: 8,
      display: 'block',
      padding: '16px 10px',
      backgroundColor: 'transparent',
      border: 'solid 1px var(--frame-clr)',
      ':focus': { borderColor: 'var(--dark-clr)' },
      ":placeholder": {
        fontSize: 14
      }
    }
  })

  if (multiline) {
    return (
      <div className={css(style.container)}>
        <textarea
          placeholder={label}
          {...{ value, disabled }}
          className={css(style.input)}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    )
  }

  return (
    <div className={css(style.container)}>
      <input
        placeholder={label}
        className={css(style.input)}
        {...{ value, disabled, type }}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}


export default Input