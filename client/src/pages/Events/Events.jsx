import React from 'react'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import EventsForm from '../../components/Events/EventsForm'
import EventsList from '../../components/Events/EventsList'
import styles from './Events.module.scss'

const Events = () => {
  return (
    <div>
      <Header />
      <div className={styles.events}>
        <div className={styles.container}>
          <EventsForm />
          <EventsList />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Events
