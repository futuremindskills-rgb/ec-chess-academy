import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import Stripe from "stripe";
import { Loader2, CheckCircle2, Clock, ArrowRight } from "lucide-react";

// Initialize clients
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const prisma = new PrismaClient();

export default async function PaymentStatusPage({
  searchParams,
}: {
  searchParams: {
    session_id?: string; // Stripe
    id?: string;         // AsiaPay Registration ID
    gateway?: string;    // "stripe" or "asiapay"
    error?: string;
  };
}) {
  const { session_id, id, gateway, error } = searchParams;

  // 1. Handle explicit errors
  if (error === "true") {
    redirect("/tournaments?status=failed");
  }

  let registration: any = null;

  try {
    // --- BRANCH 1: STRIPE ---
    if (gateway === "stripe" && session_id) {
      const session = await stripe.checkout.sessions.retrieve(session_id);
      if (session.payment_status !== "paid") redirect("/tournaments");

      const registrationId = session.metadata?.registrationId;
      if (!registrationId) redirect("/tournaments");

      registration = await prisma.registration.update({
        where: { id: registrationId },
        data: { status: "COMPLETED", stripeSessionId: session.id },
        include: { tournament: true },
      });
    }
    // --- BRANCH 2: ASIAPAY ---
    else if (gateway === "asiapay" && id) {
      registration = await prisma.registration.findUnique({
        where: { id: id },
        include: { tournament: true },
      });

      if (!registration) redirect("/tournaments");

      // RACE CONDITION HANDLING:
      // If AsiaPay hasn't sent the webhook yet, the status is still PENDING.
      // We show a loading state and refresh the page automatically.
      if (registration.status === "PENDING") {
        return (
          <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6 font-sans">
            <meta httpEquiv="refresh" content="3" /> 
            <div className="bg-white p-8 md:p-12 rounded-[40px] border-4 border-black text-center shadow-[12px_12px_0px_#000] max-w-lg w-full">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-100 text-indigo-600 rounded-3xl mb-6 border-4 border-indigo-200">
                <Loader2 className="w-10 h-10 animate-spin" />
              </div>
              <h1 className="text-3xl font-[1000] mb-2 text-black uppercase tracking-tighter">
                Verifying Payment
              </h1>
              <p className="text-slate-500 font-bold text-sm uppercase mb-8">
                We are waiting for confirmation from AsiaPay. <br />
                This page will update automatically...
              </p>
              <div className="p-4 bg-slate-100 rounded-2xl border-2 border-dashed border-slate-300 font-mono text-[10px] text-slate-400">
                REF: {id}
              </div>
            </div>
          </div>
        );
      }

      // If AsiaPay failed
      if (registration.status === "FAILED") {
        redirect("/tournaments?status=failed");
      }
    } else {
      redirect("/tournaments");
    }
  } catch (err) {
    console.error("Payment Status Error:", err);
    redirect("/tournaments");
  }

  // --- SUCCESS UI (Common for both Stripe and Completed AsiaPay) ---
  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-600 p-6 font-sans">
      <div className="bg-white p-8 md:p-12 rounded-[40px] border-4 border-black text-center shadow-[12px_12px_0px_#000] max-w-lg w-full">
        
        <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl mb-6 border-4 border-emerald-200">
           <CheckCircle2 className="w-10 h-10" />
        </div>

        <h1 className="text-4xl font-[1000] mb-2 text-black uppercase tracking-tighter">
          Registration <br/>Successful
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
            <span className="text-slate-400 text-[10px] font-black uppercase">Player</span>
            <span className="font-black text-sm uppercase text-black">{registration.playerName}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400 text-[10px] font-black uppercase">Category</span>
            <span className="font-black text-sm uppercase text-black">{registration.studentCategory}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400 text-[10px] font-black uppercase">Method</span>
            <span className="font-black text-[10px] uppercase bg-white px-2 py-1 rounded border-2 border-black text-black">
              {gateway === 'stripe' ? '💳 Stripe' : '🌏 AsiaPay / Local'}
            </span>
          </div>

          <div className="mt-4 pt-4 border-t-2 border-slate-200">
            <p className="text-[9px] text-slate-400 font-mono break-all text-center uppercase tracking-tighter">
              Ref: {registration.id}
            </p>
          </div>
        </div>

        <div className="space-y-4">
            <a
            href="/tournaments"
            className="flex items-center justify-center gap-2 w-full bg-black text-white px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-indigo-600 transition-all shadow-[4px_4px_0px_#4f46e5] active:translate-y-1 active:shadow-none"
            >
            Back to Events <ArrowRight size={16} />
            </a>
        </div>
      </div>
    </div>
  );
}