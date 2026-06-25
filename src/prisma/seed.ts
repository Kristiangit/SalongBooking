
import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/client";
const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  // Create a provider
  const provider = await prisma.user.upsert({
    where: { email: "provider@example.com" },
    update: {},
    create: {
      email: "provider@example.com",
      name: "Dr. Sarah Johnson",
      phone: "+1 (555) 100-2000",
      role: "PROVIDER",
    },
  });

  // Create a client
  const client = await prisma.user.upsert({
    where: { email: "client@example.com" },
    update: {},
    create: {
      email: "client@example.com",
      name: "Alex Smith",
      phone: "+1 (555) 300-4000",
      role: "CLIENT",
    },
  });

  // Create services
  const consultation = await prisma.service.create({
    data: {
      name: "Initial Consultation",
      description: "A 30-minute introductory session",
      duration: 30,
      price: 75.0,
      color: "#6366f1",
      providerId: provider.id,
    },
  });

  await prisma.service.create({
    data: {
      name: "Follow-up Session",
      description: "A 60-minute follow-up appointment",
      duration: 60,
      price: 120.0,
      color: "#10b981",
      providerId: provider.id,
    },
  });

  // Set availability: Mon–Fri, 9am–5pm
  const workDays = [1, 2, 3, 4, 5]; // Mon to Fri
  for (const day of workDays) {
    await prisma.availability.upsert({
      where: { providerId_dayOfWeek: { providerId: provider.id, dayOfWeek: day } },
      update: {},
      create: {
        providerId: provider.id,
        dayOfWeek: day,
        startTime: "09:00",
        endTime: "17:00",
      },
    });
  }

  // Create a sample booking
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(10, 0, 0, 0);

  await prisma.booking.create({
    data: {
      clientId: client.id,
      providerId: provider.id,
      serviceId: consultation.id,
      startTime: tomorrow,
      endTime: new Date(tomorrow.getTime() + 30 * 60000),
      status: "CONFIRMED",
      notes: "First time visitor",
    },
  });

  console.log("✅ Seed complete!");
  console.log(`   Provider: ${provider.email}`);
  console.log(`   Client:   ${client.email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
