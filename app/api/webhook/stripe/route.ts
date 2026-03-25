import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature") as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );
  } catch (err: any) {
    console.error("❌ Stripe Webhook Signature Verification Failed:", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const registrationId = session.metadata?.registrationId;

  // --- CASE 1: PAYMENT SUCCESSFUL ---
  if (event.type === "checkout.session.completed") {
    if (registrationId) {
      try {
        await prisma.registration.update({
          where: { id: registrationId },
          data: { 
            status: "COMPLETED",
            // Store specific Stripe IDs for admin auditing/refunds later
            stripeSessionId: session.id, 
            transactionId: session.payment_intent as string, 
          },
        });
        console.log(`✅ Registration ${registrationId} confirmed and paid.`);
      } catch (dbError) {
        console.error("Database Update Error:", dbError);
        return new NextResponse("Database Error", { status: 500 });
      }
    }
  }

  // --- CASE 2: PAYMENT EXPIRED/ABANDONED ---
  // If the user opens the Stripe page but never pays and the session expires
  if (event.type === "checkout.session.expired") {
    if (registrationId) {
      await prisma.registration.update({
        where: { id: registrationId },
        data: { status: "FAILED" },
      });
      console.log(`⚠️ Registration ${registrationId} marked as FAILED (Session Expired).`);
    }
  }

  return NextResponse.json({ received: true });
}