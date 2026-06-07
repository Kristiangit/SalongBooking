interface BookingHeaderProps {
  weekLabel: string
  selectedDay: Date | null
  selectedSlot: string | null
  formatShortDate: (date: Date) => string
  weekdays: string[]
}

export function BookingHeader({ weekLabel, selectedDay, selectedSlot, formatShortDate, weekdays }: BookingHeaderProps) {
  const displayDay = selectedDay ? weekdays[(selectedDay.getDay() + 6) % 7] : "Sun"
  return (
    <div className="mt-8 rounded-3xl border border-slate-800/70 bg-slate-900/80 p-5 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Selected week</p>
          <p className="mt-2 text-lg font-semibold text-white">{weekLabel}</p>
        </div>
        <div className="rounded-3xl bg-slate-950/80 px-4 py-3 text-sm text-slate-300">
          {selectedDay ? `${displayDay}, ${formatShortDate(selectedDay)} @ ${selectedSlot ?? "no slot"}` : "No slot selected"}
        </div>
      </div>
    </div>
  )
}
