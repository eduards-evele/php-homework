import { css, StyleSheet } from 'aphrodite'
import { useContext, useEffect, useRef } from 'react'
import { AppStore } from '../helpers/context'
import Button from '../components/Button'
import { Item } from '../types'
import Form from './ItemForm'


const Dashboard = () => {
  const { items, user, fetchItems } = useContext(AppStore)

  const _fetch = useRef(fetchItems)

  const fetchingItems = useRef(false)
  //console.log(items)
  useEffect(() => {
    const fetch = async () => {
      fetchingItems.current = true

      await _fetch.current()
    }

    if (!items && !fetchingItems.current) fetch()
  }, [items])

  if (!items || !user) return null

  const stylesheet = StyleSheet.create({
    flex: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
    container: { width: '100%', height: '100%', position: 'relative' },
    title: { fontSize: 20, fontWeight: 600, color: 'var(--dark-clr)' },
    label: { fontSize: 16, fontWeight: 600, color: 'var(--dark-clr)' },
    section: { paddingBottom: 20, width: 'calc((100vw - 30px) / 4)' },
    line: { padding: '16px 0', width: '100%' },
    space: { marginBottom: 24 }
  })

  const hasItems = (items.length > 0)
  //console.log(items)
  return (
    <main className={css(stylesheet.container)}>
      <div className={css(stylesheet.space)}>
        <div className={css(stylesheet.title)}>
          {`Hi, ${user.username}`}
        </div>
      </div>
      <div className={css(stylesheet.space)}>
        <div className={css(stylesheet.title)}>
          {
            hasItems
              ? `You have ${items.length} items listed`
              : 'You have no listed items yet'
          }
        </div>
      </div>
      {
        hasItems && (
          <div className={css(stylesheet.space)}>
            <div className={css(stylesheet.flex)}>
              <div className={css(stylesheet.section)}>
                <div className={css(stylesheet.label)}>
                  Name
                </div>
              </div>
              <div className={css(stylesheet.section)}>
                <div className={css(stylesheet.label)}>
                  Quantity
                </div>
              </div>
              <div className={css(stylesheet.section)}>
                <div className={css(stylesheet.label)}>
                  Status
                </div>
              </div>
              <div className={css(stylesheet.section)}>
                <div className={css(stylesheet.label)}>
                  Options
                </div>
              </div>
            </div>
            {
              items.map((i) => (
                <div
                  className={css([stylesheet.flex, stylesheet.line])}
                  key={i.id}
                >
                  <Section {...{ ...i }} />
                </div>
              ))
            }
          </div>
        )
      }
    </main>
  )
}


const Section: React.FC<Item> = ({
  id, name, quantity, available
}) => {
  const { onItemDel, toggleModal } = useContext(AppStore)

  const stylesheet = StyleSheet.create({
    title: { fontSize: 14, fontWeight: 500, color: 'var(--dark-clr)' },
    container: { width: 'calc((100vw - 30px) / 4)' },
    flex: { display: 'flex', alignItems: 'center' },
    space: { marginRight: 12 }
  })

  return (
    <>
      <div className={css([stylesheet.container, stylesheet.title])}>
        {name}
      </div>
      <div className={css([stylesheet.container, stylesheet.title])}>
        {quantity}
      </div>
      <div className={css([stylesheet.container, stylesheet.title])}>
        {available ? 'Available' : 'Unavailable'}
      </div>
      <div className={css([stylesheet.container, stylesheet.flex])}>
        <div className={css(stylesheet.space)}>
          <Button
            label="Edit"
            onClick={() =>
              toggleModal(
                <Form
                  {...{ id }}
                  mode="EDIT"
                />
              )
            }
            color="var(--dark-green)"
          />
        </div>
        <div>
          <Button
            label="Delete"
            color="var(--dark-red)"
            onClick={async () => await onItemDel(id)}
          />
        </div>
      </div>
    </>
  )
}


export default Dashboard