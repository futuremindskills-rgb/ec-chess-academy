"use server";

import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";

// Direct initialization
const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function registerForTournament(formData: FormData) {
  const tournamentId = parseInt(formData.get("tournamentId") as string);
  const playerName = formData.get("playerName") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const dob = formData.get("dob") as string;
  const gender = formData.get("gender") as string;
  const studentCategory = formData.get("studentCategory") as string;

  // Optional fields
  const rating = (formData.get("rating") as string) || null;
  const fideId = (formData.get("fideId") as string) || null;
  const onlineUsername = (formData.get("onlineUsername") as string) || null;

  try {
    const tournament = await prisma.tournament.findUnique({
      where: { id: tournamentId },
    });

    if (!tournament) throw new Error("Tournament not found");

    // 1. Create registration with status PENDING
    const registration = await prisma.registration.create({
      data: {
        playerName,
        email,
        phone,
        dob: new Date(dob),
        gender,
        studentCategory,
        rating,
        fideId,
        onlineUsername,
        tournamentId,
        status: "PENDING", // Matches RegistrationStatus Enum
      },
    });

    // 2. Create Stripe Session
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
            unit_amount: tournament.entryFee, // HKD in cents (e.g. 35000)
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      metadata: {
        registrationId: registration.id,
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/tournaments`,
    });

    return { url: session.url };
  } catch (error) {
    console.error("Registration error:", error);
    throw new Error("Failed to process registration.");
  }
}