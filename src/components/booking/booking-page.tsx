"use client"

import { useMemo, useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { WeeklyCalendar } from "@/components/booking/weekly-calendar"
import { AppointmentPanel } from "@/components/booking/appointment-panel"

const weekdays = ["Man", "Tir", "Ons", "Tor", "Fre", "Lør"]
const timeSlots = ["09:00",  "10:00",  "11:00",  "12:00",  "13:00",  "14:00",  "15:00",]

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
  end.setDate(end.getDate() + 6)

  const startLabel = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(start)
  const endLabel = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(end)

  return `${startLabel} – ${endLabel}`
}

function buildWeek(start: Date) {
  return Array.from({ length: weekdays.length }).map((_, index) => {
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
  const handleToday = () => {
    const today = new Date()
    setWeekStart(getWeekStart(today))
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
      <div className="flex flex-col gap-10">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <Badge variant="title">Book a cut</Badge>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                Weekly barber booking calendar
              </h1>
            </div>
          </div>

        </div>

        <section className="flex flex-col gap-10">
          <WeeklyCalendar
            week={week}
            weekdays={weekdays}
            weekLabel={formatWeekLabel(weekStart)}
            availableSlots={availableSlots}
            selectedSlot={selectedSlot}
            selectedDay={selectedDay}
            onSelectSlot={(day, slot) => {
              if (!slot.available) return
              setSelectedSlot(slot.time)
              setSelectedDay(day)
            }}
            onPreviousWeek={handlePreviousWeek}
            onNextWeek={handleNextWeek}
            onToday={handleToday}
          />

          <AppointmentPanel
            selectedDay={selectedDay}
            selectedSlot={selectedSlot}
            selectedServiceMeta={selectedServiceMeta}
            services={services}
            selectedService={selectedService}
            onSelectService={setSelectedService}
          />
        </section>
      </div>
    </main>
  )
}
