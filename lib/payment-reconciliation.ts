import cron from "node-cron";
import { PrismaClient } from "@prisma/client";
import { verifyAsiaPayPayment } from "./verify-asiapay";

const prisma = new PrismaClient();

cron.schedule("* * * * *", async () => {
  console.log("Checking pending payments...");

  const pendingPayments =
    await prisma.registration.findMany({
      where: {
        status: "PENDING",
        paymentGateway: "asiapay",
      },
      include: {
        tournament: true,
      },
    });

  for (const payment of pendingPayments) {
    try {
      const verification =
        await verifyAsiaPayPayment(
          payment.id,
          String(payment.tournament.entryFee)
        );

      if (verification.success) {
        await prisma.registration.update({
          where: {
            id: payment.id,
          },
          data: {
            status: "COMPLETED",
          },
        });

        console.log(
          `✅ Updated ${payment.id}`
        );
      }
    } catch (error) {
      console.error(error);
    }
  }
});