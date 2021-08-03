import React from "react";
import { connect } from "react-redux";
//import { Redirect } from "react-router-dom";
import { Formik, Form } from "formik";
import { authActionRegister, clearAuth } from "../../actions/actionCreator";
import Error from "../Error/Error";
import Input from "../Input";
import RoleInput from "../RoleInput/RoleInput";
import AgreeTermOfServiceInput from "../AgreeTermOfServiceInput/AgreeTermOfServiceInput";
import CONSTANTS from "../../constants";
import Schems from "../../validators/validationSchems";
import styles from "./RegistrationForm.module.sass";
import commonStyles from "../../styles/common.module.scss";

const RegistrationForm = (props) => {
  const onSubmit = (values) => {
    props.register({
      firstName: values.firstName,
      lastName: values.lastName,
      displayName: values.displayName,
      email: values.email,
      password: values.password,
      role: values.role,
    });
  };

  const {
    submitting,
    auth: { error },
    authClear,
  } = props;
 
  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={props.initialValues}
      validationSchema={Schems.RegistrationSchem}
    >
      <div className={styles.signUpFormContainer}>
        {error && (
          <Error
            data={error.data}
            status={error.status}
            clearError={authClear}
          />
        )}
        <div className={styles.headerFormContainer}>
          <h2>CREATE AN ACCOUNT</h2>
          <h4>We always keep your name and email address private.</h4>
        </div>
        <Form className={styles.form}>
          <div className={styles.row}>
            <Input name="firstName" type="text" placeholder="First name" />
            <Input name="lastName" type="text" placeholder="Last name" />
          </div>
          <div className={styles.row}>
            <Input name="displayName" type="text" placeholder="Display Name" />
            <Input name="email" type="email" placeholder="Email Address" />
          </div>
          <div className={styles.row}>
            <Input name="password" type="password" placeholder="Password" />
            <Input
              name="confirmPassword"
              type="password"
              placeholder="Password confirmation"
            />
          </div>
          <div className={styles.choseRoleContainer}>
            <RoleInput
              name="role"
              type="radio"
              value={CONSTANTS.CUSTOMER}
              strRole="Join As a Buyer"
              infoRole="I am looking for a Name, Logo or Tagline for my business, brand or product."
              id={CONSTANTS.CUSTOMER}
            />
            <RoleInput
              name="role"
              type="radio"
              value={CONSTANTS.CREATOR}
              strRole="Join As a Creative"
              infoRole="I plan to submit name ideas, Logo designs or sell names in Domain Marketplace."
              id={CONSTANTS.CREATOR}
            />
            <RoleInput
              name="role"
              type="radio"
              value={CONSTANTS.MODERATOR}
              strRole="Join As a moderator"
              infoRole="I plan to moderate othe ideas."
              id={CONSTANTS.MODERATOR}
            />
          </div>
          <div className={styles.termsOfService}>
             <AgreeTermOfServiceInput
              name="agreeOfTerms"
              classes={{
                container: styles.termsOfService,
                warning: styles.fieldWarning,
              }}
              id="termsOfService"
              type="checkbox"
            /> 
          </div>
          <button
            type="submit"
            disabled={submitting}
            className={styles.submitContainer}
          >
            <span className={styles.inscription}>Create Account</span>
          </button>
        </Form>
      </div>
    </Formik>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    initialValues: {
      role: CONSTANTS.CUSTOMER,
    },
  };
};

const mapDispatchToProps = (dispatch) => ({
  register: (data) => dispatch(authActionRegister(data)),
  authClear: () => dispatch(clearAuth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);
