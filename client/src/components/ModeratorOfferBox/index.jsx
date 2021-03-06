import React, { useState } from 'react'
import cx from 'classnames'
import CONSTANTS from '../../constants'
import styles from './ModeratorOfferBox.module.scss'

const ModeratorOfferBox = props => {
  const {
    changeOfferStatus,
    offer: {
      id: offerId,
      text,
      fileName,
      User: { avatar, firstName, lastName, email },
      Contest: { userId: customerId }
    }
  } = props
  const [inputValue, setInputValue] = useState('')
  const [isEmpty, setIsEmpty] = useState(false)
  const changeInput = ({ target: { value } }) => {
    return setInputValue(value)
  }
  console.log('email', email)
  const changeStatus = ({
    newStatus,
    offerId,
    reasonOfBan,
    customerId,
    email,
    text
  }) => {
    if (newStatus === 'banned' && reasonOfBan.trim() === '') {
      setIsEmpty(true)
      return
    }
    setIsEmpty(false)
    changeOfferStatus({
      newStatus,
      offerId,
      reasonOfBan,
      customerId,
      email,
      text
    })
  }

  return (
    <div key={offerId} className={styles.offerContainer}>
      <div className={styles.mainInfoContainer}>
        <div className={styles.userInfo}>
          <div className={styles.creativeInfoContainer}>
            <img
              src={
                avatar
                  ? `${CONSTANTS.publicURL}${avatar}`
                  : CONSTANTS.ANONYM_IMAGE_PATH
              }
              alt='user'
            />
            <div className={styles.nameAndEmail}>
              <span>{firstName + ' ' + lastName}</span>
              <span>{email}</span>
            </div>
          </div>
        </div>
        <div className={styles.responseConainer}>
          {fileName && (
            <img
              onClick={() =>
                props.changeShowImage({
                  imagePath: fileName,
                  isShowOnFull: true
                })
              }
              className={styles.responseLogo}
              src={`${CONSTANTS.publicURL}${fileName}`}
              alt='logo'
            />
          )}
          <span className={styles.response}>{text}</span>
        </div>
      </div>
      <div className={styles.btnsContainer}>
        <div
          onClick={() =>
            changeStatus({
              newStatus: 'pending',
              offerId,
              reasonOfBan: null,
              customerId,
              email,
              text
            })
          }
          className={styles.resolveBtn}
        >
          Resolve
        </div>
        <div
          onClick={() =>
            changeStatus({
              newStatus: 'banned',
              offerId,
              reasonOfBan: inputValue,
              customerId,
              email,
              text
            })
          }
          className={styles.rejectBtn}
        >
          BAN
        </div>
      </div>
      <input
        type='text'
        onChange={changeInput}
        value={inputValue}
        placeholder='Enter ban reason'
        className={cx(styles.banInput, { [styles.isEmpty]: isEmpty })}
      />
    </div>
  )
}

export default ModeratorOfferBox
