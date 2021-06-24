import React from 'react'
import { useStore, useDispatch } from 'react-redux'
import { differenceInSeconds, parseISO } from 'date-fns'
import * as ActionCreator from '../../../actions/actionCreator'
import styles from './EventsList.module.scss'
import { useTimer } from '../../../hooks'
import Event from '../Event'

const sortEvents = events =>
  events.sort((a, b) =>
    differenceInSeconds(parseISO(a.deadline), parseISO(b.deadline))
  )

const EventsList = props => {
  const {
    eventsStore: { events }
  } = useStore().getState()

  const dispatch = useDispatch()

  const deleteEvent = event => dispatch(ActionCreator.deleteEvent(event))

  useTimer(events)
  const sortedEvents = sortEvents(events)

  return (
    <div>
      <h3 className={styles.eventTableTitle}>Ended events </h3>
      <div>
        <table className={styles.eventTable}>
          <tbody className={styles.eventTableBody}>
            <tr className={styles.eventTableHead}>
              <th>event</th>
              <th>deadline</th>
              <th>remining</th>
              <th>delete event </th>
            </tr>
            {sortedEvents
              .filter(event => event.isEnded)
              .map((event, index) => (
                <Event key={index} event={event} deleteEvent={deleteEvent} />
              ))}
          </tbody>
        </table>
      </div>
      <div>
        <h3 className={styles.eventTableTitle}>Events </h3>
        <table className={styles.eventTable}>
          <tr className={styles.eventTableHead}>
            <th>event</th>
            <th>deadline</th>
            <th>remining</th>
            <th>delete event </th>
          </tr>
          {sortedEvents
            .filter(event => !event.isEnded)
            .map((event, index) => (
              <Event key={index} event={event} deleteEvent={deleteEvent} />
            ))}
        </table>
      </div>
    </div>
  )
}

export default EventsList
