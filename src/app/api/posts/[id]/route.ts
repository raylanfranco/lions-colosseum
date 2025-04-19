import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { content } = await req.json();

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { role: true },
    });

    const isAdmin = user?.role === "ADMIN";

    // Optional: If not admin, verify ownership
    if (!isAdmin) {
      const post = await prisma.post.findUnique({
        where: { id: params.id },
        include: {
          user: { select: { email: true } },
        },
      });

      if (!post || post.user.email !== session.user.email) {
        return new NextResponse("Forbidden", { status: 403 });
      }
    }

    // Proceed with update
    const updated = await prisma.post.update({
      where: { id: params.id },
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
  } catch (err) {
    console.error("Error updating post:", err);
    return new NextResponse("Failed to update post", { status: 500 });
  }
}
