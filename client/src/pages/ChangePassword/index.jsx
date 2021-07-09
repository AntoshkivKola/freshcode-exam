import React from 'react'
import ChangePasswordForm from '../../components/ChangePasswordForm'
import Logo from '../../components/Logo'
import styles from '../LoginPage/LoginPage.module.sass'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  clearErrorSignUpAndLogin,
  updateUserPassword
} from '../../actions/actionCreator'

import CONSTANTS from '../../constants'

const ChangePassword = props => {
  const { updatePassword } = props
  const haveMessage = window.location.search.includes('pt=')
  if (haveMessage) {
    const passwordToken = window.location.search.split('=')[1]
    console.log(passwordToken)
    updatePassword({ passwordToken })
  }

  const changeRoute = () => {
    props.history.replace('/')
  }
  return (
    <div className={styles.mainContainer}>
      <div className={styles.loginContainer}>
        <div className={styles.headerSignUpPage}>
          <Logo src={`${CONSTANTS.STATIC_IMAGES_PATH}logo.png`} alt='logo' />
          <div className={styles.linkLoginContainer}>
            <Link to='/registration' style={{ textDecoration: 'none' }}>
              <span>Signup</span>
            </Link>
          </div>
        </div>
        <div className={styles.loginFormContainer}>
          {haveMessage && (
            <span>
              
              Click
              <Link to='/login' style={{ textDecoration: 'none' }}>
                <span> here </span>
              </Link>
              to login
            </span>
          )}
          <ChangePasswordForm changeRoute={changeRoute} />
        </div>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    clearError: () => dispatch(clearErrorSignUpAndLogin()),
    updatePassword: data => dispatch(updateUserPassword(data))
  }
}

export default connect(null, mapDispatchToProps)(ChangePassword)
