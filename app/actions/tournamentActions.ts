"use server";

import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";
import crypto from "crypto";
import { revalidatePath } from "next/cache";

// Use a global prisma instance to prevent connection exhaustion
const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

/**
 * GENERATE ASIAPAY HASH
 */
function generateAsiaPayHash(orderRef: string, amount: string, currCode: string) {
  const merchantId = process.env.ASIAPAY_MERCHANT_ID?.trim();
  const secret = process.env.ASIAPAY_SECURE_HASH_SECRET?.trim();
  const payType = "N";

  // The order MUST be: MerchantId|OrderRef|CurrCode|Amount|PayType|Secret
  const rawStr = `${merchantId}|${orderRef}|${currCode}|${amount}|${payType}|${secret}`;
  return crypto.createHash("sha1").update(rawStr).digest("hex");
}

export async function registerForTournament(formData: FormData) {
  const tournamentId = parseInt(formData.get("tournamentId") as string);
  const method = formData.get("method") as string;
  const couponCode = (formData.get("couponCode") as string | null)?.toUpperCase().trim();
  
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
    // 1. Get official tournament data
    const tournament = await prisma.tournament.findUnique({ where: { id: tournamentId } });
    if (!tournament) throw new Error("Tournament not found");

    let finalEntryFee = tournament.entryFee; // Value in cents (e.g. 50000 for HK$500)
    let appliedCouponId = null;

    // 2. Server-side Coupon Validation
    if (couponCode) {
      const coupon = await prisma.coupon.findUnique({
        where: { code: couponCode }
      });

      if (coupon) {
        const isExpired = coupon.expiryDate && new Date() > coupon.expiryDate;
        const isLimitReached = coupon.usageLimit && coupon.usedCount >= coupon.usageLimit;
        const isWrongTournament = coupon.tournamentId && coupon.tournamentId !== tournamentId;

        if (!isExpired && !isLimitReached && !isWrongTournament) {
          appliedCouponId = coupon.id;
          if (coupon.discountType === "PERCENT") {
            finalEntryFee = Math.round(finalEntryFee * (1 - coupon.discountValue / 100));
          } else {
            // Convert fixed discount HK$ to cents
            finalEntryFee = Math.max(0, finalEntryFee - (coupon.discountValue * 100));
          }
        }
      }
    }

    // 3. Create the Registration Record
    // If fee is 0, we set status to COMPLETED immediately
    const isFree = finalEntryFee === 0;

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
        status: isFree ? "COMPLETED" : "PENDING",
        paymentGateway: isFree ? "FREE_COUPON" : method,
      },
    });

    // 4. If a coupon was used, increment its usage count
    if (appliedCouponId) {
      await prisma.coupon.update({
        where: { id: appliedCouponId },
        data: { usedCount: { increment: 1 } }
      });
    }

    // --- CASE: 100% DISCOUNT (FREE) ---
    if (isFree) {
      revalidatePath("/admin/tournaments");
      return { url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-status?id=${registration.id}&gateway=free` };
    }

    // --- CASE: STRIPE FLOW ---
    if (method === "stripe") {
      const session = await stripe.checkout.sessions.create({
        customer_email: email,
        payment_method_types: ["card"],
        line_items: [{
          price_data: {
            currency: "hkd",
            product_data: { 
              name: tournament.title, 
              description: `Participant: ${playerName}${couponCode ? ' (Coupon Applied)' : ''}` 
            },
            unit_amount: finalEntryFee,
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

    // --- CASE: ASIAPAY FLOW ---
    if (method === "asiapay") {
      const amountStr = (finalEntryFee / 100).toFixed(2); // Convert cents to "XX.XX"
      const currCode = "344"; // HKD

      const timestampSuffix = Date.now().toString().slice(-5);
      const gatewayOrderRef = `${registration.id.slice(0, 29)}-${timestampSuffix}`.slice(0, 35);

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

      const redirectUrl = `${process.env.ASIAPAY_PAYMENT_URL}?${params.toString()}`;
      return { url: redirectUrl };
    }

    throw new Error("Invalid payment method.");
  } catch (error) {
    console.error("Registration error:", error);
    return { error: "Failed to process registration. Please try again." };
  }
}