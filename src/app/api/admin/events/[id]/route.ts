// app/api/admin/events/[id]/route.ts
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (session?.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const { title, description, photo, location, price, date } = body;

  const event = await prisma.event.update({
    where: { id: params.id },
    data: {
      title,
      description,
      photo,
      location,
      price,
      date: new Date(date),
    },
  });

  return NextResponse.json(event);
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (session?.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await prisma.event.delete({
    where: { id: params.id },
  });

  return NextResponse.json({ message: "Event deleted" });
}
