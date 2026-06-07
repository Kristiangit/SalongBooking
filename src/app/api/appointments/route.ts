// src/app/api/appointments/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getAvailableSlots } from "@/lib/availability";

const CreateBookingSchema = z.object({
  serviceId: z.string().cuid(),
  providerId: z.string().cuid(),
  startTime: z.string().datetime(),
  notes: z.string().max(500).optional(),
});

// GET /api/appointments — list current user's bookings
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const role = searchParams.get("role") ?? "client"; // "client" | "provider"
  const status = searchParams.get("status");

  const where =
    role === "provider"
      ? { providerId: session.user.id, ...(status ? { status: status as any } : {}) }
      : { clientId: session.user.id, ...(status ? { status: status as any } : {}) };

  const bookings = await prisma.booking.findMany({
    where,
    include: {
      service: true,
      client: { select: { id: true, name: true, email: true, phone: true } },
      provider: { select: { id: true, name: true, email: true } },
      payment: true,
    },
    orderBy: { startTime: "asc" },
  });

  return NextResponse.json(bookings);
}

// POST /api/appointments — create a booking
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = CreateBookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { serviceId, providerId, startTime, notes } = parsed.data;

  const service = await prisma.service.findUnique({ where: { id: serviceId } });
  if (!service || !service.isActive) {
    return NextResponse.json({ error: "Service not found" }, { status: 404 });
  }

  const start = new Date(startTime);
  const end = new Date(start.getTime() + service.duration * 60000);

  // Validate slot is still available
  const available = await getAvailableSlots(providerId, start, service.duration);
  const isValid = available.some((s) => s.startTime.getTime() === start.getTime());

  if (!isValid) {
    return NextResponse.json({ error: "This time slot is no longer available" }, { status: 409 });
  }

  const booking = await prisma.booking.create({
    data: {
      clientId: session.user.id,
      providerId,
      serviceId,
      startTime: start,
      endTime: end,
      notes,
      status: "PENDING",
    },
    include: {
      service: true,
      provider: { select: { name: true, email: true } },
    },
  });

  // TODO: Send confirmation email via Resend
  // await sendBookingConfirmation(booking);

  return NextResponse.json(booking, { status: 201 });
}
