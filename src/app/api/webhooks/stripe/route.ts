import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-03-31.basil",
});

console.log("🔥 Incoming webhook hit");

export async function POST(req: Request) {
  const body = await req.text(); // raw body
  const sig = req.headers.get("stripe-signature")!;

  console.log("Method:", req.method);
  console.log("Headers:", Object.fromEntries(req.headers.entries()));
  console.log("URL:", req.url);
  console.log(`We should see something here`, body);

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const eventId = session.metadata?.eventId;
    const userId = session.metadata?.userId;

    console.log("🎯 Stripe Session Metadata:", session.metadata);

    console.log("🎯 Webhook Triggered for Event ID:", eventId);

    if (!eventId || !userId) {
      return new NextResponse("Missing metadata", { status: 400 });
    }

    try {
      const existingTicket = await prisma.ticket.findUnique({
        where: {
          eventId_userId: {
            eventId,
            userId,
          },
        },
      });

      if (!existingTicket) {
        await prisma.ticket.create({
          data: {
            eventId,
            userId,
          },
        });

        console.log(`✅ Ticket issued for user ${userId} for event ${eventId}`);
      } else {
        console.log(`ℹ️ User ${userId} already has a ticket`);
      }
    } catch (err) {
      console.error("🚨 Ticket creation error:", err);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
