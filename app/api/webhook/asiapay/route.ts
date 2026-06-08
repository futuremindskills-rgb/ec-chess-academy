// app/api/webhook/asiapay/route.ts

import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    console.log("🚀 ASIAPAY WEBHOOK HIT");

    /* -------------------------------------------------------------------------- */
    /*                                  RAW BODY                                  */
    /* -------------------------------------------------------------------------- */

    const raw = await req.text();

    console.log("🟡 ASIAPAY WEBHOOK RAW:");
    console.log(raw);

    const params = new URLSearchParams(raw);

    const payload = Object.fromEntries(params.entries());

    console.log("🟡 ASIAPAY PAYLOAD:", payload);

    /* -------------------------------------------------------------------------- */
    /*                              EXTRACT FIELDS                                */
    /* -------------------------------------------------------------------------- */

    const successCode = params.get("successcode") || "";
    const ref = params.get("Ref") || "";
    const payRef = params.get("PayRef") || "";
    const amt = params.get("Amt") || "";
    const cur = params.get("Cur") || "";
    const src = params.get("src") || "";
    const prc = params.get("prc") || "";
    const bank = params.get("bank") || "";
    const incomingHash = params.get("secureHash") || "";

    /* -------------------------------------------------------------------------- */
    /*                               VALIDATE REF                                 */
    /* -------------------------------------------------------------------------- */

    if (!ref) {
      console.error("❌ Missing Ref");

      return new Response("OK", {
        status: 200,
      });
    }

    /* -------------------------------------------------------------------------- */
    /*                               VERIFY HASH                                  */
    /* -------------------------------------------------------------------------- */

    const secret =
      process.env.ASIAPAY_SECURE_HASH_SECRET?.trim() || "";

    const verifyString =
      `${src}|${prc}|${successCode}|${ref}|${payRef}|${cur}|${amt}|${bank}|${secret}`;

    const calculatedHash = crypto
      .createHash("sha1")
      .update(verifyString)
      .digest("hex");

    console.log("🟡 Incoming Hash:", incomingHash);
    console.log("🟡 Calculated Hash:", calculatedHash);
    console.log("🟡 Verify String:", verifyString);

    const isValidHash =
      incomingHash.toLowerCase() ===
      calculatedHash.toLowerCase();

    if (!isValidHash) {
      console.error("❌ INVALID ASIAPAY HASH");

      return new Response("OK", {
        status: 200,
      });
    }

    /* -------------------------------------------------------------------------- */
    /*                        EXTRACT REGISTRATION ID                             */
    /* -------------------------------------------------------------------------- */

    const lastDashIndex = ref.lastIndexOf("-");

    if (lastDashIndex === -1) {
      console.error("❌ Invalid Ref Format:", ref);

      return new Response("OK", {
        status: 200,
      });
    }

    const registrationId = ref.substring(0, lastDashIndex);

    console.log("🟢 Registration ID:", registrationId);

    /* -------------------------------------------------------------------------- */
    /*                         FIND REGISTRATION                                  */
    /* -------------------------------------------------------------------------- */

    const registration =
      await prisma.registration.findUnique({
        where: {
          id: registrationId,
        },
      });

    if (!registration) {
      console.error(
        "❌ Registration Not Found:",
        registrationId
      );

      return new Response("OK", {
        status: 200,
      });
    }

    console.log(
      "🟡 Current Status:",
      registration.status
    );

    /* -------------------------------------------------------------------------- */
    /*                     PREVENT DUPLICATE PROCESSING                           */
    /* -------------------------------------------------------------------------- */

    if (registration.status === "COMPLETED") {
      console.log(
        "✅ Registration Already Completed"
      );

      return new Response("OK", {
        status: 200,
      });
    }

    /* -------------------------------------------------------------------------- */
    /*                            PAYMENT SUCCESS                                 */
    /* -------------------------------------------------------------------------- */

    if (successCode === "0") {
      await prisma.registration.updateMany({
        where: {
          id: registrationId,
          status: "PENDING",
        },
        data: {
          status: "COMPLETED",
          transactionId: String(payRef),
          paymentGateway: "asiapay",
        },
      });

      console.log(
        `✅ PAYMENT COMPLETED: ${registrationId}`
      );
    }

    /* -------------------------------------------------------------------------- */
    /*                          NON-SUCCESS STATUS                                */
    /* -------------------------------------------------------------------------- */

    else {
      console.log(
        `⚠️ Payment not successful. successcode=${successCode}`
      );

      // Do not mark FAILED automatically.
      // Some gateways send intermediate statuses.
    }

    /* -------------------------------------------------------------------------- */
    /*                              SUCCESS RESPONSE                              */
    /* -------------------------------------------------------------------------- */

    return new Response("OK", {
      status: 200,
    });
  } catch (error) {
    console.error(
      "❌ ASIAPAY WEBHOOK ERROR:",
      error
    );

    // Always return 200 so AsiaPay does not keep retrying

    return new Response("OK", {
      status: 200,
    });
  }
}