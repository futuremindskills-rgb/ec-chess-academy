// api/webhooks/asiapay/route.ts
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const raw = await req.text();
    const params = new URLSearchParams(raw);

    // 1. Extract fields
    const successCode = params.get("successcode");
    const ref = params.get("Ref") || ""; // e.g., "cluy1234...-88231"
    const payRef = params.get("PayRef");
    const amt = params.get("Amt");
    const cur = params.get("Cur");
    const src = params.get("src"); // Source return code
    const prc = params.get("prc"); // Bank return code
    const incomingHash = params.get("secureHash");

    // 2. Security: Verify Hash (Datafeed Hash sequence is different!)
    // Standard AsiaPay Datafeed Hash: src|prc|successcode|Ref|PayRef|Cur|Amt|bank|Secret
    // Note: 'bank' is often empty, check your AsiaPay dashboard for your specific hash sequence.
    const secret = process.env.ASIAPAY_SECURE_HASH_SECRET?.trim() || "";
    const bank = params.get("bank") || ""; 
    
    const verifyStr = `${src}|${prc}|${successCode}|${ref}|${payRef}|${cur}|${amt}|${bank}|${secret}`;
    const calculatedHash = crypto.createHash("sha1").update(verifyStr).digest("hex");

    if (incomingHash !== calculatedHash) {
      console.error("❌ Invalid Hash Signature. Potential fraud attempt.");
      return new Response("OK", { status: 200 }); // Still return 200
    }

    // 3. Logic: Extract the actual Database ID from the Ref
    // Since you appended "-timestamp", we split by the last hyphen
    const registrationId = ref.split("-")[0];

    if (successCode === "0") {
      await prisma.registration.update({
        where: { id: registrationId },
        data: {
          status: "COMPLETED",
          transactionId: String(payRef),
        },
      });
      console.log(`✅ Payment SUCCESS for ${registrationId}`);
    } else {
      await prisma.registration.update({
        where: { id: registrationId },
        data: { status: "FAILED" },
      });
      console.log(`❌ Payment FAILED for ${registrationId}`);
    }

    return new Response("OK", { status: 200 });
  } catch (err) {
    console.error("❌ Webhook Error:", err);
    return new Response("OK", { status: 200 });
  }
}