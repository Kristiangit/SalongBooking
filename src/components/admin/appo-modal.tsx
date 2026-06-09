import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface AppoModalProps {
  newAppointment: any
  setNewAppointment: (appointment: any) => void
  setIsModalOpen: (isOpen: boolean) => void
  addAppointment: () => void
}

export function AppoModal({
    newAppointment,
    setNewAppointment,
    setIsModalOpen,
    addAppointment
}: AppoModalProps) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 space-y-4">
        <h2 className="text-xl font-semibold">Add Appointment</h2>

        <Input
            placeholder="Customer name"
            value={newAppointment.name}
            onChange={(e) =>
            setNewAppointment({ ...newAppointment, name: e.target.value })
            }
        />

        <Input
            placeholder="Service (e.g. Fade)"
            value={newAppointment.service}
            onChange={(e) =>
            setNewAppointment({ ...newAppointment, service: e.target.value })
            }
        />

        <Input
            type="time"
            value={newAppointment.time}
            onChange={(e) =>
            setNewAppointment({ ...newAppointment, time: e.target.value })
            }
        />

        <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
            Cancel
            </Button>
            <Button onClick={addAppointment}>Save</Button>
        </div>
        </div>
    </div>
  );
}