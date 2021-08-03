import React from "react";
import { Field, ErrorMessage } from "formik";
import styles from "./Input.module.scss";

const Input = (props) => {
  const { name, placeholder, type } = props;
  return (
    <label className={styles.inputContainer}>
      <Field
        className={styles.input}
        name={name}
        placeholder={placeholder}
        type={type}
      />
      <ErrorMessage
        className={styles.errorMessage}
        name={name}
        component="span"
      />
    </label>
  );
};

export default Input;
