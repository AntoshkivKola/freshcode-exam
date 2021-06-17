import React from 'react'
import cx from 'classnames'
import CONSTANTS from '../../../constants'
import styles from './Questions.module.scss'

const Questions = () => {
  return (
    <div className={styles.questions}>
      <div className={styles.container}>
        <div className={styles.commonQuestions}>
          <ul className={styles.qList}>
            <li className={styles.item}>
              <span className={styles.itemMarker}> {'>'} </span>
              <div className={styles.itemContent}>
                <h3 className={cx(styles.qTitle, styles.mgB10)}>
                  Pay a Fraction of cost vs hiring an agency
                </h3>
                <p className={cx(styles.info, styles.mgB20)}>
                  For as low as $199, our naming contests and marketplace allow
                  you to get an amazing brand quickly and affordably.
                </p>
              </div>
            </li>

            <li className={styles.item}>
              <span className={styles.itemMarker}> {'>'} </span>
              <div className={styles.itemContent}>
                <h3 className={cx(styles.qTitle, styles.mgB10, styles.qBoldTitle)}>Satisfaction Guarantee</h3>
                <p className={cx(styles.info, styles.mgB20)}>
                  Of course! We have policies in place to ensure that you are
                  satisfied with your experience.
                  <a href='#' className={styles.qLink}>
                    Learn more
                  </a>
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div className={styles.contacts}>
          <h2 className={cx(styles.sectionTitle, styles.mgB10)}>Questions?</h2>
          <p className={cx(styles.info, styles.mgB20)}>
            Speak with a Squadhelp platform expert to learn more and get your
            questions answered.
          </p>
          <button className={cx(styles.btn, styles.mgB20)}>schedule consultation</button>
          <div className={styles.contactBlock}>
            <a href='#' className={cx(styles.phoneLink, styles.mgB10)}>
              <img src={`${CONSTANTS.STATIC_IMAGES_PATH}how_it_works/phone_icon.svg`} alt='' />
              (877) 355-3585
            </a>
            <span className={styles.info}>Call us for assistance</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Questions
