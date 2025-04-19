import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma"; // your Prisma instance

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
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: {
        select: {
          fullName: true,
          avatar: true,
        },
      },
    },
  });

  return NextResponse.json(posts);
}
