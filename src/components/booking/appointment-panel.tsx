import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Field, FieldGroup, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import { useState } from "react"

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
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [notes, setNotes] = useState("");

  function onConfirm() {
    if (!selectedDay || !selectedSlot) return

    alert(`Confirmed appointment for ${selectedServiceMeta.label} on ${selectedDay.toLocaleDateString("en-US", { month: "short", day: "numeric" })} at ${selectedSlot}`)
  }

  return (
    <div className="">
      <Card className="lg:w-2/3 w-full p-4">
        <CardHeader>
          <CardTitle>Detaljer</CardTitle>
        </CardHeader>
        <CardContent className="">
            <FieldGroup>
              <div className="flex flex-col justify-around space-y-4">
                  <div className="grid grid-cols-2 gap-6">
                    <Field>
                      <FieldLabel htmlFor="text">Navn<span className="text-destructive">*</span></FieldLabel>
                      <Input id="text" type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="email">E-post<span className="text-destructive">*</span></FieldLabel>
                      <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="tel">Telefonnummer<span className="text-destructive">*</span></FieldLabel>
                      <Input id="tel" type="tel" value={number} onChange={(e) => setNumber(e.target.value)} required/>
                    </Field>
                  
                    <Field>
                      <FieldLabel htmlFor="comm">Kommentarer?</FieldLabel>
                      <Input id="comm" type="text" value={notes} onChange={(e) => setNotes(e.target.value)}/>
                    </Field>
                  </div>

                  <div className="space-y-3 rounded-3xl border border-slate-800/70 bg-background p-5">
                      <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Summary</p>
                      <div className="space-y-4 text-sm text-muted-foreground">
                          <p>
                              Service: <span className="text-foreground">Vanlig klipp</span>
                          </p>
                          <p>
                              Date: <span className="text-foreground">{selectedDay ? selectedDay.toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "Not selected"}</span>
                          </p>
                          <p>
                              Time: <span className="text-foreground">{selectedSlot ?? "Not selected"}</span>
                          </p>
                      </div>
                  </div>
              </div>

              <Button className="w-full mt-3" disabled={!selectedSlot || !selectedDay} onClick={onConfirm}>
                Confirm appointment
              </Button>
            </FieldGroup>
        </CardContent>
      </Card>
    </div>
  )
}
