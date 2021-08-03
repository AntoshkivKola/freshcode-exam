import React, { useState } from "react";
import { connect } from "react-redux";
import { Formik, Form } from "formik";
import { clearUserError, updateUserData } from "../../actions/actionCreator";
import Schems from "../../validators/validationSchems";
import Error from "../../components/Error/Error";
import ImageUpload from "../InputComponents/ImageUpload/ImageUpload";
import Input from "../Input";
import styles from "./UpdateUserInfoForm.module.sass";

const UpdateUserInfoForm = (props) => {
  const [file, setFile] = useState(null);
  const { error, clearUserError } = props;

  const updateUserData = (values) => {
    console.log("HERE!");
    console.log(values);
    const formData = new FormData();
    formData.append("file", values.file);
    formData.append("firstName", values.firstName);
    formData.append("lastName", values.lastName);
    formData.append("displayName", values.displayName);
    props.updateUser(formData);
  };

  return (
    <Formik
      onSubmit={updateUserData}
      initialValues={{
        firstName: "",
        lastName: "",
        displayName: "",
        file: "",
      }}
      validationSchema={Schems.UpdateUserSchema}
    >
      <Form className={styles.updateContainer}>
        {error && (
          <Error
            data={error.data}
            status={error.status}
            clearError={clearUserError}
          />
        )}
        <div className={styles.container}>
          <span className={styles.label}>First Name</span>
          <Input
            name="firstName"
            type="text"
            placeholder="First Name"
            classes={{
              container: styles.inputContainer,
              input: styles.input,
              warning: styles.error,
              notValid: styles.notValid,
            }}
          />
        </div>
        <div className={styles.container}>
          <span className={styles.label}>Last Name</span>
          <Input
            name="lastName"
            type="text"
            placeholder="LastName"
            classes={{
              container: styles.inputContainer,
              input: styles.input,
              warning: styles.error,
              notValid: styles.notValid,
            }}
          />
        </div>
        <div className={styles.container}>
          <span className={styles.label}>Display Name</span>
          <Input
            name="displayName"
            type="text"
            placeholder="Display Name"
            classes={{
              container: styles.inputContainer,
              input: styles.input,
              warning: styles.error,
              notValid: styles.notValid,
            }}
          />
        </div>
        <ImageUpload
          name="file"
          classes={{
            uploadContainer: styles.imageUploadContainer,
            inputContainer: styles.uploadInputContainer,
            imgStyle: styles.imgStyle,
          }}
          setFile={setFile}
        />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

const mapStateToProps = (state) => {
  const {
    user: { firstName, lastName, displayName },
    error,
  } = state.auth;
  return {
    error,
    initialValues: {
      firstName,
      lastName,
      displayName,
    },
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearUserError: () => dispatch(clearUserError()),
    updateUser: (data) => dispatch(updateUserData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUserInfoForm);
