"use server";

import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";
import crypto from "crypto";

// Use a global prisma instance to prevent connection exhaustion
const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

/**
 * GENERATE ASIAPAY HASH
 * Most AsiaPay/PayDollar accounts default to SHA1. 
 * If this still fails, check your Merchant Admin Dashboard 
 * under Profile > Payment Information to see if it's set to SHA256.
 */
function generateAsiaPayHash(orderRef: string, amount: string, currCode: string) {
  const merchantId = process.env.ASIAPAY_MERCHANT_ID?.trim();
  const secret = process.env.ASIAPAY_SECURE_HASH_SECRET?.trim();
  const payType = "N";

  // The order MUST be: MerchantId|OrderRef|CurrCode|Amount|PayType|Secret
  const rawStr = `${merchantId}|${orderRef}|${currCode}|${amount}|${payType}|${secret}`;
  
  // Changed to sha1 as it is the standard default for PayDollar/AsiaPay
  return crypto.createHash("sha1").update(rawStr).digest("hex");
}

export async function registerForTournament(formData: FormData) {
  const tournamentId = parseInt(formData.get("tournamentId") as string);
  const method = formData.get("method") as string;
  
  // Data extraction
  const playerName = formData.get("playerName") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const dob = formData.get("dob") as string;
  const gender = formData.get("gender") as string;
  const studentCategory = formData.get("studentCategory") as string;
  const rating = (formData.get("rating") as string) || null;
  const fideId = (formData.get("fideId") as string) || null;
  const onlineUsername = (formData.get("onlineUsername") as string) || null;

  try {
    const tournament = await prisma.tournament.findUnique({ where: { id: tournamentId } });
    if (!tournament) throw new Error("Tournament not found");

    // 1. Create the Pending Registration in the Database
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
        status: "PENDING",
        paymentGateway: method, 
      },
    });

    // --- STRIPE FLOW ---
    if (method === "stripe") {
      const session = await stripe.checkout.sessions.create({
        customer_email: email,
        payment_method_types: ["card"],
        line_items: [{
          price_data: {
            currency: "hkd",
            product_data: { name: tournament.title, description: `Participant: ${playerName}` },
            unit_amount: tournament.entryFee, // In cents (e.g., 500 = $5.00)
          },
          quantity: 1,
        }],
        mode: "payment",
        metadata: { registrationId: registration.id },
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-status?id=${registration.id}&gateway=stripe&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/tournaments`,
      });

      await prisma.registration.update({
        where: { id: registration.id },
        data: { stripeSessionId: session.id }
      });

      return { url: session.url };
    }

    // --- ASIAPAY FLOW ---
    if (method === "asiapay") {
      const amountStr = (tournament.entryFee / 100).toFixed(2); // Convert 500 to "5.00"
      const currCode = "344"; // HKD

      /**
       * ASIAPAY ORDER REF LIMIT: 35 Characters
       * Registration ID (CUID) is ~25 chars.
       * We append a 5-digit timestamp suffix for uniqueness on retries.
       */
      const timestampSuffix = Date.now().toString().slice(-5);
      const gatewayOrderRef = `${registration.id.slice(0, 29)}-${timestampSuffix}`.slice(0, 35);

      // Generate the Secure Hash (SHA1)
      const secureHash = generateAsiaPayHash(gatewayOrderRef, amountStr, currCode);

      const params = new URLSearchParams({
        merchantId: process.env.ASIAPAY_MERCHANT_ID?.trim() as string,
        amount: amountStr,
        orderRef: gatewayOrderRef,
        currCode: currCode,
        successUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-status?id=${registration.id}&gateway=asiapay`,
        failUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-status?id=${registration.id}&gateway=asiapay&error=true`,
        cancelUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/tournaments`,
        payType: "N",
        lang: "E",
        payMethod: "ALL",
        secureHash: secureHash,
      });

      // Construct the final Redirect URL
      const redirectUrl = `${process.env.ASIAPAY_PAYMENT_URL}?${params.toString()}`;

      return { url: redirectUrl };
    }

    throw new Error("Invalid payment method.");
  } catch (error) {
    console.error("Registration error:", error);
    return { error: "Failed to process registration. Please try again." };
  }
}