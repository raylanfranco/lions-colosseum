import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { senderId, receiverId, content } = await req.json();

    if (!senderId || !receiverId || !content) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const message = await prisma.message.create({
      data: {
        senderId,
        receiverId,
        content,
      },
    });

    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    console.error("Send Message Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
