import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Stripe } from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-03-31.basil",
});

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { eventId } = await req.json();

  const event = await prisma.event.findUnique({ where: { id: eventId } });
  if (!event) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }

  // Prevent duplicate purchases
  const existing = await prisma.ticket.findUnique({
    where: {
      eventId_userId: {
        eventId,
        userId: session.user.id,
      },
    },
  });

  if (existing) {
    return NextResponse.json({ error: "Already purchased" }, { status: 400 });
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?event=${eventId}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: { name: event.title },
          unit_amount: Math.round(event.price * 100), // Stripe uses cents
        },
        quantity: 1,
      },
    ],
    metadata: {
      eventId,
      userId: session.user.id,
    },
  });

  return NextResponse.json({ url: checkoutSession.url });
}
