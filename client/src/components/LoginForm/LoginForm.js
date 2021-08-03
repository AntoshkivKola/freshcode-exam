import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import Schems from "../../validators/validationSchems";
import { authActionLogin, clearAuth } from "../../actions/actionCreator";
import Error from "../../components/Error/Error";
import Input from "../Input";
import styles from "./LoginForm.module.sass";
import commonStyles from '../../styles/common.module.scss';

const LoginForm = (props) => {
  const { error, isFetching } = props.auth;
  const { submitting, authClear } = props;

  const onSubmit = (values, formikBag) => {
    props.loginRequest(values);
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
        <h2>LOGIN TO YOUR ACCOUNT</h2>
        <Form className={commonStyles.form}>
          <Input name="email" type="email" placeholder="Email Address" />
          <Input name="password" type="password" placeholder="Password" />

          <button
            type="submit"
            disabled={submitting}
            className={styles.submitContainer}
          >
            <span className={styles.inscription}>
              {isFetching ? "Submitting..." : "LOGIN"}
            </span>
          </button>
          <div className={styles.linkWrapper}>
            <Link
              to="/changePassword"
              style={{ textDecoration: "none" }}
              className={styles.forgotPasswordLink}
            >
              <span>Forgot Password</span>
            </Link>
          </div>
        </Form>
      </div>
    </Formik>
  );
};

const mapStateToProps = (state) => {
  const { auth } = state;
  return { auth };
};

const mapDispatchToProps = (dispatch) => ({
  loginRequest: (data) => dispatch(authActionLogin(data)),
  authClear: () => dispatch(clearAuth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
