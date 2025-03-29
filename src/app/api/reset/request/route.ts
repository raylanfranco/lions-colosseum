import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { randomBytes } from "crypto";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    console.log("Password reset request for:", email);

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const token = randomBytes(32).toString("hex");
    const expiry = new Date(Date.now() + 3600000);

    console.log("Generated reset token:", token);

    await prisma.user.update({
      where: { email },
      data: {
        resetToken: token,
        resetTokenExpiry: expiry,
      },
    });

    return NextResponse.json({ token }, { status: 200 });
  } catch (error: any) {
    console.error("RESET ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

