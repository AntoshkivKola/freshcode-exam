import React from "react";
import { connect } from "react-redux";
import { Formik, Form } from "formik";
import { changePassword, clearAuth } from "../../actions/actionCreator";
import Input from "../Input";
import Schems from "../../validators/validationSchems";
import Error from "../Error/Error";
import styles from "./ChangePasswordForm.module.scss";
import commonStyles from '../../styles/common.module.scss';

const ChangePasswordForm = (props) => {
  const { error, isFetching, checkMail } = props.auth;
  const {  authClear } = props;

  const onSubmit = (values, formikBag) => {
    props.changePasswordRequest(values);
    formikBag.resetForm();
  };

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={{
        email: "",
        password: "",
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

        <Form className={commonStyles.form}>
          <Input name="email" type="email" placeholder="Email Address" />
          <Input name="password" type="password" placeholder="New Password" />

          <button type="submit" className={styles.submitContainer}>
            <span className={styles.inscription}>
              {isFetching ? "Submitting..." : "CHANGE"}
            </span>
          </button>
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
