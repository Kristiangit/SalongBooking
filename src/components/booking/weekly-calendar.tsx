import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface Slot {
  time: string
  available: boolean
}

interface WeeklyCalendarProps {
  week: Date[]
  weekdays: string[]
  availableSlots: Record<string, Slot[]>
  selectedDay: Date | null
  selectedSlot: string | null
  onSelectSlot: (day: Date, slot: Slot) => void
}

function getWeekdayLabel(date: Date, weekdays: string[]) {
  return weekdays[(date.getDay() + 6) % 7]
}

export function WeeklyCalendar({ week, weekdays, availableSlots, selectedDay, selectedSlot, onSelectSlot }: WeeklyCalendarProps) {
  return (
    <Card className="w-fit overflow-hidden">
      <CardHeader className="bg-slate-950/90 p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Calendar view</p>
            <CardTitle>One week at a glance</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-0 pb-6">
        <div>
          <div className="grid grid-cols-[repeat(6,minmax(160px,1fr))] gap-2 border-b border-slate-800/80 px-4 pb-3 text-sm text-slate-400">
            {week.map((day) => (
              <div key={day.toISOString()} className="space-y-2 rounded-3xl border border-slate-800/70 bg-slate-950/80 p-3 text-center">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">{getWeekdayLabel(day, weekdays)}</p>
                <p className="text-sm font-semibold text-white">{new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(day)}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-[repeat(6,minmax(160px,1fr))] gap-2 px-4 pt-4">
            {week.map((day) => {
              const dayKey = day.toDateString()
              return (
                <div key={day.toISOString()} className="space-y-3">
                  {availableSlots[dayKey]?.map((slot) => {
                    const isSelected = selectedSlot === slot.time && selectedDay?.toDateString() === dayKey
                    return (
                      <button
                        key={slot.time}
                        type="button"
                        onClick={() => onSelectSlot(day, slot)}
                        disabled={!slot.available}
                        className={cn(
                          "w-full rounded-3xl border px-3 py-3 text-left text-sm transition",
                          slot.available
                            ? "border-slate-700 bg-slate-900 text-slate-100 hover:border-amber-400/60 hover:bg-slate-900/95"
                            : "cursor-not-allowed border-slate-800 bg-slate-950 text-slate-500 opacity-70",
                          isSelected ? "border-amber-400 bg-amber-400/10 text-amber-100" : ""
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <span>{slot.time}</span>
                          <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.22em]", slot.available ? "bg-emerald-400/10 text-emerald-300" : "bg-slate-800 text-slate-400")}>
                            {slot.available ? "Available" : "Booked"}
                          </span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
