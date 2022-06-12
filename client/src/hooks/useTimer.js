import { useEffect, useState } from 'react';
import { useStore } from 'react-redux';
import { differenceInSeconds, parseISO, addSeconds } from 'date-fns';

function useTimer() {
  const {
    eventsStore: { events },
  } = useStore().getState();

  const eventsCopy = events;
  // LOGIC timer
  const [time, setTime] = useState(new Date(2021, 0, 1, 0, 0, 0));
  useEffect(() => {
    const timeoutId = setTimeout(() => setTime(addSeconds(time, 5)), 5000);
    eventsCopy.forEach((event) => {
      if (
        !event.isReminded
        && event.reminderDate
        && differenceInSeconds(parseISO(event.reminderDate), new Date()) <= 0
      ) {
        event.isReminded = true;
        localStorage.setItem('events', JSON.stringify(eventsCopy));
      }
      if (
        !event.isEnded
        && differenceInSeconds(parseISO(event.deadline), new Date()) <= 0
      ) {
        event.isEnded = true;
        localStorage.setItem('events', JSON.stringify(eventsCopy));
      }
    });

    return () => {
      clearTimeout(timeoutId);
    };
  }, [time, eventsCopy]);
}
export default useTimer;
