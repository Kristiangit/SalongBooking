"use client"
import { format, parse, startOfWeek, getDay, } from 'date-fns'
import { enUS, nb } from 'date-fns/locale'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Calendar, dateFnsLocalizer } from "react-big-calendar";


const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: {
    'nb-NO': nb,
    'en-US': enUS,
  },
})

export default function BigCalendar() {
  return (
    <Calendar
      localizer={localizer}
      events={[]}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
      defaultView="week"
      views={['day', 'week', 'month']} // Show only week and day views
      min={new Date(2024, 0, 1, 7, 0)} // Set the minimum time to 7:00 AM
      max={new Date(2024, 0, 1, 20, 0)} // Set the maximum time to 8:00 PM
      scrollToTime={new Date(2024, 0, 1, 9, 0)} // Scroll to 9:00 AM on load
    />
  );
}
