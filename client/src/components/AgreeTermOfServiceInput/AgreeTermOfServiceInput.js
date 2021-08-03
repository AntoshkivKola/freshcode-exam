import React from "react";
import { useField } from "formik";

const AgreeTermOfServiceInput = (props) => {
  const {
    label,
    id,
    type,
    classes,
  
  } = props;
  const [field,  { touched, error }] = useField(props);
  return (
    <div>
      <div className={classes.container}>
        <input {...field} placeholder={label} id={id} type={type} />
        <label htmlFor={id}>
          By clicking this checkbox, you agree to our{" "}
          <a href="https://www.google.com" target={"_blank"}>
            Terms of Service.
          </a>
        </label>
      </div>
      {touched && error && <span className={classes.warning}>{error}</span>}
    </div>
  );
};

export default AgreeTermOfServiceInput;
