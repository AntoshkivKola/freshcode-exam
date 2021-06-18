import React from 'react'
import cx from 'classnames'
import CONSTANTS from '../../../constants'
import styles from './StartScreen.module.scss'

const StartScreen = () => {
  return (
    <div className={styles.startScreen}>
      <div className={styles.container}>
        <div className={styles.text}>
          <div className={cx(styles.tag, styles.mgB10)}>World's #1 Naming Platform</div>
          <div className={cx(styles.title, styles.mgB10)}>How Does Squadhelp Work?</div>
          <div className={cx(styles.info, styles.mgB20)}>
            Squadhelp helps you come up with a great name for your business by
            combining the power of crowdsourcing with sophisticated technology
            and Agency-level validation services.
          </div>
          <button  className={cx(styles.btnVideo, styles.btn)}>
            <span class="fas fa-play" ></span>
            <span className={styles.btnVideoText}  > Play Video</span>
          </button>
        </div>
        <div className={styles.imgWrapper}>
          <img className={styles.img} src={`${ CONSTANTS.STATIC_IMAGES_PATH }how_it_works/start_screen_1.png`}/>
        </div>
      </div>
    </div>
  )
}

export default StartScreen
