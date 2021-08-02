import { useEffect } from 'react';
import { useStore, useDispatch } from 'react-redux';
import * as ActionCreator from '../actions/actionCreator';

function useGetEvents() {
  const {
    eventsStore: { events },
  } = useStore().getState();

  const dispatch = useDispatch();

  const getEvents = (events) => dispatch(ActionCreator.getEvents(events));

  // LOGIC get oldEvents
  useEffect(() => {
    const oldEvents = JSON.parse(localStorage.getItem('events'));
    console.log('oldEvents',oldEvents)
    if (oldEvents) {
      getEvents(oldEvents);
    }
  }, []);
}
export default useGetEvents;
