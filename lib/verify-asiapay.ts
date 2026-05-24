import crypto from "crypto";

export async function verifyAsiaPayPayment(
  ref: string,
  amount: string
) {
  try {
    const merchantId =
      process.env.ASIAPAY_MERCHANT_ID!;

    const secret =
      process.env.ASIAPAY_SECURE_HASH_SECRET!;

    const secureHash = crypto
      .createHash("sha1")
      .update(
        `${merchantId}|${ref}|${amount}|${secret}`
      )
      .digest("hex");

    /**
     * PAYDOLLAR QUERY API
     */

    const response = await fetch(
      "https://www.paydollar.com/b2c2/eng/query/query.jsp",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          merchantId,
          ref,
          secureHash,
        }),
      }
    );

    const text = await response.text();

    console.log("AsiaPay Query Response:", text);

    /**
     * SUCCESS CHECK
     */

    if (
      text.includes("successcode=0")
    ) {
      return {
        success: true,
      };
    }

    return {
      success: false,
    };
  } catch (error) {
    console.error(
      "AsiaPay Verify Error:",
      error
    );

    return {
      success: false,
    };
  }
}