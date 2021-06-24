import  CONSTANTS from '../constants'
import { subMinutes, parseISO } from 'date-fns'

export const  getReminderDate = event => {
  const minutes = CONSTANTS.REMINDERS.find(rem => rem.value === event.reminder)?.minutes
  if (minutes === undefined) {
    return false
  }
  return JSON.parse(
    JSON.stringify(subMinutes(parseISO(event.deadline), minutes))
  )
}

export const prepareEvent = (event, lastId) => {
  const eventOptions = { id: lastId }
  if (localStorage.getItem('lastId')) {
    eventOptions.id = JSON.parse(localStorage.getItem('lastId')) + 1
  }
  localStorage.setItem('lastId', JSON.stringify(eventOptions.id))
  eventOptions.reminderDate = getReminderDate(event)
  eventOptions.isReminded = false
  eventOptions.isEnde = false
  return { ...event, ...eventOptions }
}