// app/api/posts/route.ts
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { content, photo } = await req.json();

  if (!content && !photo) {
    return NextResponse.json(
      { error: "Post must have text or image" },
      { status: 400 }
    );
  }

  const post = await prisma.post.create({
    data: {
      content,
      photo,
      authorId: session.user.id,
    },
  });

  return NextResponse.json(post);
}
