import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    // 1. AsiaPay sends data as Form Data, not JSON. 
    // This is the biggest difference from Stripe.
    const formData = await req.formData();
    
    // Extract AsiaPay fields
    const successCode = formData.get("successcode"); // "0" = Success, "1" = Fail
    const ref = formData.get("Ref");                // This is your Registration ID
    const payRef = formData.get("payRef");          // AsiaPay's Transaction ID
    const amt = formData.get("amt");
    const cur = formData.get("cur");

    console.log(`[AsiaPay Webhook] Ref: ${ref}, Success: ${successCode}, PayRef: ${payRef}`);

    if (!ref) {
      return new NextResponse("Missing Reference ID", { status: 400 });
    }

    // --- CASE 1: PAYMENT SUCCESSFUL ---
    if (successCode === "0") {
      try {
        await prisma.registration.update({
          where: { id: String(ref) },
          data: {
            status: "COMPLETED",
            // Store AsiaPay's transaction ID for tracking
            transactionId: String(payRef), 
          },
        });
        console.log(`✅ AsiaPay Registration ${ref} confirmed and paid.`);
      } catch (dbError) {
        console.error("Database Update Error (AsiaPay):", dbError);
        return new NextResponse("Database Error", { status: 500 });
      }
    } 
    
    // --- CASE 2: PAYMENT FAILED ---
    else if (successCode === "1" || successCode === "2") {
      try {
        await prisma.registration.update({
          where: { id: String(ref) },
          data: { status: "FAILED" },
        });
        console.log(`❌ AsiaPay Registration ${ref} marked as FAILED.`);
      } catch (dbError) {
        console.error("Database Update Error (AsiaPay):", dbError);
      }
    }

    // AsiaPay requires an "OK" response to acknowledge the datafeed
    return new Response("OK", { status: 200 });

  } catch (err: any) {
    console.error("❌ AsiaPay Webhook Handler Error:", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 500 });
  }
}