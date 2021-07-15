import { useEffect } from 'react';
import { useStore, useDispatch } from 'react-redux';
import * as ActionCreator from '../actions/actionCreator';

function useEvents() {
  const {
    eventsStore: { events },
  } = useStore().getState();

  const dispatch = useDispatch();

  const getEvents = (event) => dispatch(ActionCreator.getEvents(event));

  // LOGIC get oldEvents
  useEffect(() => {
    const oldEvents = JSON.parse(localStorage.getItem('events'));
    if (oldEvents) {
      getEvents(oldEvents);
    }
  }, []);
  // LOGIC update events in localStorage
  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);
}
export default useEvents;
