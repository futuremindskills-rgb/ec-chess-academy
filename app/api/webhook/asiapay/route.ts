import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    // ✅ Read raw body (AsiaPay sends x-www-form-urlencoded)
    const raw = await req.text();
    const params = new URLSearchParams(raw);

    // ✅ Extract fields (CASE-SENSITIVE)
    const successCode = params.get("successcode"); // "0" = success
    const ref = params.get("Ref");                 // your order/registration ID
    const payRef = params.get("PayRef");           // AsiaPay transaction ID
    const amt = params.get("Amt");
    const cur = params.get("Cur");

    console.log("📩 AsiaPay Webhook:", {
      ref,
      successCode,
      payRef,
      amt,
      cur,
    });

    // ❌ NEVER return non-200 to AsiaPay
    if (!ref) {
      console.error("❌ Missing Ref");
      return new Response("OK", { status: 200 });
    }

    // ✅ SUCCESS CASE
    if (successCode === "0") {
      await prisma.registration.updateMany({
        where: {
          id: String(ref),
          status: { not: "COMPLETED" }, // idempotent
        },
        data: {
          status: "COMPLETED",
          transactionId: String(payRef),
        },
      });

      console.log(`✅ Payment SUCCESS for ${ref}`);
    }

    // ❌ FAILED / CANCELLED
    else if (successCode === "1" || successCode === "2") {
      await prisma.registration.updateMany({
        where: { id: String(ref) },
        data: { status: "FAILED" },
      });

      console.log(`❌ Payment FAILED for ${ref}`);
    }

    // ✅ REQUIRED RESPONSE
    return new Response("OK", { status: 200 });

  } catch (err) {
    console.error("❌ Webhook Error:", err);

    // ⚠️ Still return 200 (AsiaPay requirement)
    return new Response("OK", { status: 200 });
  }
}