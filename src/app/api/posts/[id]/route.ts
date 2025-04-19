import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { NextRequest } from "next/server";

type ContextWithId = {
  params: {
    id: string;
  };
};

export async function PATCH(req: any, context: any) {
  const { id } = context.params;
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { content } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { role: true },
  });

  const isAdmin = user?.role === "ADMIN";

  if (!isAdmin) {
    const post = await prisma.post.findUnique({
      where: { id },
      include: { user: { select: { email: true } } },
    });

    if (!post || post.user.email !== session.user.email) {
      return new NextResponse("Forbidden", { status: 403 });
    }
  }

  const updated = await prisma.post.update({
    where: { id },
    data: { content },
    include: {
      user: {
        select: {
          fullName: true,
          avatar: true,
          email: true,
        },
      },
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(req: any, context: any) {
  const { id } = context.params;
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { role: true },
  });

  const isAdmin = user?.role === "ADMIN";

  const post = await prisma.post.findUnique({
    where: { id },
    include: { user: { select: { email: true } } },
  });

  if (!post) {
    return new NextResponse("Post not found", { status: 404 });
  }

  if (!isAdmin && post.user.email !== session.user.email) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  await prisma.post.delete({ where: { id } });

  return new NextResponse(null, { status: 204 });
}
