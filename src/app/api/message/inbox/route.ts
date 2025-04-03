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
    where: {
      OR: [{ senderId: currentUser?.id }, { receiverId: currentUser?.id }],
    },
    include: {
      sender: true,
      receiver: true,
    },
    orderBy: {
      timestamp: "asc",
    },
  });

  return NextResponse.json(messages);
}
