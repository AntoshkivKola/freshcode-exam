import React from 'react'
import cx from 'classnames'
import CONSTANTS from '../../../constants'
import styles from './Clients.module.scss'

const Clients = () => {
  return (
    <div className={styles.clients}>
      <div className={styles.container}>
        <h3 className={cx(styles.sectionTitle, styles.mgB10)}>
          Featured In
        </h3>
        <div className={styles.clientsContainer}>
          <div className={styles.imgWrapper}>
            <img className={styles.img} src={`${CONSTANTS.STATIC_IMAGES_PATH}how_it_works/clients_1.svg`} alt="" />
          </div>
          <div className={styles.imgWrapper}>
            <img className={styles.img} src={`${CONSTANTS.STATIC_IMAGES_PATH}how_it_works/clients_2.svg`} alt="" />
          </div>
          <div className={styles.imgWrapper}>
            <img className={styles.img} src={`${CONSTANTS.STATIC_IMAGES_PATH}how_it_works/clients_3.svg`} alt="" />
          </div>
          <div className={styles.imgWrapper}>
            <img className={styles.img} src={`${CONSTANTS.STATIC_IMAGES_PATH}how_it_works/clients_4.svg`} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Clients;
