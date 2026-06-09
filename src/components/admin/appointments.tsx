
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// ✅ New component for managing future appointments
export function FutureAppointmentsManager() {
  const [futureAppointments, setFutureAppointments] = useState([
    { id: 1, name: "Mark Lee", service: "Beard Trim", date: "2026-06-12", time: "14:00" },
  ]);

  const [newItem, setNewItem] = useState({ name: "", service: "", date: "", time: "" });
  const [editingId, setEditingId] = useState(null);

  const addItem = () => {
    if (!newItem.name || !newItem.service || !newItem.date || !newItem.time) return;

    setFutureAppointments([
      ...futureAppointments,
      { id: Date.now(), ...newItem },
    ]);

    setNewItem({ name: "", service: "", date: "", time: "" });
  };

  const deleteItem = (id: number) => {
    setFutureAppointments(futureAppointments.filter((a) => a.id !== id));
  };

  const startEdit = (item: any) => {
    setEditingId(item.id);
    setNewItem(item);
  };

  const saveEdit = () => {
    setFutureAppointments(futureAppointments.map((a) =>
      a.id === editingId ? { ...newItem, id: editingId } : a
    ));
    setEditingId(null);
    setNewItem({ name: "", service: "", date: "", time: "" });
  };


  return (
    <Card className="bg-white border shadow-sm">
      <CardContent className="p-4 space-y-4">
        <h2 className="text-xl font-semibold">Future Appointments</h2>


        {/* Form */}
        <div className="grid md:grid-cols-4 gap-2">
          <Input placeholder="Name" value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} />
          <Input placeholder="Service" value={newItem.service} onChange={(e) => setNewItem({ ...newItem, service: e.target.value })} />
          <Input type="date" value={newItem.date} onChange={(e) => setNewItem({ ...newItem, date: e.target.value })} />
          <Input type="time" value={newItem.time} onChange={(e) => setNewItem({ ...newItem, time: e.target.value })} />
        </div>


        <div className="flex gap-2">
          {editingId ? (
            <Button onClick={saveEdit}>Save Edit</Button>
          ) : (
            <Button onClick={addItem}>Add Appointment</Button>
          )}
        </div>


        {/* List */}
        <div className="grid gap-2">
          {futureAppointments.map((item) => (
            <div key={item.id} className="flex justify-between items-center p-3 border rounded-lg bg-gray-50">
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-500">{item.service}</p>
                <p className="text-sm text-gray-600">{item.date} at {item.time}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => startEdit(item)}>Edit</Button>
                <Button size="sm" variant="destructive" onClick={() => deleteItem(item.id)}>Delete</Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
