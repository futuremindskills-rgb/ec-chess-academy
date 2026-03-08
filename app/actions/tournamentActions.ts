"use server";

import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";


// Prisma singleton
const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function registerForTournament(formData: FormData) {
const tournamentId = parseInt(formData.get("tournamentId") as string);

const playerName = formData.get("playerName") as string;
const email = formData.get("email") as string;
const phone = formData.get("phone") as string;

const dob = formData.get("dob") as string;
const gender = formData.get("gender") as string;
const studentCategory = formData.get("studentCategory") as string;

// Optional fields
const rating = formData.get("rating") as string | null;
const fideId = formData.get("fideId") as string | null;
const onlineUsername = formData.get("onlineUsername") as string | null;

try {
// Get tournament
const tournament = await prisma.tournament.findUnique({
where: { id: tournamentId },
});

if (!tournament) throw new Error("Tournament not found");

// Create registration
const registration = await prisma.registration.create({
  data: {
    playerName,
    email,
    phone,
    dob: new Date(dob),
    gender,
    studentCategory,
    rating: rating || null,
    fideId: fideId || null,
    onlineUsername: onlineUsername || null,
    tournamentId,
    status: "PENDING",
  },
});

// Stripe checkout
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
        unit_amount: tournament.entryFee,
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
throw new Error("Registration failed.");
}
}
