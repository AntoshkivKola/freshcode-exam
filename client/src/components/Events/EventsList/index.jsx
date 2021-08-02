import React from "react";
import { connect } from "react-redux";
import { differenceInSeconds, parseISO } from "date-fns";
import { deleteEvent } from "../../../actions/actionCreator";
import styles from "./EventsList.module.scss";
import Event from "../Event";

const sortEvents = (events) =>
  events.sort((a, b) =>
    differenceInSeconds(parseISO(a.deadline), parseISO(b.deadline))
  );

const EventsList = (props) => {
  const {
    eventsStore: { events },
    deleteEvent,
  } = props;

  const sortedEvents = sortEvents(events);
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
              .filter((event) => event.isEnded)
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
            .filter((event) => !event.isEnded)
            .map((event, index) => (
              <Event key={index} event={event} deleteEvent={deleteEvent} />
            ))}
        </table>
      </div>
    </div>
  );
};

const mapStateToProps = ({ eventsStore }) => ({ eventsStore });

const mapDispatchToProps = (dispatch) => ({
  deleteEvent: (data) => dispatch(deleteEvent(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventsList);
