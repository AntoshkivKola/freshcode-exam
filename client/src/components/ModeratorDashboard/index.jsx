import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import { connect } from 'react-redux'
import _ from 'lodash'
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
    getOffers({ limit: 5, offset: 0 })
  }, [])

  const changeOfferStatus = ({
    offerId,
    newStatus,
    reasonOfBan,
    customerId,
    email,
    text
  }) => {
    confirmAlert({
      title: 'confirm',
      message: 'Are u sure?',
      buttons: [
        {
          label: 'Yes',
          onClick: () =>
            setOfferStatus({
              offerId,
              newStatus,
              reasonOfBan,
              customerId,
              email,
              text
            })
        },
        {
          label: 'No'
        }
      ]
    })
  }
  const loadMore = () => getOffers({ limit: 5, offset: offers.length })
  return (
    <div className={styles.offersContainer}>
      {_.uniqBy(offers, (offer) => offer.id)
          .map(offer => (
        <ModeratorOfferBox
          key={offer.id}
          changeOfferStatus={changeOfferStatus}
          offer={offer}
        />
      ))}
      <button onClick={loadMore} className={styles.loadMore}>
        Load more offers
      </button>
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
