"use client"

import { useMemo, useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookingHeader } from "@/components/booking/booking-header"
import { WeeklyCalendar } from "@/components/booking/weekly-calendar"
import { AppointmentPanel } from "@/components/booking/appointment-panel"

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const timeSlots = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30"]

const services = [
  { id: "classic", label: "Classic Cut", duration: "30 min", price: "$35" },
  { id: "fade", label: "Signature Fade", duration: "45 min", price: "$50" },
  { id: "beard", label: "Beard Trim", duration: "20 min", price: "$20" },
]

function getWeekStart(date: Date) {
  const result = new Date(date)
  const day = result.getDay()
  const diff = day === 0 ? -6 : 1 - day

  result.setDate(result.getDate() + diff)
  result.setHours(0, 0, 0, 0)
  
  return result
}

function formatShortDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(date)
}

function formatWeekLabel(start: Date) {
  const end = new Date(start)
  end.setDate(end.getDate() + 5)

  const startLabel = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(start)
  const endLabel = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(end)

  return `${startLabel} – ${endLabel}`
}

function buildWeek(start: Date) {
  return Array.from({ length: 6 }).map((_, index) => {
    const day = new Date(start)
    day.setDate(day.getDate() + index)
    return day
  })
}

const bookingServices = services

type Service = (typeof services)[number]

type Slot = { time: string; available: boolean }

export default function BookingPage() {
  const [weekStart, setWeekStart] = useState(() => getWeekStart(new Date()))
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [selectedDay, setSelectedDay] = useState<Date | null>(null)
  const [selectedService, setSelectedService] = useState<Service["id"]>(services[0].id)

  const week = useMemo(() => buildWeek(weekStart), [weekStart])
  const selectedServiceMeta = services.find((service) => service.id === selectedService) ?? services[0]

  const handlePreviousWeek = () => {
    const previous = new Date(weekStart)
    previous.setDate(previous.getDate() - 7)
    setWeekStart(getWeekStart(previous))
    setSelectedSlot(null)
    setSelectedDay(null)
  }

  const handleNextWeek = () => {
    const next = new Date(weekStart)
    next.setDate(next.getDate() + 7)
    setWeekStart(getWeekStart(next))
    setSelectedSlot(null)
    setSelectedDay(null)
  }

  const availableSlots = useMemo(() => {
    return week.reduce((acc, date) => {
      const dayKey = date.toDateString()
      acc[dayKey] = timeSlots.map((slot) => ({
        time: slot,
        available: Math.random() > 0.25,
      }))
      return acc
    }, {} as Record<string, Slot[]>)
  }, [week])

  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-10 sm:px-10 lg:px-14">
      <div className="mx-auto flex max-w-7xl flex-col gap-10">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <Badge>Book a cut</Badge>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                Weekly barber booking calendar
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-8 text-muted sm:text-lg">
                Choose a day, pick a time slot, and reserve your style for the week ahead. This view shows a six-day window at once.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={handlePreviousWeek}>
                Previous week
              </Button>
              <Button variant="default" onClick={handleNextWeek}>
                Next week
              </Button>
            </div>
          </div>

          <BookingHeader
            weekLabel={formatWeekLabel(weekStart)}
            selectedDay={selectedDay}
            selectedSlot={selectedSlot}
            formatShortDate={formatShortDate}
            weekdays={weekdays}
          />
        </div>

        <section className="grid gap-10 lg:grid-cols-[1.6fr_0.9fr]">
          <WeeklyCalendar
            week={week}
            weekdays={weekdays}
            availableSlots={availableSlots}
            selectedSlot={selectedSlot}
            selectedDay={selectedDay}
            onSelectSlot={(day, slot) => {
              if (!slot.available) return
              setSelectedSlot(slot.time)
              setSelectedDay(day)
            }}
          />

          {/* <AppointmentPanel
            selectedDay={selectedDay}
            selectedSlot={selectedSlot}
            selectedServiceMeta={selectedServiceMeta}
            services={services}
            selectedService={selectedService}
            onSelectService={setSelectedService}
          /> */}
        </section>
      </div>
    </main>
  )
}
