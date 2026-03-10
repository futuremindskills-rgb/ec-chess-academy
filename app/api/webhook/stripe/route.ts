import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature") as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err: any) {
    console.error("Webhook Error:", err.message);
    return new NextResponse("Webhook Error", { status: 400 });
  }

  console.log("Stripe Event:", event.type);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const registrationId = session.metadata?.registrationId;

    if (registrationId) {
      await prisma.registration.update({
        where: { id: registrationId },
        data: { status: "COMPLETED" },
      });

      console.log("Registration updated:", registrationId);
    }
  }

  return NextResponse.json({ received: true });
}