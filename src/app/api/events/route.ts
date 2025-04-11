// app/api/events/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const events = await prisma.event.findMany({
    where: {
      startDate: {
        gte: new Date(), // Optional: only future events
      },
    },
    orderBy: { startDate: "asc" },
    take: 10, // Optional: only show top 10 upcoming events
  });

  return NextResponse.json(events);
}
