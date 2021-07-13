import React from 'react'
import { connect } from 'react-redux'
import { changePassword, clearAuth } from '../../actions/actionCreator'
import { Redirect } from 'react-router-dom'
import styles from './ChangePasswordForm.module.scss'
import { Field, reduxForm } from 'redux-form'
import FormInput from '../FormInput/FormInput'
import customValidator from '../../validators/validator'
import Schems from '../../validators/validationSchems'
import Error from '../Error/Error'

class ChangePasswordForm extends React.Component {
  componentWillUnmount () {
    this.props.authClear()
  }

  clicked = values => {
    this.props.changePasswordRequest(values)
  }
 
  render () {
    const { error, isFetching,checkMail } = this.props.auth
    const { handleSubmit, submitting, authClear } = this.props

    const formInputClasses = {
      container: styles.inputContainer,
      input: styles.input,
      warning: styles.fieldWarning,
      notValid: styles.notValid,
      valid: styles.valid
    }

    return (
      <div className={styles.loginForm}>
        {error && (
          <Error
            data={error.data}
            status={error.status}
            clearError={authClear}
          />
        )}
        <h2>CHANGE YOUR PASSWORD</h2>
        <form onSubmit={handleSubmit(this.clicked)}>
          <Field
            name='email'
            classes={formInputClasses}
            component={FormInput}
            type='text'
            label='Email Address'
          />
          <Field
            name='password'
            classes={formInputClasses}
            component={FormInput}
            type='password'
            label='New Password'
          />
          <button
            type='submit'
            disabled={submitting}
            className={styles.submitContainer}
          >
            <span className={styles.inscription}>
              {isFetching ? 'Submitting...' : 'CHANGE'}
            </span>
          </button>
        </form>
        {checkMail && <span>chealk your email to confirm new password</span>}
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { auth } = state
  return { auth }
}

const mapDispatchToProps = dispatch => ({
  changePasswordRequest: data => dispatch(changePassword(data)),
  authClear: () => dispatch(clearAuth())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: 'changePassword',
    validate: customValidator(Schems.LoginSchem)
  })(ChangePasswordForm)
)
