import React from 'react'
import CONSTANTS from '../../../constants'
import styles from './StartScreen.module.scss'

const StartScreen = () => {
  return (
    <div className={styles.startScreen}>
      <div className={styles.container}>
        <div className={styles.text}>
          <div className={styles.tag}>World's #1 Naming Platform</div>
          <div className={styles.title}>How Does Squadhelp Work?</div>
          <div className={styles.info}>
            Squadhelp helps you come up with a great name for your business by
            combining the power of crowdsourcing with sophisticated technology
            and Agency-level validation services.
          </div>
          <button  className={styles.btnVideo}>
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
