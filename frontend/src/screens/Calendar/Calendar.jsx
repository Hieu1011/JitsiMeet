import groupBy from 'lodash/groupBy'
import {View, Text, SafeAreaView, Alert} from 'react-native'
import React, {useState} from 'react'
import {
  ExpandableCalendar,
  TimelineEventProps,
  TimelineList,
  CalendarProvider,
  CalendarUtils
} from 'react-native-calendars'
import {images} from '../../../constants'
import {formatTimeString, getDate, timelineEvents} from '../../utils/calendar'
import styles from './calendar.style'
import NewEvent from '../../components/NewEvent'
import { onDisplayNotification } from '../../utils/localNotification'

const INITIAL_TIME = {hour: 9, minutes: 0}
const EVENTS = timelineEvents

const Calendar = () => {
  const [currentDay, setCurrentDay] = useState(getDate())
  // const [events, setEvents] = useState(EVENTS)
  const [eventsByDate, setEventsByDate] = useState(
    groupBy(EVENTS, e => CalendarUtils.getCalendarDateString(e.start))
    // []
  )
  const [timeString, setTimeString] = useState('')
  const [timeObject, setTimeObject] = useState({})

  const [openModal, setOpenModal] = useState(false)

  const uniqueId = () => parseInt(Date.now() * Math.random()).toString()

  const marked = {
    [`${getDate(-1)}`]: {marked: true},
    [`${getDate()}`]: {marked: true},
    [`${getDate(1)}`]: {marked: true},
    [`${getDate(2)}`]: {marked: true},
    [`${getDate(4)}`]: {marked: true}
  }

  const onDateChanged = (date, source) => {
    console.log('TimelineCalendarScreen onDateChanged: ', date, source)
    setCurrentDay(date)
  }

  const onMonthChange = (month, updateSource) => {
    console.log('TimelineCalendarScreen onMonthChange: ', month, updateSource)
  }

  const onOpenModal = (timeString, timeObject) => {
    console.log(timeString, timeObject)
    setTimeString(timeString)
    setTimeObject(timeObject)
    setOpenModal(true)
  }

  const createNewEvent = (title, description, timeString, timeObject) => {
    const hourString = `${(timeObject.hour + 1).toString().padStart(2, '0')}`
    const minutesString = `${timeObject.minutes.toString().padStart(2, '0')}`

    const newEvent = {
      id: uniqueId(),
      start: `${timeString}`,
      end: `${timeObject.date} ${hourString}:${minutesString}:00`,
      title: title || 'New Event',
      summary: description || '',
      color: 'lightgreen'
    }

    if (timeObject.date) {
      if (eventsByDate[timeObject.date]) {
        setEventsByDate(prevEvents => ({
          ...prevEvents,
          [timeObject.date]: [...prevEvents[timeObject.date], newEvent]
        }))
      } else {
        setEventsByDate(prevEvents => ({
          ...prevEvents,
          [timeObject.date]: [newEvent]
        }))
      }
    }
  }

  const checkAndSendNotification = event =>{
    onDisplayNotification(formatTimeString(timeString))
  }

  const onEventPress=(event)=>{
    console.log(event)
    checkAndSendNotification(event)
  }

  const timelineProps = {
    format24h: true,
    onBackgroundLongPress: onOpenModal,
    onEventPress: onEventPress,
    // scrollToFirst: true,
    // start: 0,
    // end: 24,
    unavailableHours: [
      {start: 0, end: 6},
      {start: 22, end: 24}
    ],
    overlapEventsSpacing: 8,
    rightEdgeSpacing: 24
  }

  return (
    <SafeAreaView style={styles.container}>
      <CalendarProvider
        date={currentDay}
        onDateChanged={onDateChanged}
        onMonthChange={onMonthChange}
        showTodayButton
        disabledOpacity={0.6}>
        <ExpandableCalendar
          firstDay={1}
          leftArrowImageSource={images.previous}
          rightArrowImageSource={images.next}
          markedDates={marked}
        />
        <TimelineList
          events={eventsByDate}
          timelineProps={timelineProps}
          showNowIndicator
          scrollToFirst
          initialTime={INITIAL_TIME}
        />
        <NewEvent
          visible={openModal}
          setVisible={setOpenModal}
          timeString={timeString}
          timeObject={timeObject}
          onCreate={createNewEvent}
        />
      </CalendarProvider>
    </SafeAreaView>
  )
}

export default Calendar
