import React from 'react'
import { Field, ErrorMessage } from 'formik'
import styles from './Input.module.scss'

const Input = props => {
  const { name, placeholder,type } = props
  return (
    <label className={styles.inputContainer}>
      <Field name={name} placeholder={placeholder} className={styles.input} type={type}/>
      <ErrorMessage
        className={styles.errorMessage}
        name={name}
        component='span'
      />
    </label>
  )
}

export default Input
