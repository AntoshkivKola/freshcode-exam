import React from 'react'
import cx from 'classnames'
import CONSTANTS from '../../../constants'
import styles from './GetStarted.module.scss'

const GetStarted = () => {
  return (
    <div className={styles.GetStarted}>
      <div className={cx(styles.imgWrapper, styles.imgW_1)}> 
        <img className={styles.img}src={`${CONSTANTS.STATIC_IMAGES_PATH}how_it_works/get_started_1.svg`} alt="" />
      </div>
      <div className={styles.container}> 
        <h2 className={cx(styles.sectionTitle, styles.textCenter, styles.mgB10)}>Ready to get started?</h2>
        <p className={cx(styles.text , styles.textCenter, styles.mgB20)}>Fill out your contest brief and begin receiving custom name suggestions within minutes.</p>
        <button className={cx(styles.btn, styles.center)}>start a contest</button>
      </div>
      <div className={cx(styles.imgWrapper, styles.imgW_2)}> 
        <img className={styles.img} src={`${CONSTANTS.STATIC_IMAGES_PATH}how_it_works/get_started_2.svg`} alt="" />
      </div>

    </div>
  );
}

export default GetStarted;
