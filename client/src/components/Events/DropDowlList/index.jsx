import React from 'react'
import { Field, ErrorMessage } from 'formik'
import styles from '../Input/Input.module.scss'

const DropDowlList = props => {
  const { name, list, listItems } = props
  return (
    <label className={styles.inputContainer}>
      <Field className={styles.input} type='text' name={name} list={list} />
      <datalist id={list}>
        {listItems.map((item, index) => (
          <option value={item.value} key={index}></option>
        ))}
      </datalist>
      <ErrorMessage
        className={styles.errorMessage}
        name={name}
        component='span'
      />
    </label>
  )
}

export default DropDowlList
