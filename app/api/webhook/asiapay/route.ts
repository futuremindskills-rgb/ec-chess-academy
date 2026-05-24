// api/webhooks/asiapay/route.ts

import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    /* -------------------------------------------------------------------------- */
    /*                                  RAW BODY                                  */
    /* -------------------------------------------------------------------------- */

    const raw = await req.text();

    console.log("🟡 RAW WEBHOOK BODY:", raw);

    const params = new URLSearchParams(raw);

    const payload = Object.fromEntries(params);

    console.log("🟡 ASIAPAY WEBHOOK PAYLOAD:", payload);

    /* -------------------------------------------------------------------------- */
    /*                              EXTRACT FIELDS                                */
    /* -------------------------------------------------------------------------- */

    const successCode =
      params.get("successcode") || "";

    const ref =
      params.get("Ref") || "";

    const payRef =
      params.get("PayRef") || "";

    const amt =
      params.get("Amt") || "";

    const cur =
      params.get("Cur") || "";

    const src =
      params.get("src") || "";

    const prc =
      params.get("prc") || "";

    const bank =
      params.get("bank") || "";

    const incomingHash =
      params.get("secureHash") || "";

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

    /**
     * AsiaPay Hash Format:
     *
     * src|prc|successcode|Ref|PayRef|Cur|Amt|bank|Secret
     */

    const secret =
      process.env
        .ASIAPAY_SECURE_HASH_SECRET?.trim() || "";

    const verifyString =
      `${src}|${prc}|${successCode}|${ref}|${payRef}|${cur}|${amt}|${bank}|${secret}`;

    const calculatedHash = crypto
      .createHash("sha1")
      .update(verifyString)
      .digest("hex");

    console.log(
      "🟡 Incoming Hash:",
      incomingHash
    );

    console.log(
      "🟡 Calculated Hash:",
      calculatedHash
    );

    console.log(
      "🟡 Verify String:",
      verifyString
    );

    /**
     * IMPORTANT:
     * AsiaPay sometimes sends uppercase hash
     */

    const isValidHash =
      incomingHash.toLowerCase() ===
      calculatedHash.toLowerCase();

    if (!isValidHash) {
      console.error(
        "❌ INVALID ASIAPAY HASH"
      );

      /**
       * IMPORTANT:
       * Return 200 anyway
       */

      return new Response("OK", {
        status: 200,
      });
    }

    /* -------------------------------------------------------------------------- */
    /*                        EXTRACT REGISTRATION ID                             */
    /* -------------------------------------------------------------------------- */

    /**
     * Example Ref:
     *
     * cmpjgfa7u0003l504jx82rkrz-12797
     *
     * Registration ID:
     *
     * cmpjgfa7u0003l504jx82rkrz
     */

    const lastDashIndex =
      ref.lastIndexOf("-");

    if (lastDashIndex === -1) {
      console.error(
        "❌ INVALID REF FORMAT:",
        ref
      );

      return new Response("OK", {
        status: 200,
      });
    }

    const registrationId =
      ref.substring(0, lastDashIndex);

    console.log(
      "🟢 REGISTRATION ID:",
      registrationId
    );

    /* -------------------------------------------------------------------------- */
    /*                         FIND REGISTRATION                                  */
    /* -------------------------------------------------------------------------- */

    const existingRegistration =
      await prisma.registration.findUnique({
        where: {
          id: registrationId,
        },
      });

    if (!existingRegistration) {
      console.error(
        "❌ REGISTRATION NOT FOUND:",
        registrationId
      );

      return new Response("OK", {
        status: 200,
      });
    }

    console.log(
      "🟡 CURRENT STATUS:",
      existingRegistration.status
    );

    /* -------------------------------------------------------------------------- */
    /*                     PREVENT DUPLICATE PROCESSING                           */
    /* -------------------------------------------------------------------------- */

    if (
      existingRegistration.status ===
      "COMPLETED"
    ) {
      console.log(
        "✅ PAYMENT ALREADY COMPLETED"
      );

      return new Response("OK", {
        status: 200,
      });
    }

    /* -------------------------------------------------------------------------- */
    /*                            PAYMENT SUCCESS                                 */
    /* -------------------------------------------------------------------------- */

    if (successCode === "0") {
      await prisma.registration.update({
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
        `✅ PAYMENT SUCCESS: ${registrationId}`
      );
    }

    /* -------------------------------------------------------------------------- */
    /*                             PAYMENT FAILED                                 */
    /* -------------------------------------------------------------------------- */

    else {
      await prisma.registration.update({
        where: {
          id: registrationId,
        },
        data: {
          status: "FAILED",
          paymentGateway: "asiapay",
        },
      });

      console.log(
        `❌ PAYMENT FAILED: ${registrationId}`
      );
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

    /**
     * IMPORTANT:
     * Always return 200
     * otherwise AsiaPay retries forever
     */

    return new Response("OK", {
      status: 200,
    });
  }
}