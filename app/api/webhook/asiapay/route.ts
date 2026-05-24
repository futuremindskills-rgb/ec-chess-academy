// api/webhooks/asiapay/route.ts

import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    /* -------------------------------------------------------------------------- */
    /*                                RAW BODY                                     */
    /* -------------------------------------------------------------------------- */

    const raw = await req.text();

    console.log("RAW WEBHOOK BODY:", raw);

    const params = new URLSearchParams(raw);

    console.log(
      "AsiaPay Webhook Payload:",
      Object.fromEntries(params)
    );

    /* -------------------------------------------------------------------------- */
    /*                             EXTRACT FIELDS                                  */
    /* -------------------------------------------------------------------------- */

    const successCode = params.get("successcode");

    const ref = params.get("Ref") || "";

    const payRef = params.get("PayRef");

    const amt = params.get("Amt");

    const cur = params.get("Cur");

    const src = params.get("src");

    const prc = params.get("prc");

    const incomingHash = params.get("secureHash");

    const bank = params.get("bank") || "";

    /* -------------------------------------------------------------------------- */
    /*                              VERIFY HASH                                    */
    /* -------------------------------------------------------------------------- */

    const secret =
      process.env.ASIAPAY_SECURE_HASH_SECRET?.trim() || "";

    /**
     * AsiaPay Datafeed Hash Format:
     *
     * src|prc|successcode|Ref|PayRef|Cur|Amt|bank|Secret
     */

    const verifyStr =
      `${src}|${prc}|${successCode}|${ref}|${payRef}|${cur}|${amt}|${bank}|${secret}`;

    const calculatedHash = crypto
      .createHash("sha1")
      .update(verifyStr)
      .digest("hex");

    console.log("Incoming Hash:", incomingHash);

    console.log("Calculated Hash:", calculatedHash);

    console.log("Verify String:", verifyStr);

    /**
     * Compare lowercase because
     * AsiaPay may send uppercase hash
     */

    if (
      incomingHash?.toLowerCase() !==
      calculatedHash.toLowerCase()
    ) {
      console.error("❌ Invalid Hash Signature");

      return new Response("OK", {
        status: 200,
      });
    }

    /* -------------------------------------------------------------------------- */
    /*                        EXTRACT REGISTRATION ID                              */
    /* -------------------------------------------------------------------------- */

    /**
     * Example Ref:
     *
     * cmpjgfa7u0003l504jx82rkrz-12797
     *
     * Extract:
     *
     * cmpjgfa7u0003l504jx82rkrz
     */

    const registrationId =
      ref.substring(0, ref.lastIndexOf("-"));

    console.log(
      "Registration ID:",
      registrationId
    );

    /* -------------------------------------------------------------------------- */
    /*                         INVALID REGISTRATION ID                             */
    /* -------------------------------------------------------------------------- */

    if (!registrationId) {
      console.error(
        "❌ Invalid registration ID"
      );

      return new Response("OK", {
        status: 200,
      });
    }

    /* -------------------------------------------------------------------------- */
    /*                            PAYMENT SUCCESS                                  */
    /* -------------------------------------------------------------------------- */

    if (successCode === "0") {
      await prisma.registration.updateMany({
        where: {
          id: registrationId,
        },
        data: {
          status: "COMPLETED",
          transactionId: String(payRef),
          paymentGateway: "asiapay",
        },
      });

      console.log(
        `✅ Payment SUCCESS for ${registrationId}`
      );
    }

    /* -------------------------------------------------------------------------- */
    /*                             PAYMENT FAILED                                  */
    /* -------------------------------------------------------------------------- */

    else {
      await prisma.registration.updateMany({
        where: {
          id: registrationId,
        },
        data: {
          status: "FAILED",
          paymentGateway: "asiapay",
        },
      });

      console.log(
        `❌ Payment FAILED for ${registrationId}`
      );
    }

    /* -------------------------------------------------------------------------- */
    /*                            SUCCESS RESPONSE                                 */
    /* -------------------------------------------------------------------------- */

    return new Response("OK", {
      status: 200,
    });
  } catch (err) {
    console.error(
      "❌ AsiaPay Webhook Error:",
      err
    );

    /**
     * IMPORTANT:
     * Always return 200 to AsiaPay
     * so they don't continuously retry
     */

    return new Response("OK", {
      status: 200,
    });
  }
}