"use client"
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FutureAppointmentsManager } from "./appointments";
import { AppoModal } from "./appo-modal";

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState([
    { id: 1, name: "John Doe", service: "Fade", time: "10:00" },
    { id: 2, name: "Lisa Smith", service: "Trim", time: "11:00" },
    { id: 3, name: "Lisa Smith", service: "Trim", time: "12:00" },
    { id: 4, name: "Lisa Smith", service: "Trim", time: "13:00" },
    { id: 5, name: "Lisa Smith", service: "Trim", time: "14:00" },
    { id: 6, name: "Lisa Smith", service: "Trim", time: "15:00" },
  ]);

  const [barbers, setBarbers] = useState([
    { id: 1, name: "Mike" },
    { id: 2, name: "Anna" },
  ]);

  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    name: "",
    service: "",
    time: "",
  });


  const addAppointment = () => {
    if (!newAppointment.name || !newAppointment.service || !newAppointment.time) return;

    setAppointments([
      ...appointments,
      {
        id: Date.now(),
        ...newAppointment,
      },
    ]);

    setNewAppointment({ name: "", service: "", time: "" });
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 grid gap-6 bg-gray-50 min-h-screen text-gray-900">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-white border shadow-sm">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold text-gray-600">Total Bookings</h2>
            <p className="text-2xl text-blue-600">{appointments.length}</p>
          </CardContent>
        </Card>

      </div>

      <Card className="bg-white border shadow-sm">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Timer i dag</h2>
              <Button onClick={() => setIsModalOpen(true)}>+ Add</Button>
          </div>

          <div className="grid gap-3">
            {appointments.map((appt) => (
              <div
                key={appt.id}
                className="p-3 border bg-gray-50 rounded-xl flex justify-between items-center hover:bg-gray-100"
              >
                <div>
                  <p className="font-semibold text-gray-800">{appt.name}</p>
                  <p className="text-sm text-gray-500">{appt.service}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-700">{appt.time}</p>
                  <Button size="sm" variant="destructive">Cancel</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <FutureAppointmentsManager />

      {isModalOpen && (
        <AppoModal
          newAppointment={newAppointment}
          setNewAppointment={setNewAppointment}
          setIsModalOpen={setIsModalOpen}
          addAppointment={addAppointment}
        />
      )}


      {/* <Card className="bg-white border shadow-sm">
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-4">Manage Barbers</h2>
          <div className="grid gap-3">
            {barbers.map((barber) => (
              <div key={barber.id} className="flex justify-between items-center border bg-gray-50 p-3 rounded-xl">
                <p className="text-gray-800">{barber.name}</p>
                <Button size="sm" variant="outline">Edit</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card> */}
    </div>
  );
}
