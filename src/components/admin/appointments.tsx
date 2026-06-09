
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "../ui/calendar";
import { Field, FieldGroup, FieldLabel } from "../ui/field";

export function CalendarAppointments() {
  const [appointments, setAppointments] = useState([{ id: 1, date: "2023-10-15", name: "John Doe", service: "Klipp", time: "10:00" }]);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>()
  const [form, setForm] = useState({ name: "", service: "", time: "" });
  const [template, setTemplate] = useState({ amount: 60, start: "10:00", end: "17:00" });

  const templateSlots = [
    "09:00","10:00","11:00","12:00","13:00","14:00","15:00"
  ];

  
  function generateTemplateSlots(start = "09:00", end = "17:00", intervalMinutes = 60) {
    const slots = [];

    const [startH, startM] = start.split(":").map(Number);
    const [endH, endM] = end.split(":").map(Number);

    let current = new Date();
    current.setHours(startH, startM, 0, 0);

    const endTime = new Date();
    endTime.setHours(endH, endM-1, 0, 0);

    while (current <= endTime) {
      const hh = String(current.getHours()).padStart(2, "0");
      const mm = String(current.getMinutes()).padStart(2, "0");
      slots.push(`${hh}:${mm}`);

      current = new Date(current.getTime() + intervalMinutes * 60000);
    }

    return slots;
  }


  const formatDate = (date: any) => {
    if (!date) return null;
    return date.toISOString().split("T")[0];
  };


  const getAppointmentsForDate = (date: any) =>
    appointments.filter((a) => a.date === formatDate(date));

  const addAppointment = () => {
    if (!form.time || !selectedDate) return;

    setAppointments([
      ...appointments,
      {
        id: Date.now(),
        date: formatDate(selectedDate),
        ...form,
      },
    ].sort((a, b) => a.time.localeCompare(b.time))
  );
  };

  const deleteAppointment = (id: number) => {
    setAppointments(appointments.filter((a) => a.id !== id));
  };

  const fillTemplateDay = () => {
    if (!selectedDate) return;

    const newSlots = generateTemplateSlots(template.start, template.end, template.amount).map((time) => ({
      id: Date.now() + Math.random(),
      date: formatDate(selectedDate),
      name: "",
      service: "",
      time,
    }));

    setAppointments([...appointments, ...newSlots]);
  };

  return (
    <Card className="bg-white border shadow-sm">
      <CardContent className="p-4 space-y-4">
        <h2 className="text-xl font-semibold">Kalender</h2>

        <div className="flex flex-row justify-around items-start gap-6">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
          />

          {selectedDate && (
            <div className="space-x-8 flex flex-row justify-evenly">
              {/* List */}
              <div className="grid gap-2 mb-auto">
                {getAppointmentsForDate(selectedDate).map((appt) => (
                  <div
                    key={appt.id}
                    className="flex justify-between p-2 border rounded bg-gray-50 mb-auto"
                  >
                    <div>
                      <p>{appt.time}</p>
                      <p className="text-sm text-gray-500">
                        {appt.name || "(empty)"}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteAppointment(appt.id)}
                    >
                      Slett
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Valgt dato: {formatDate(selectedDate)}</h2>

                <div className="flex gap-2">
                {/* Add form */}
                  <Input
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                  />
                  <Input
                    type="time"
                    value={form.time}
                    onChange={(e) =>
                      setForm({ ...form, time: e.target.value })
                    }
                  />
                  <Button onClick={addAppointment}>Legg til</Button>
                </div>


              {/* Template */}
              <div className="flex gap-2 mt-10 items-end">
                <FieldGroup className="flex flex-row items-center gap-2">
                  <Field>
                    <FieldLabel>Min</FieldLabel>
                    <Input
                      type="number"
                      value={template.amount}
                      onChange={(e) =>
                        setTemplate({ ...template, amount: parseInt(e.target.value) || 0 })
                      }
                    />
                  </Field>

                  <Field>
                    <FieldLabel>Start</FieldLabel>
                      <Input
                      type="time"
                      value={template.start}
                      onChange={(e) =>
                        setTemplate({ ...template, start: e.target.value })
                      }
                    />
                  </Field>

                  <Field>
                    <FieldLabel>Slutt</FieldLabel>
                    <Input
                      type="time"
                      value={template.end}
                      onChange={(e) =>
                        setTemplate({ ...template, end: e.target.value })
                      }
                    />
                  </Field>
                </FieldGroup>
                <Button variant="outline" onClick={fillTemplateDay}>
                  Fyll dagen
                </Button>
              </div>
              </div>

              
            </div>
            )}
        </div>
      </CardContent>
    </Card>
  );
}
