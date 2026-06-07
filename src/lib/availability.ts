// src/lib/availability.ts
// Core business logic: compute available booking slots for a given date

import { prisma } from "./prisma";

interface Slot {
  startTime: Date;
  endTime: Date;
  label: string; // e.g. "9:00 AM"
}

export async function getAvailableSlots(
  providerId: string,
  date: Date,
  serviceDurationMinutes: number
): Promise<Slot[]> {
  const dayOfWeek = date.getDay(); // 0 = Sunday

  // 1. Get provider's working hours for this day
  const availability = await prisma.availability.findUnique({
    where: { providerId_dayOfWeek: { providerId, dayOfWeek } },
  });

  if (!availability || !availability.isActive) return [];

  // 2. Parse working hours into Date objects
  const [startHour, startMin] = availability.startTime.split(":").map(Number);
  const [endHour, endMin] = availability.endTime.split(":").map(Number);

  const dayStart = new Date(date);
  dayStart.setHours(startHour, startMin, 0, 0);

  const dayEnd = new Date(date);
  dayEnd.setHours(endHour, endMin, 0, 0);

  // 3. Fetch existing bookings that overlap this day
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const existingBookings = await prisma.booking.findMany({
    where: {
      providerId,
      status: { in: ["PENDING", "CONFIRMED"] },
      startTime: { gte: startOfDay, lte: endOfDay },
    },
  });

  // 4. Fetch blocked slots
  const blockedSlots = await prisma.blockedSlot.findMany({
    where: {
      providerId,
      startTime: { lte: endOfDay },
      endTime: { gte: startOfDay },
    },
  });

  // 5. Generate all possible slots
  const slots: Slot[] = [];
  let cursor = new Date(dayStart);
  const now = new Date();

  while (cursor.getTime() + serviceDurationMinutes * 60000 <= dayEnd.getTime()) {
    const slotStart = new Date(cursor);
    const slotEnd = new Date(cursor.getTime() + serviceDurationMinutes * 60000);

    // Skip past slots
    if (slotStart <= now) {
      cursor = slotEnd;
      continue;
    }

    // Check for booking conflicts
    const hasBookingConflict = existingBookings.some(
      (b) => slotStart < b.endTime && slotEnd > b.startTime
    );

    // Check for blocked slot conflicts
    const hasBlockedConflict = blockedSlots.some(
      (b) => slotStart < b.endTime && slotEnd > b.startTime
    );

    if (!hasBookingConflict && !hasBlockedConflict) {
      slots.push({
        startTime: slotStart,
        endTime: slotEnd,
        label: slotStart.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
      });
    }

    cursor = slotEnd;
  }

  return slots;
}
