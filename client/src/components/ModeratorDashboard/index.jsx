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
import ModeratorOfferBox from '../ModeratorOfferBox'
const ModeratorDashboard = props => {
  const { getOffers, offers, setOfferStatus } = props
  useEffect(() => {
    getOffers()
  }, [])

  const changeOfferStatus = ({ offerId, newStatus, reasonOfBan }) => {
    confirmAlert({
      title: 'confirm',
      message: 'Are u sure?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => setOfferStatus({ offerId, newStatus,reasonOfBan })
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
      {offers.map(offer => (
        <ModeratorOfferBox
          key={offer.id}
          changeOfferStatus={changeOfferStatus}
          offer={offer}
        />
      ))}
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
