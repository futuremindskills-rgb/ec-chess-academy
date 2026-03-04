"use server";

import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";

// --- FIX: PRISMA SINGLETON ---
// This prevents the "Property does not exist" error and connection leaks
const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function registerForTournament(formData: FormData) {
  const tournamentId = parseInt(formData.get("tournamentId") as string);
  const playerName = formData.get("playerName") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;

  try {
    // 1. Get Tournament Details
    const tournament = await prisma.tournament.findUnique({
      where: { id: tournamentId },
    });

    if (!tournament) throw new Error("Tournament not found");

    // 2. Create Pending Registration in DB
    // This now works because we use the instantiated 'prisma' object
    const registration = await prisma.registration.create({
      data: {
        playerName,
        email,
        phone,
        tournamentId,
        status: "PENDING",
      },
    });

    // 3. Create Stripe Session (HKD)
    const session = await stripe.checkout.sessions.create({
      customer_email: email,
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "hkd",
            product_data: {
              name: tournament.title,
              description: `Participant: ${playerName}`,
            },
            unit_amount: tournament.entryFee, // e.g. 50000 for HK$500
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      metadata: {
        registrationId: registration.id,
        tournamentId: tournament.id.toString(),
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success?regId=${registration.id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/tournaments`,
    });

    return { url: session.url };
  } catch (error) {
    console.error("Error during registration:", error);
    throw new Error("Registration failed. Check server logs.");
  }
}