// src/types/index.ts
import type { Booking, Service, User, BookingStatus } from "@prisma/client";

// Booking with all common relations included
export type BookingWithDetails = Booking & {
  service: Service;
  client: Pick<User, "id" | "name" | "email" | "phone">;
  provider: Pick<User, "id" | "name" | "email">;
};

// An available time slot returned from the API
export interface TimeSlot {
  startTime: Date;
  endTime: Date;
  label: string; // e.g. "9:00 AM"
}

// Booking wizard state (multi-step form)
export interface BookingFormState {
  step: 1 | 2 | 3;         // 1: service, 2: date/time, 3: confirm
  serviceId: string | null;
  date: Date | null;
  slot: TimeSlot | null;
  notes: string;
}

export type { BookingStatus };

export type { Service };