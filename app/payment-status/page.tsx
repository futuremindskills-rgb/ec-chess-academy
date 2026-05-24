import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import Stripe from "stripe";
import {
  Loader2,
  CheckCircle2,
  ArrowRight,
  AlertTriangle,
} from "lucide-react";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const prisma = new PrismaClient();

/* -------------------------------------------------------------------------- */
/*                         ASIAPAY VERIFY FUNCTION                             */
/* -------------------------------------------------------------------------- */

async function verifyAsiaPayPayment(registration: any) {
  try {
    /**
     * Replace this with REAL AsiaPay verification API
     *
     * Example:
     * const response = await fetch("ASIAPAY_VERIFY_URL", {...})
     */

    // TEMP MOCK:
    // If webhook already updated -> success
    if (registration.status === "COMPLETED") {
      return {
        success: true,
      };
    }

    return {
      success: false,
    };
  } catch (error) {
    console.error("AsiaPay Verify Error:", error);

    return {
      success: false,
    };
  }
}

export default async function PaymentStatusPage({
  searchParams,
}: {
  searchParams: {
    session_id?: string;
    id?: string;
    gateway?: string;
    error?: string;
  };
}) {
  const { session_id, id, gateway, error } = searchParams;

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
      const session = await stripe.checkout.sessions.retrieve(session_id);

      if (session.payment_status !== "paid") {
        redirect("/tournaments?status=failed");
      }

      const registrationId = session.metadata?.registrationId;

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
      registration = await prisma.registration.findUnique({
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

      /* ---------------------------------------------------------------------- */
      /*                    VERIFY DIRECTLY WITH ASIAPAY                         */
      /* ---------------------------------------------------------------------- */

      const verification = await verifyAsiaPayPayment(registration);

      /* ---------------------------------------------------------------------- */
      /*                    IF VERIFIED -> UPDATE DATABASE                       */
      /* ---------------------------------------------------------------------- */

      if (
        verification.success &&
        registration.status !== "COMPLETED"
      ) {
        registration = await prisma.registration.update({
          where: {
            id,
          },
          data: {
            status: "COMPLETED",
          },
          include: {
            tournament: true,
          },
        });
      }

      /* ---------------------------------------------------------------------- */
      /*                              FAILED                                     */
      /* ---------------------------------------------------------------------- */

      if (registration.status === "FAILED") {
        redirect("/tournaments?status=failed");
      }

      /* ---------------------------------------------------------------------- */
      /*                         STILL PENDING                                   */
      /* ---------------------------------------------------------------------- */

      if (registration.status === "PENDING") {
        const createdAt = new Date(registration.createdAt).getTime();

        const now = Date.now();

        const diffMinutes = (now - createdAt) / 1000 / 60;

        /* ------------------------------------------------------------------ */
        /*                  STUCK PENDING FOR TOO LONG                         */
        /* ------------------------------------------------------------------ */

        if (diffMinutes > 10) {
          return (
            <div className="min-h-screen flex items-center justify-center bg-red-50 p-6 font-sans">
              <div className="bg-white p-8 md:p-12 rounded-[40px] border-4 border-black text-center shadow-[12px_12px_0px_#000] max-w-lg w-full">
                
                <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 text-red-600 rounded-3xl mb-6 border-4 border-red-200">
                  <AlertTriangle className="w-10 h-10" />
                </div>

                <h1 className="text-3xl font-[1000] mb-4 text-black uppercase tracking-tighter">
                  Payment Verification Delayed
                </h1>

                <p className="text-slate-500 font-bold text-sm uppercase mb-8">
                  Your payment may still be successful.
                  <br />
                  Please contact support with your reference ID.
                </p>

                <div className="p-4 bg-slate-100 rounded-2xl border-2 border-dashed border-slate-300 font-mono text-[10px] text-slate-400 break-all">
                  REF: {id}
                </div>

                <a
                  href="/tournaments"
                  className="mt-8 flex items-center justify-center gap-2 w-full bg-black text-white px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-red-600 transition-all shadow-[4px_4px_0px_#dc2626] active:translate-y-1 active:shadow-none"
                >
                  Back to Events
                </a>
              </div>
            </div>
          );
        }

        /* ------------------------------------------------------------------ */
        /*                       NORMAL PENDING STATE                           */
        /* ------------------------------------------------------------------ */

        return (
          <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6 font-sans">
            
            <meta httpEquiv="refresh" content="5" />

            <div className="bg-white p-8 md:p-12 rounded-[40px] border-4 border-black text-center shadow-[12px_12px_0px_#000] max-w-lg w-full">
              
              <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-100 text-indigo-600 rounded-3xl mb-6 border-4 border-indigo-200">
                <Loader2 className="w-10 h-10 animate-spin" />
              </div>

              <h1 className="text-3xl font-[1000] mb-2 text-black uppercase tracking-tighter">
                Verifying Payment
              </h1>

              <p className="text-slate-500 font-bold text-sm uppercase mb-8">
                Waiting for confirmation from AsiaPay...
                <br />
                This page will refresh automatically.
              </p>

              <div className="p-4 bg-slate-100 rounded-2xl border-2 border-dashed border-slate-300 font-mono text-[10px] text-slate-400 break-all">
                REF: {id}
              </div>
            </div>
          </div>
        );
      }
    }

    /* -------------------------------------------------------------------------- */
    /*                              INVALID REQUEST                                */
    /* -------------------------------------------------------------------------- */

    else {
      redirect("/tournaments");
    }
  } catch (error) {
    console.error("Payment Status Error:", error);

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