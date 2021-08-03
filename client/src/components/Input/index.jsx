import React from "react";
import { Field, ErrorMessage, useField } from "formik";
import cx from "classnames";
import styles from "./Input.module.scss";

const Input = (props) => {
  const {
    name,
    placeholder,
    type,
    classes = {
      container: styles.inputContainer,
      input: styles.input,
      notValid: styles.notValid,
      valid: styles.valid
    },
  } = props;
  const [field, meta] = useField(props);
  const inputClassNames = cx(classes.input, {
    [classes.notValid]: meta.touched && meta.error,
    [classes.valid]: meta.touched && !meta.error,
  });
  return (
    <label className={classes.container}>
      <input
        type={type}
        {...field}
        className={inputClassNames}
        placeholder={placeholder}
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
