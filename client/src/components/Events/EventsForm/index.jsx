import React from 'react'
import { Formik, Form } from 'formik'
import { useStore, useDispatch } from 'react-redux'
import { CreateEventSchema } from '../../../validators/validationSchems'
import * as ActionCreator from '../../../actions/actionCreator'
import Input from '../Input'
import styles from './EventsForm.module.scss'
import DropDowlList from '../DropDowlList'
import CONSTANTS from '../../../constants'
import { prepareEvent } from '../../../helpers/eventHelpers'

const EventsForm = props => {
  const {
    eventsStore: { lastId, events }
  } = useStore().getState()

  const dispatch = useDispatch()

  const createEvent = event => dispatch(ActionCreator.createEvent(event))

  const onSubmit = (newEvent, formikBag) => {
    const preparedEvent = prepareEvent(newEvent, lastId)
    localStorage.setItem('events', JSON.stringify([...events, preparedEvent]))
    createEvent(preparedEvent)
    formikBag.resetForm()
  }

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={{
        body: '',
        deadline: '',
        reminder: ''
      }}
      validationSchema={CreateEventSchema}
    >
      <Form className={styles.form}>
        <h2 className={styles.title}> Create new event</h2>
        <Input name='body' placeholder='Enter new event' />

        <span className={styles.subTitle}>Set deadline:</span>
        <Input name='deadline' type='datetime-local' />

        <span className={styles.subTitle}>Reminder: </span>
        <DropDowlList
          name='reminder'
          list='reminders'
          listItems={CONSTANTS.REMINDERS}
        />

        <button className={styles.submitBtn} type='submit'>
          Create Event
        </button>
      </Form>
    </Formik>
  )
}

export default EventsForm
