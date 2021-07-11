import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import { connect } from 'react-redux'
import {
  getModeratorOffers,
  setModeratorOfferStatus
} from '../../actions/actionCreator'
import CONSTANTS from '../../constants'

import styles from './ModeratorDashboard.module.scss'
const ModeratorDashboard = props => {
  const { getOffers, offers, setOfferStatus } = props
  useEffect(() => {
    getOffers()
  }, [])

  const changeOfferStatus = ({ offerId, newStatus }) => {
    confirmAlert({
      title: 'confirm',
      message: 'Are u sure?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => setOfferStatus({ offerId, newStatus })
        },
        {
          label: 'No'
        }
      ]
    })
  }

  //<li key={offer.id}>{JSON.stringify(offer)}</li>
  return (
    <div className={styles.offersContainer}>
      {offers.map(offer => {
        const {
          id: offerId,
          text,
          fileName,
          User: { avatar, firstName, lastName, email, id: userId }
        } = offer
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
                {/*      <img
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
                  */}
                <span className={styles.response}>{text}</span>
              </div>
            </div>
            <div className={styles.btnsContainer}>
              <div
                onClick={() =>
                  changeOfferStatus({
                    newStatus: 'pending',
                    offerId
                  })
                }
                className={styles.resolveBtn}
              >
                Resolve
              </div>
              <div
                onClick={() =>
                  changeOfferStatus({
                    newStatus: 'banned',
                    offerId
                  })
                }
                className={styles.rejectBtn}
              >
                BAN
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

const mapStateToProps = state => {
  const { offers } = state
  return { ...offers }
}

const mapDispatchToProps = dispatch => {
  return {
    setOfferStatus: data => dispatch(setModeratorOfferStatus(data)),
    getOffers: data => dispatch(getModeratorOffers(data))
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ModeratorDashboard)
)
