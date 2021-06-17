import React from 'react'
import cx from 'classnames'
import CONSTANTS from '../../../constants'
import styles from './Stats.module.scss'

const Stats = () => {
  return (
    <div className={styles.stats}>
      <div className={styles.container}>
        <article className={styles.stat}>
          <div className={cx(styles.imgWrapper, styles.center, styles.mgB10)}>
            <img
              className={styles.img}
              src={`${CONSTANTS.STATIC_IMAGES_PATH}how_it_works/stats_1.svg`}
              alt=''
            />
          </div>
          <p className={cx(styles.info, styles.textCenter)}>
            <span className={styles.boldText}>4.9 out of 5 stars</span> from
            25,000+ customers.
          </p>
        </article>

        <article className={styles.stat}>
          <div className={cx(styles.imgWrapper, styles.center, styles.mgB10)}>
            <img
              className={styles.img}
              src={`${CONSTANTS.STATIC_IMAGES_PATH}how_it_works/stats_2.png`}
              alt=''
            />
          </div>
          <p className={cx(styles.info, styles.textCenter)}>
            Our branding community stands{' '}
            <span className={styles.boldText}>200,000+</span> strong.
          </p>
        </article>

        <article className={styles.stat}>
          <div className={cx(styles.imgWrapper, styles.center, styles.mgB10)}>
            <img
              className={styles.img}
              src={`${CONSTANTS.STATIC_IMAGES_PATH}how_it_works/stats_3.svg`}
              alt=''
            />
          </div>

          <p className={cx(styles.info, styles.textCenter)}>
            <span className={styles.boldText}>140+ Industries </span>
            supported across more than
            <span className={styles.boldText}> 85 countries </span>
            <br /> – and counting.
          </p>
        </article>
      </div>
    </div>
  )
}

export default Stats
