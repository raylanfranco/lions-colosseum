import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const currentUser = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  const messages = await prisma.message.findMany({
    where: { receiverId: currentUser?.id },
    include: { sender: true },
    orderBy: { timestamp: "desc" },
  });

  return NextResponse.json(messages);
}