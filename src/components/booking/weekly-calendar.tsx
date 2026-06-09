import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ArrowLeft, ArrowRight } from "lucide-react"

interface Slot {
  time: string
  available: boolean
}

interface WeeklyCalendarProps {
  week: Date[]
  weekdays: string[]
  weekLabel: string
  selectedDay: Date | null
  selectedSlot: string | null
  availableSlots: Record<string, Slot[]>
  onSelectSlot: (day: Date, slot: Slot) => void
  onPreviousWeek: () => void
  onNextWeek: () => void
  onToday: () => void
}

function getWeekdayLabel(date: Date, weekdays: string[]) {
  return weekdays[(date.getDay() + 6) % 7]
}

export function WeeklyCalendar({
  week,
  weekdays,
  weekLabel,
  selectedDay,
  selectedSlot,
  availableSlots,
  onSelectSlot,
  onPreviousWeek,
  onNextWeek,
  onToday,
}: WeeklyCalendarProps) {
  return (
    <Card className="w-fit overflow-hidden">
      <CardHeader className="bg-card/90 p-6">
        <div className="flex flex-col gap-4 sm:items-center sm:justify-between sm:flex-row">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-secondary-foreground">Calendar view</p>
          </div>
        <CardTitle className="mt-2 text-foreground">{weekLabel}</CardTitle>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onPreviousWeek}
              className="rounded-full border border-muted-foreground bg-accent-foreground px-4 py-2 text-sm text-popover transition hover:border-primary/70 hover:bg-accent-foreground/95"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={onToday}
              className="rounded-full border border-muted-foreground bg-accent-foreground px-4 py-2 text-sm text-popover transition hover:border-primary/70 hover:bg-accent-foreground/95"
            >
              I dag
            </button>
            <button
              type="button"
              onClick={onNextWeek}
              className="rounded-full border border-muted-foreground bg-accent-foreground px-4 py-2 text-sm text-popover transition hover:border-primary/70 hover:bg-accent-foreground/95"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

      </CardHeader>
      <CardContent className="px-0 pb-6">
        <div>
          <div className="grid grid-cols-[repeat(6,minmax(160px,1fr))] gap-2 border-b border-slate-800 px-4 py-3 text-sm text-accent-foreground">
            {week.map((day) => (
              <div key={day.toISOString()} className="space-y-2 rounded-3xl border border-slate-800/70 bg-accent p-3 text-center">
                <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">{getWeekdayLabel(day, weekdays)}</p>
                <p className="text-sm font-semibold text-foreground">{new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(day)}</p>
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
                            ? "border-slate-700 bg-card text-foreground hover:border-primary/60"
                            : "cursor-not-allowed border-slate-800 bg-muted text-foreground opacity-70",
                          isSelected ? "border-primary bg-primary/50" : ""
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <span>{slot.time}</span>
                          <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.22em]", slot.available ? "bg-emerald-400/20 text-emerald-600" : "bg-slate-800 text-slate-400")}>
                            {slot.available ? "Ledig" : "Opptatt"}
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
