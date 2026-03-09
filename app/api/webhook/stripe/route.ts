import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

// Direct initialization
const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // When payment is successful
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const registrationId = session.metadata?.registrationId;

    if (registrationId) {
      // Update DB to COMPLETED
      await prisma.registration.update({
        where: { id: registrationId },
        data: { status: "COMPLETED" },
      });
      
      console.log(`✅ Success: Registration ${registrationId} is now COMPLETED.`);
    }
  }

  return new NextResponse("OK", { status: 200 });
}