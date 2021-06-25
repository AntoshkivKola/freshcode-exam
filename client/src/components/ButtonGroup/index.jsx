import React, { useEffect, useState } from 'react'
import cx from 'classnames'
import styles from './ButtonGroup.module.scss'

const ButtonGroupContent = [
  {
    id: 0,
    badge: 'Yes',
    description: 'The Domain should exactly match the name',
    isActive: false
  },
  {
    id: 1,
    badge: 'Yes',
    description: `But minor variations are allowed\n(Recommended)`,
    isActive: false
  },
  {
    id: 2,
    badge: 'No',
    description: 'I am only looking for a name, not a Domain',
    isActive: false
  }
]

const ButtonGroup = props => {
  const [btnGC, setBtnGC] = useState(ButtonGroupContent)

  let btns
  useEffect(() => {
    btns = document.querySelector('#buttonGroup').childNodes
  })

  const toggleActiveBtn = ({ currentTarget }) => {
    const copyBtnGC = JSON.parse(JSON.stringify(btnGC))
    copyBtnGC.forEach(btn => {
      btn.isActive = false
    })
    const idTarget = currentTarget.dataset.id
    copyBtnGC[idTarget].isActive = true
    setBtnGC(copyBtnGC)
  }
  return (
    <div id='buttonGroup' className={styles.buttonGroup}>
      {btnGC.map(card => (
        <div
          className={cx(styles.buttonContainer,{
            [styles.getActive]: card.isActive
          })}
        >
          <div
            onClick={toggleActiveBtn}
            className={cx(styles.button, {
              [styles.getActive]: card.isActive
            })}
            data-id={card.id}
          >
            <span className={styles.badge}>{card.badge}</span>
            <span className={styles.description}>{card.description}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ButtonGroup
