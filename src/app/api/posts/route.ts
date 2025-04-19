import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { NextRequest } from "next/server";

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
      include: {
        user: {
          select: { email: true },
        },
      },
    });

    if (!post || post.user.email !== session.user.email) {
      return new NextResponse("Forbidden", { status: 403 });
    }
  }

  const updated = await prisma.post.update({
    where: { id },
    data: {
      content,
    },
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
    include: {
      user: {
        select: { email: true },
      },
    },
  });

  if (!post) {
    return new NextResponse("Post not found", { status: 404 });
  }

  if (!isAdmin && post.user.email !== session.user.email) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  await prisma.post.delete({
    where: { id },
  });

  return new NextResponse(null, { status: 204 });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const body = await req.json();
  const { content, image } = body;

  if (!content && !image) {
    return new NextResponse("Post must include content or image", {
      status: 400,
    });
  }

  try {
    const post = await prisma.post.create({
      data: {
        content,
        image,
        user: {
          connect: {
            email: session.user.email,
          },
        },
      },
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

    return NextResponse.json(post);
  } catch (err) {
    console.error("Failed to create post:", err);
    return new NextResponse("Failed to create post", { status: 500 });
  }
}

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
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

    return NextResponse.json(posts);
  } catch (err) {
    console.error("Failed to fetch posts:", err);
    return new NextResponse("Failed to fetch posts", { status: 500 });
  }
}
