import React from "react";
import { connect } from "react-redux";
import { changePassword, clearAuth } from "../../actions/actionCreator";
import styles from "./ChangePasswordForm.module.scss";
import { Formik, Form,Field } from "formik";
import Input from "../Input";
import FormInput from "../FormInput/FormInput";
import customValidator from "../../validators/validator";
import Schems from "../../validators/validationSchems";
import Error from "../Error/Error";

const ChangePasswordForm = (props) => {
  const clicked = (values) => {
    console.log('handle sabmit')
    //props.changePasswordRequest(values);
  };

  const { error, isFetching, checkMail } = props.auth;
  const { handleSubmit, submitting, authClear } = props;
  const formInputClasses = {
    container: styles.inputContainer,
    input: styles.input,
    warning: styles.fieldWarning,
    notValid: styles.notValid,
    valid: styles.valid,
  };

  const onSubmit = (values, formikBag) => {
    console.log("HERE");
    console.log("values", values);
  };

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={{
        email: "",
        password:'',
      }}
      validationSchema={Schems.LoginSchem}
    >
      <div className={styles.loginForm}>
        {error && (
          <Error
            data={error.data}
            status={error.status}
            clearError={authClear}
          />
        )}
        <h2>CHANGE YOUR PASSWORD</h2>

        <Form onSubmit={handleSubmit(clicked)} className={styles.form}>
          <Input name="email" type="text" placeholder="Email Address" />
          
          <Field
            className={styles.input}
            name='password'
            placeholder='test'
          />
          <button
            className={styles.submitContainer}
            type="submit"
          >
            submit
          </button>
          {/* <button type="submit" className={styles.submitContainer}>
            <span className={styles.inscription}>
              {isFetching ? "test///" : "test"}
            </span>
          </button> */}
        </Form>

        {checkMail && (
          <span className={styles.msg}>
            Chealk your email to confirm new password
          </span>
        )}
      </div>
    </Formik>
  );
};

const mapStateToProps = (state) => {
  const { auth } = state;
  return { auth };
};

const mapDispatchToProps = (dispatch) => ({
  changePasswordRequest: (data) => dispatch(changePassword(data)),
  authClear: () => dispatch(clearAuth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordForm);

{
  /* <form onSubmit={handleSubmit(clicked)}>
        <Field
          name="email"
          classes={formInputClasses}
          component={FormInput}
          type="text"
          label="Email Address"
        />
        <Field
          name="password"
          classes={formInputClasses}
          component={FormInput}
          type="password"
          label="New Password"
        />
        <button
          type="submit"
          disabled={submitting}
          className={styles.submitContainer}
        >
          <span className={styles.inscription}>
            {isFetching ? "Submitting..." : "CHANGE"}
          </span>
        </button>
      </form> */
}
{
  /* //////////////////////////////////// */
}
