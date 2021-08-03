import React from "react";
import { Field, ErrorMessage, useField } from "formik";
import cx from "classnames";
import styles from "./Input.module.scss";

const Input = (props) => {
  const { name, placeholder, type } = props;
  const [field, meta] = useField(props);
  const inputClassNames = cx(styles.input, {
    [styles.notValid]: meta.touched && meta.error,
    [styles.valid]: meta.touched && !meta.error,
  });
  return (
    <label className={styles.inputContainer}>
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
