import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import Stripe from "stripe";
import {
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY as string
);

const prisma = new PrismaClient();

export default async function PaymentStatusPage({
  searchParams,
}: {
  searchParams: {
    session_id?: string;
    id?: string;
    gateway?: string;
    error?: string;
    successcode?: string;
    PayRef?: string;
  };
}) {
  const {
    session_id,
    id,
    gateway,
    error,
    successcode,
    PayRef,
  } = searchParams;

  /* -------------------------------------------------------------------------- */
  /*                                  ERROR                                     */
  /* -------------------------------------------------------------------------- */

  if (error === "true") {
    redirect("/tournaments?status=failed");
  }

  let registration: any = null;

  try {
    /* -------------------------------------------------------------------------- */
    /*                                   STRIPE                                   */
    /* -------------------------------------------------------------------------- */

    if (gateway === "stripe" && session_id) {
      const session =
        await stripe.checkout.sessions.retrieve(
          session_id
        );

      if (session.payment_status !== "paid") {
        redirect("/tournaments?status=failed");
      }

      const registrationId =
        session.metadata?.registrationId;

      if (!registrationId) {
        redirect("/tournaments");
      }

      registration = await prisma.registration.update({
        where: {
          id: registrationId,
        },
        data: {
          status: "COMPLETED",
          stripeSessionId: session.id,
          paymentGateway: "stripe",
        },
        include: {
          tournament: true,
        },
      });
    }

    /* -------------------------------------------------------------------------- */
    /*                                  ASIAPAY                                   */
    /* -------------------------------------------------------------------------- */

    else if (gateway === "asiapay" && id) {
  registration =
    await prisma.registration.findUnique({
      where: {
        id,
      },
      include: {
        tournament: true,
      },
    });

  if (!registration) {
    redirect("/tournaments");
  }

  console.log("ASIAPAY RETURN:", {
    successcode,
    PayRef,
  });

  // Give webhook a moment if callback is still processing
  if (registration.status === "PENDING") {
    await new Promise((resolve) =>
      setTimeout(resolve, 1500)
    );

    registration =
      await prisma.registration.findUnique({
        where: {
          id,
        },
        include: {
          tournament: true,
        },
      });
  }

  if (
  !registration ||
  registration.status !== "COMPLETED"
) {
  redirect("/tournaments?status=pending");
}
}

    /* -------------------------------------------------------------------------- */
    /*                              INVALID REQUEST                                */
    /* -------------------------------------------------------------------------- */

    else {
      redirect("/tournaments");
    }
  } catch (error) {
    console.error(
      "Payment Status Error:",
      error
    );

    redirect("/tournaments?status=failed");
  }

  /* -------------------------------------------------------------------------- */
  /*                               SUCCESS UI                                    */
  /* -------------------------------------------------------------------------- */

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-600 p-6 font-sans">
      <div className="bg-white p-8 md:p-12 rounded-[40px] border-4 border-black text-center shadow-[12px_12px_0px_#000] max-w-lg w-full">

        <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl mb-6 border-4 border-emerald-200">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <h1 className="text-4xl font-[1000] mb-2 text-black uppercase tracking-tighter">
          Registration <br />
          Successful
        </h1>

        <div className="my-8 py-6 border-y-4 border-dashed border-slate-100">
          <p className="text-slate-400 uppercase text-[10px] font-black tracking-[0.2em] mb-2">
            Tournament Entry Confirmed
          </p>

          <h2 className="text-2xl md:text-3xl font-[1000] text-indigo-600 leading-tight uppercase">
            {registration.tournament?.title}
          </h2>
        </div>

        <div className="bg-slate-50 p-6 rounded-[24px] border-4 border-black text-left mb-8 space-y-3">

          <div className="flex justify-between items-center">
            <span className="text-slate-400 text-[10px] font-black uppercase">
              Player
            </span>

            <span className="font-black text-sm uppercase text-black">
              {registration.playerName}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-slate-400 text-[10px] font-black uppercase">
              Category
            </span>

            <span className="font-black text-sm uppercase text-black">
              {registration.studentCategory}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-slate-400 text-[10px] font-black uppercase">
              Method
            </span>

            <span className="font-black text-[10px] uppercase bg-white px-2 py-1 rounded border-2 border-black text-black">
              {gateway === "stripe"
                ? "💳 Stripe"
                : "🌏 AsiaPay / Local"}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-slate-400 text-[10px] font-black uppercase">
              Status
            </span>

           <span className="font-black text-[10px] uppercase bg-emerald-100 text-emerald-700 px-2 py-1 rounded border-2 border-emerald-300">
  {registration.status}
</span>
          </div>

          {registration.transactionId && (
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-[10px] font-black uppercase">
                Transaction
              </span>

              <span className="font-black text-[10px] uppercase text-black">
                {registration.transactionId}
              </span>
            </div>
          )}

          <div className="mt-4 pt-4 border-t-2 border-slate-200">
            <p className="text-[9px] text-slate-400 font-mono break-all text-center uppercase tracking-tighter">
              Ref: {registration.id}
            </p>
          </div>
        </div>

        <a
          href="/tournaments"
          className="flex items-center justify-center gap-2 w-full bg-black text-white px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-indigo-600 transition-all shadow-[4px_4px_0px_#4f46e5] active:translate-y-1 active:shadow-none"
        >
          Back to Events
          <ArrowRight size={16} />
        </a>
      </div>
    </div>
  );
}