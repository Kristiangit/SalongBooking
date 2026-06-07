import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface Service {
  id: string
  label: string
  duration: string
  price: string
}

interface AppointmentPanelProps {
  selectedDay: Date | null
  selectedSlot: string | null
  selectedServiceMeta: Service
  services: Service[]
  selectedService: string
  onSelectService: (serviceId: string) => void
}

export function AppointmentPanel({
  selectedDay,
  selectedSlot,
  selectedServiceMeta,
  services,
  selectedService,
  onSelectService,
}: AppointmentPanelProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Appointment details</CardTitle>
          <CardDescription>Pick a service and confirm the slot once you see a time you like.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4 rounded-3xl border border-slate-800/70 bg-slate-950/80 p-4">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Selected slot</p>
            <p className="text-lg font-semibold text-white">{selectedDay ? selectedDay.toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "Select a day"}</p>
            <p className="text-sm text-slate-300">{selectedSlot ?? "Tap any available time to reserve it"}</p>
          </div>

          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Choose service</p>
            <div className="grid gap-3">
              {services.map((service) => {
                const active = selectedService === service.id
                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => onSelectService(service.id)}
                    className={cn(
                      "rounded-3xl border px-4 py-4 text-left transition",
                      active
                        ? "border-amber-400 bg-amber-400/10 text-white"
                        : "border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-600 hover:bg-slate-900"
                    )}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="font-semibold text-white">{service.label}</p>
                        <p className="mt-1 text-sm text-slate-400">{service.duration}</p>
                      </div>
                      <span className="text-sm font-semibold text-slate-100">{service.price}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="space-y-3 rounded-3xl border border-slate-800/70 bg-slate-950/80 p-5">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Summary</p>
            <div className="space-y-2 text-sm text-slate-300">
              <p>
                Service: <span className="text-slate-100">{selectedServiceMeta.label}</span>
              </p>
              <p>
                Date: <span className="text-slate-100">{selectedDay ? selectedDay.toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "Not selected"}</span>
              </p>
              <p>
                Time: <span className="text-slate-100">{selectedSlot ?? "Not selected"}</span>
              </p>
            </div>
          </div>

          <Button className="w-full" disabled={!selectedSlot || !selectedDay}>
            Confirm appointment
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How it works</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm leading-7 text-slate-400">
          <p>Browse the displayed week and choose a time slot that fits your schedule. Bookings are refreshed every week so you can always see the next available window.</p>
          <ul className="list-disc space-y-2 pl-5 text-slate-500">
            <li>Available slots are shown in green</li>
            <li>Booked times are disabled</li>
            <li>Confirm the appointment after selecting a service</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
