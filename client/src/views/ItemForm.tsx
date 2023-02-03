import validator from 'validator'
import { css, StyleSheet } from 'aphrodite'
import { useContext, useState, useEffect } from 'react'
import { AppStore } from '../helpers/context'
import Checkbox from '../components/Checkbox'
import Button from '../components/Button'
import Dialog from '../components/Dialog'
import Input from '../components/Input'


interface Props {
  mode: 'EDIT' | 'CREATE'
  id?: number
}


const Item: React.FC<Props> = ({ mode, id }) => {
  const {
    onItemAdd, onItemEdit,
    toggleModal, items
  } = useContext(AppStore)

  const item = items!.find((i) => i.id === id)

  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [name, setName] = useState(item ? item.name : '')
  const [quantity, setQuantity] = useState(item ? item.quantity : 0)
  const [description, setDescription] = useState(item ? item.description : '')
  const [isAvailable, setAvailability] = useState(!!(item && item.isAvailable))

  useEffect(() => {
    setDisabled(
      loading ||
      !validator.isLength(name, { min: 5 }) ||
      !validator.isLength(description, { min: 8 })
    )
  }, [name, description, loading])

  const style = StyleSheet.create({
    space: { marginBottom: 24 },
    error: {
      color: 'var(--dark-red)',
      fontWeight: 400,
      fontSize: 14
    }
  })

  const updateQuantity = (v: string) => {
    if (v.length === 0) setQuantity(0)
    if (validator.isNumeric(v)) setQuantity(parseInt(v))
  }

  const onSubmit = async () => {
    setLoading(true)

    mode === 'EDIT'
      ? await onItemEdit(id!, {
        name, isAvailable,
        quantity, description
      })
      : await onItemAdd({
        name, isAvailable,
        quantity, description
      })

    toggleModal(null)
  }

  return (
    <Dialog
      label={
        mode === 'EDIT'
          ? 'Edit item'
          : 'Register Item'
      }
      cancellable
    >
      <div className={css(style.space)}>
        <Input
          type="text"
          value={name}
          label="Name"
          setValue={setName}
        />
      </div>
      <div className={css(style.space)}>
        <Input
          type="text"
          value={description}
          label="Description"
          setValue={setDescription}
        />
      </div>
      <div className={css(style.space)}>
        <Input
          type="text"
          label="Quantity"
          setValue={updateQuantity}
          value={quantity.toString()}
        />
      </div>
      <div className={css(style.space)}>
        <Checkbox
          label="Is available"
          checked={isAvailable}
          onCheck={setAvailability}
        />
      </div>
      <div>
        <Button
          fullcontainer
          label="Submit"
          {...{ disabled }}
          onClick={onSubmit}
          color={disabled ? 'var(--answer)' : 'var(--opposite-contrast)'}
        />
      </div>
    </Dialog>
  )
}


export default Item