import React from 'react'
import cx from 'classnames'
import CONSTANTS from '../../../constants'
import styles from './Services.module.scss'

const Services = () => {
  return (
    <div className={cx(styles.services, styles.center)}>
      <div className={styles.container}>
        <div className={cx(styles.textCenter, styles.textContainer)}>
          <div className={cx(styles.tag, styles.textCenter, styles.mgB10)}>
            Our Services
          </div>
          <h2 className={cx(styles.title, styles.textCenter, styles.mgB10)}>
            3 Ways To Use Squadhelp
          </h2>
          <p className={cx(styles.info, styles.textCenter)}>
            Squadhelp offers 3 ways to get you a perfect name for your business.
          </p>
        </div>
        <div className={cx(styles.cardContainer)}>
        <article className={styles.card}>
          <div className={cx(styles.iconWrapper, styles.center)}>
            <img
              className={styles.icon}
              src={`${CONSTANTS.STATIC_IMAGES_PATH}how_it_works/services_icon_1.png`}
              alt=''
            />
          </div>
          <h3 className={cx(styles.subtitle, styles.textCenter, styles.mgB10)}>
            Launch a Contest
          </h3>
          <p className={cx(styles.info, styles.textCenter, styles.mgB20)}>
            Work with hundreds of creative experts to get custom name
            suggestions for your business or brand. All names are auto-checked
            for URL availability.
          </p>
          <button className={cx(styles.btn, styles.textCenter)}>
            launch a contest
          </button>
        </article>

        <article className={styles.card}>
          <div className={cx(styles.iconWrapper, styles.center)}>
            <img
              className={styles.icon}
              src={`${CONSTANTS.STATIC_IMAGES_PATH}how_it_works/services_icon_2.png`}
              alt=''
            />
          </div>
          <h3 className={cx(styles.subtitle, styles.textCenter, styles.mgB10)}>
            Explore Names For Sale
          </h3>
          <p className={cx(styles.info, styles.textCenter, styles.mgB20)}>
            Our branding team has curated thousands of pre-made names that you
            can purchase instantly. All names include a matching URL and a
            complimentary Logo Design
          </p>
          <button className={cx(styles.btn, styles.textCenter)}>
            explore names for sale
          </button>
        </article>

        <article className={styles.card}>
          <div className={cx(styles.iconWrapper, styles.center)}>
            <img
              className={styles.icon}
              src={`${CONSTANTS.STATIC_IMAGES_PATH}how_it_works/services_icon_3.png`}
              alt=''
            />
          </div>
          <h3 className={cx(styles.subtitle, styles.textCenter, styles.mgB10)}>
            Agency-level Managed Contests
          </h3>
          <p className={cx(styles.info, styles.textCenter, styles.mgB20)}>
            Our Managed contests combine the power of crowdsourcing with the
            rich experience of our branding consultants. Get a complete
            agency-level experience at a fraction of Agency costs
          </p>
          <button className={cx(styles.btn, styles.textCenter)}>
            Learn More
          </button>
        </article>
        </div>
      </div>
    </div>
  )
}

export default Services
