import React, { useEffect, useState } from 'react'
import cx from 'classnames'
import styles from './ButtonGroup.module.scss'
import mainStyles from '../ContestForm/ContestForm.module.sass'
import CONSTANTS from '../../constants'

const ButtonGroup = props => {
  const [btnGC, setBtnGC] = useState(CONSTANTS.BUTTON_GROUP_CONTENT)

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
