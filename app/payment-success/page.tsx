import { Trophy, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-indigo-600 flex items-center justify-center p-6 font-sans">
      <div className="bg-white border-8 border-slate-900 rounded-[48px] p-12 max-w-xl w-full shadow-[20px_20px_0px_#000] text-center">
        <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 size={60} />
        </div>
        
        <h1 className="text-4xl font-[1000] uppercase tracking-tighter mb-4 text-slate-900 leading-none">
          Registration <span className="text-indigo-600">Complete!</span>
        </h1>
        
        <p className="font-bold text-slate-500 uppercase text-[10px] tracking-widest mb-10 leading-relaxed">
          Your payment was processed successfully. You are now officially enrolled in the 2026 學界棋藝冠軍賽. 
          A confirmation email will be sent to your provided address.
        </p>

        <div className="bg-slate-50 border-4 border-slate-900 rounded-[32px] p-6 mb-10 flex items-center gap-6">
            <Trophy className="text-orange-500 shrink-0" size={40} />
            <div className="text-left">
                <p className="font-black text-[10px] uppercase text-slate-400">Entry Status</p>
                <p className="font-black text-xl uppercase text-slate-900 tracking-tight">Payment Verified ✅</p>
            </div>
        </div>

        <Link href="/tournaments" className="inline-flex items-center gap-3 px-10 py-5 bg-slate-900 text-white rounded-2xl font-black uppercase text-xs hover:bg-indigo-600 transition-all shadow-lg active:translate-y-1">
          Back to Events <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}