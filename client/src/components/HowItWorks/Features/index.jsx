import React from 'react'
import cx from 'classnames'
import CONSTANTS from '../../../constants'
import styles from './Features.module.scss'

const Features = () => {
  return (
    <div className={styles.features}>
      <div className={styles.container}>
        <div className={styles.textCenter}>
          <div className={cx(styles.iconWrapper, styles.center)}>
            <img
              className={styles.icon}
              src={`${CONSTANTS.STATIC_IMAGES_PATH}how_it_works/features_1.png`}
              alt=''
            />
          </div>
          <h2 className={styles.sectionTitle}>How Do Naming Contests Work?</h2>
        </div>
        <div className={styles.contentWrapper}>
          <ul className={styles.list}>
            <li className={styles.itemWrapper}>
              <div className={styles.item}>
                <span className={styles.itemNumber}> 1.</span>
                <span className={styles.info}>
                  Fill out your Naming Brief and begin receiving name ideas in
                  minutes
                </span>
              </div>
            </li>
            <li className={styles.itemWrapper}>
              <div className={styles.item}>
                <span className={styles.itemNumber}> 2.</span>
                <span className={styles.info}>
                  Rate the submissions and provide feedback to creatives.
                  Creatives submit even more names based on your feedback.
                </span>
              </div>
            </li>
            <li className={styles.itemWrapper}>
              <div className={styles.item}>
                <span className={styles.itemNumber}>3.</span>
                <span className={styles.info}>
                  Our team helps you test your favorite names with your target
                  audience. We also assist with Trademark screening.
                </span>
              </div>
            </li>
            <li className={styles.itemWrapper}>
              <div className={styles.item}>
                <span className={styles.itemNumber}> 4.</span>
                <span className={styles.info}>
                  Pick a Winner. The winner gets paid for their submission.
                </span>
              </div>
            </li>
          </ul>
          <div className={cx(styles.imgWrapper, styles.center)}>
            <img
              className={styles.img}
              src={`${CONSTANTS.STATIC_IMAGES_PATH}how_it_works/features_2.png`}
              alt=''
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Features
