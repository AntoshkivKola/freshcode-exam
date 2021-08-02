import React from 'react'
import { parseISO, formatDistanceToNow, format } from 'date-fns'
import styles from './Event.module.scss'

const Event = props => {
  const { event, deleteEvent } = props
  return (
    <tr className={styles.event} key={event.id}>
      <td>
        <span className={styles.eventBody}> {event.body}</span>
      </td>
      <td>
        <span className={styles.eventDeadline}>
          {event.deadline
            ? format(parseISO(event.deadline), "yyyy-MM-dd' 'HH:mm:ss")
            : '-'}
        </span>
      </td>
      <td>
        <span className={styles.eventDeadline}>
        {event.reminderDate? formatDistanceToNow(parseISO(event.reminderDate), {
            includeSeconds: true,
            addSuffix: true
          }): '-'} 
          
        </span>
      </td>
     
      <td className={styles.btnCol}>
        <button
          className={styles.eventDeleteBtn}
          onClick={() => deleteEvent(event.id)}
        >
          X
        </button>
      </td>
    </tr>
  )
}

export default Event
