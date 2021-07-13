import React, { useEffect, useState } from 'react'
import cx from 'classnames'
import styles from './ButtonGroup.module.scss'
import mainStyles from '../ContestForm/ContestForm.module.sass'

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
    description: `But minor variations are allowed (Recommended)`,
    isActive: true
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
    <div className={mainStyles.inputContainer}>
      <h2 className={mainStyles.inputHeader}> Do you want a matching domain (.com URL) with your name? </h2>
      <p className={styles.description}>
        If you want a matching domain, our platform will only accept those name
        suggestions where the domain is available. (Recommended)
      </p>
      <div id='buttonGroup' className={styles.buttonGroup}>
        {btnGC.map(card => (
          <div
            className={cx(styles.buttonContainer, {
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
    </div>
  )
}

export default ButtonGroup
