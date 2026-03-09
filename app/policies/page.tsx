"use client";

import React from "react";
import { ShieldCheck, RefreshCcw, FileText, AlertTriangle, Scale, Lock } from "lucide-react";
import { motion } from "framer-motion";

export default function PolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      {/* Header Area */}
      <section className="bg-slate-900 text-white py-20 px-6 border-b-8 border-indigo-600">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-5xl md:text-7xl font-[1000] uppercase tracking-tighter mb-4">
            Legal <span className="text-indigo-400">&</span> Policies
          </h1>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs md:text-sm">
            EC Chess Academy Hong Kong • Effective from March 2024
          </p>
        </div>
      </section>

      <div className="container mx-auto max-w-5xl px-6 -mt-10">
        <div className="grid grid-cols-1 gap-12">
          
          {/* 1. REFUND & CANCELLATION POLICY */}
          <PolicySection 
            icon={<RefreshCcw className="text-orange-500" />}
            title="Refund & Cancellation Policy"
            subtitle="退款及取消政策"
          >
            <div className="space-y-4 text-slate-700">
              <p className="font-bold text-slate-900 underline">Tournaments (e.g., Joyous Cup):</p>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Once the registration fee is paid, no refunds will be issued for student withdrawals or "no-shows" under any circumstances.</li>
                <li>Refunds or rescheduling will <strong>only</strong> occur if the tournament is cancelled by EC Chess Academy or due to Government "Extreme Conditions."</li>
                <li><strong>Weather Policy:</strong> If Typhoon Signal No. 8 or above, or a Black Rainstorm Warning is in effect 2 hours before the start, the event will be postponed. Fees are non-refundable but valid for the rescheduled date.</li>
                <li>If Typhoon Signal No. 3 or Red/Yellow Rainstorm is in effect, competitions proceed as scheduled.</li>
              </ul>
              
              <p className="font-bold text-slate-900 underline mt-6">Regular Courses:</p>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Tuition fees must be paid in full before the first lesson.</li>
                <li>Requests for sick leave must be accompanied by a medical certificate to qualify for a make-up class. No cash refunds are provided for missed classes.</li>
              </ul>
            </div>
          </PolicySection>

          {/* 2. PRIVACY POLICY */}
          <PolicySection 
            icon={<ShieldCheck className="text-emerald-500" />}
            title="Privacy Policy"
            subtitle="個人資料收集聲明"
          >
            <p className="text-sm text-slate-600 mb-4 italic">
              In accordance with the Personal Data (Privacy) Ordinance (Chapter 486) of Hong Kong.
            </p>
            <div className="space-y-4 text-slate-700 text-sm">
              <p><strong>Data Collection:</strong> We collect student names, dates of birth, school info, and parent contact details (phone/email) solely for enrollment, grading certificates (China Chess Association), and communication.</p>
              <p><strong>WhatsApp Groups:</strong> By registering, you agree to your phone number being added to competition-specific WhatsApp groups for real-time pairings and announcements.</p>
              <p><strong>Photography/Media:</strong> EC Chess Academy reserves the right to take photographs or videos during classes and tournaments for promotional purposes on our website and social media. If you wish to opt-out, please notify us in writing.</p>
              <p><strong>Data Access:</strong> You have the right to request access to and correction of your personal data by contacting our Data Protection Officer at 2838-6698.</p>
            </div>
          </PolicySection>

          {/* 3. TERMS & CONDITIONS */}
          <PolicySection 
            icon={<Scale className="text-indigo-600" />}
            title="Terms & Conditions"
            subtitle="服務條款"
          >
            <div className="space-y-6 text-sm text-slate-700">
              <div>
                <h4 className="font-black text-slate-900 uppercase mb-1">1. Integrity of Skill Level</h4>
                <p>Players must register for their correct age group and skill level (Dan/Grade). Misrepresentation of skill to compete in lower divisions ("Sandbagging") will result in immediate disqualification without refund.</p>
              </div>
              <div>
                <h4 className="font-black text-slate-900 uppercase mb-1">2. Conduct & Discipline</h4>
                <p>We maintain a zero-tolerance policy for cheating, use of electronic devices during games, or parental interference. The Chief Arbiter’s decision is final and binding.</p>
              </div>
              <div>
                <h4 className="font-black text-slate-900 uppercase mb-1">3. Liability</h4>
                <p>EC Chess Academy and the venue providers (e.g., Pentecostal Holiness Church Wing Kwong Primary School) are not responsible for any personal injury or loss of property occurring on the premises.</p>
              </div>
              <div>
                <h4 className="font-black text-slate-900 uppercase mb-1">4. Certificate Application</h4>
                <p>Applications for China Chess Association (CUA) certificates are optional and require additional fees. Applicants must hold a valid HKID or Passport.</p>
              </div>
            </div>
          </PolicySection>

        </div>

        {/* Contact Footer */}
        <div className="mt-16 p-10 bg-white border-4 border-slate-900 rounded-[40px] shadow-[10px_10px_0px_#000] text-center">
            <h3 className="text-2xl font-black uppercase mb-4">Questions regarding our policies?</h3>
            <p className="text-slate-500 font-bold uppercase text-xs tracking-widest mb-6">Contact our Hong Kong Office</p>
            <div className="flex flex-col md:flex-row justify-center gap-8">
                <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase">Phone / WhatsApp</p>
                    <p className="font-black text-indigo-600">2838-6698 / 6850-5091</p>
                </div>
                <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase">Address</p>
                    <p className="font-black">薈學坊 3 樓 B 室, Prince Edward Road West</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

function PolicySection({ icon, title, subtitle, children }: { icon: any, title: string, subtitle: string, children: any }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white border-4 border-slate-900 rounded-[40px] p-8 md:p-12 shadow-[12px_12px_0px_#cbd5e1]"
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center border-2 border-slate-200">
          {React.cloneElement(icon, { size: 28 })}
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-[1000] uppercase tracking-tighter leading-none">{title}</h2>
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-1">{subtitle}</p>
        </div>
      </div>
      <div className="border-t-2 border-slate-100 pt-8">
        {children}
      </div>
    </motion.div>
  );
}