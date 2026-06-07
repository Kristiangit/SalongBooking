// src/app/api/availability/slots/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAvailableSlots } from "@/lib/availability";

// GET /api/availability/slots?providerId=...&date=2024-03-15&serviceId=...
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const providerId = searchParams.get("providerId");
  const dateStr = searchParams.get("date");
  const serviceId = searchParams.get("serviceId");

  if (!providerId || !dateStr || !serviceId) {
    return NextResponse.json(
      { error: "providerId, date, and serviceId are required" },
      { status: 400 }
    );
  }

  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    return NextResponse.json({ error: "Invalid date format" }, { status: 400 });
  }

  const service = await prisma.service.findUnique({ where: { id: serviceId } });
  if (!service) return NextResponse.json({ error: "Service not found" }, { status: 404 });

  const slots = await getAvailableSlots(providerId, date, service.duration);

  return NextResponse.json({
    date: dateStr,
    serviceId,
    duration: service.duration,
    slots,
  });
}
