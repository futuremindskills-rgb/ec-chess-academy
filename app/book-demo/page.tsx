"use client";
import React from "react";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Zap, 
  Clock, 
  Video, 
  Globe, 
  Users,
  Trophy,
  Target,
  Star,
  ArrowRight,
  ChevronRight
} from "lucide-react";
import DemoBanner from "@/components/ui/demoBanner";

export default function BookDemoPage() {
  return (
    <div className="bg-white font-sans overflow-x-hidden text-slate-900">
      
      <DemoBanner/>

      {/* --- 2. THE VALUE PROPOSITION --- */}
      <section className="py-16 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT: WHY TAKE A DEMO? */}
          <div className="lg:col-span-7 space-y-10">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <h2 className="text-4xl md:text-6xl font-[1000] tracking-tighter uppercase leading-[0.9]">
                Why take a <br/>
                <span className="text-orange-500 italic">Free Demo?</span>
              </h2>
              <div className="w-24 h-2.5 bg-orange-500 rounded-full" />
            </motion.div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {[
                { title: "Level Assessment", desc: "Discover your current skill level.", icon: <Target className="text-orange-500" /> },
                { title: "Live Style", desc: "Experience our teaching live.", icon: <Video className="text-purple-600" /> },
                { title: "Personal Roadmap", desc: "Get a custom growth plan.", icon: <Zap className="text-indigo-600" /> },
                { title: "Zero Commitment", desc: "Pure learning, no pressure.", icon: <ShieldCheck className="text-cyan-500" /> },
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-[32px] bg-slate-50 border-2 border-slate-100 hover:bg-white hover:border-orange-200 hover:shadow-2xl hover:shadow-orange-100 transition-all group"
                >
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-5 shadow-sm group-hover:rotate-6 transition-transform">
                    {React.cloneElement(item.icon, { size: 28 })}
                  </div>
                  <h4 className="text-xl font-[1000] uppercase tracking-tight mb-2">{item.title}</h4>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT: THE PROCESS (Vertical Timeline) */}
          <div className="lg:col-span-5 bg-indigo-50/50 p-8 md:p-12 rounded-[40px] border-2 border-indigo-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12">
                <Trophy size={120} className="text-indigo-600" />
            </div>
            
            <h3 className="text-2xl font-[1000] uppercase tracking-tighter mb-10 relative z-10">
              Your 45-Min <span className="text-indigo-600">Journey</span>
            </h3>

            <div className="space-y-8 relative z-10">
              {[
                { step: "01", title: "Skill Evaluation", desc: "Short assessment of tactical and positional awareness." },
                { step: "02", title: "Live Coaching", desc: "A deep dive into specific grandmaster concepts." },
                { step: "03", title: "Game Analysis", desc: "Reviewing mistakes and providing tips." },
                { step: "04", title: "Batch Guidance", desc: "Match-making with the perfect student group." },
              ].map((step, i) => (
                <div key={i} className="flex gap-5">
                  <span className="text-xl font-[1000] text-indigo-300 tabular-nums">{step.step}</span>
                  <div className="space-y-1">
                    <h4 className="font-black text-slate-900 uppercase tracking-tight text-sm">{step.title}</h4>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- 3. BOOKING FORM (The Master Module) --- */}
      <section className="py-16 md:py-28 bg-slate-50 relative overflow-hidden px-4">
        <div className="max-w-4xl mx-auto relative">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="relative"
          >
            {/* 3D Offset Background (Adaptive scaling) */}
            <div className="absolute inset-0 bg-slate-900 rounded-[35px] md:rounded-[60px] translate-x-2 translate-y-2 md:translate-x-4 md:translate-y-4" />

            {/* Main Form Container */}
            <div className="relative bg-white rounded-[35px] md:rounded-[60px] border-4 border-slate-900 p-6 sm:p-10 md:p-16 lg:p-20 overflow-hidden">
              
              {/* Form Header */}
              <div className="text-center mb-10 md:mb-14">
                <h2 className="text-4xl md:text-6xl font-[1000] text-slate-900 uppercase tracking-tighter leading-none mb-6">
                  Secure Your <span className="text-orange-500">Slot</span>
                </h2>
                
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
                  {[
                    { icon: <Clock size={14} />, text: "45 Minutes" },
                    { icon: <Video size={14} />, text: "Zoom / Meet" },
                    { icon: <Globe size={14} />, text: "English" },
                  ].map((chip, idx) => (
                    <span key={idx} className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full text-[9px] md:text-[11px] font-black uppercase tracking-widest text-slate-600">
                      {chip.icon} {chip.text}
                    </span>
                  ))}
                </div>
              </div>

              {/* Form Fields */}
              <form className="space-y-5 md:space-y-7">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7">
                  <div className="group">
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-4">Student Name</label>
                    <input type="text" placeholder="Full Name" className="w-full h-14 md:h-16 px-6 bg-slate-50 border-2 border-slate-100 rounded-2xl md:rounded-3xl focus:border-orange-500 focus:bg-white outline-none transition-all font-bold text-slate-900 placeholder:text-slate-300" />
                  </div>
                  <div className="group">
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-4">Age</label>
                    <input type="number" placeholder="Years" className="w-full h-14 md:h-16 px-6 bg-slate-50 border-2 border-slate-100 rounded-2xl md:rounded-3xl focus:border-orange-500 focus:bg-white outline-none transition-all font-bold text-slate-900 placeholder:text-slate-300" />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-4">Current Chess Level</label>
                  <div className="relative">
                    <select className="w-full h-14 md:h-16 px-6 bg-slate-50 border-2 border-slate-100 rounded-2xl md:rounded-3xl focus:border-purple-500 focus:bg-white outline-none appearance-none cursor-pointer font-bold text-slate-900">
                      <option>Beginner (Absolute Zero)</option>
                      <option>Novice (Knows movements)</option>
                      <option>Intermediate (Played Tournaments)</option>
                      <option>Advanced (FIDE Rated)</option>
                    </select>
                    <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 rotate-90 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7">
                  <div className="group">
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-4">WhatsApp Number</label>
                    <input type="tel" placeholder="+..." className="w-full h-14 md:h-16 px-6 bg-slate-50 border-2 border-slate-100 rounded-2xl md:rounded-3xl focus:border-indigo-500 focus:bg-white outline-none transition-all font-bold text-slate-900 placeholder:text-slate-300" />
                  </div>
                  <div className="group">
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-4">Preferred Slot</label>
                    <input type="datetime-local" className="w-full h-14 md:h-16 px-6 bg-slate-50 border-2 border-slate-100 rounded-2xl md:rounded-3xl focus:border-indigo-500 focus:bg-white outline-none transition-all font-bold text-slate-900" />
                  </div>
                </div>

                <button className="w-full py-6 md:py-8 bg-slate-900 text-white rounded-[25px] md:rounded-[35px] font-[1000] uppercase tracking-[0.2em] text-xs md:text-base shadow-2xl hover:bg-orange-500 hover:-translate-y-1 active:translate-y-0.5 active:scale-[0.98] transition-all flex items-center justify-center gap-4 mt-8 group">
                  Confirm Demo Slot 
                  <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </button>
              </form>
            </div>

            {/* FREE STICKER (Smart positioning) */}
            <motion.div 
               animate={{ rotate: [12, 8, 12] }}
               transition={{ duration: 4, repeat: Infinity }}
               className="absolute -top-6 -right-2 sm:-right-8 w-24 h-24 md:w-32 md:h-32 bg-yellow-400 rounded-full border-4 border-slate-900 shadow-2xl flex items-center justify-center z-30"
            >
               <div className="text-center leading-none">
                  <span className="text-[10px] md:text-xs font-black uppercase tracking-tighter">Cost</span>
                  <div className="text-3xl md:text-5xl font-[1000] text-slate-900 tracking-tighter">FREE</div>
               </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- 4. WHY EC CHESS (Visual Cards) --- */}
      <section className="py-20 md:py-32 container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <h2 className="text-4xl md:text-6xl font-[1000] text-slate-900 uppercase tracking-tighter leading-none mb-6">
            Why Choose <br className="sm:hidden"/> 
            <span className="text-indigo-600 underline decoration-cyan-400 decoration-8 underline-offset-8">EC Chess?</span>
          </h2>
          <p className="text-slate-500 font-bold uppercase text-[10px] md:text-xs tracking-[0.3em]">The Elite standard of coaching</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
           {[
             { title: "Structured Path", icon: <Target />, color: "bg-orange-50 text-orange-600", border: "hover:border-orange-200" },
             { title: "FIDE Methods", icon: <Trophy />, color: "bg-purple-50 text-purple-600", border: "hover:border-purple-200" },
             { title: "Tournament Prep", icon: <Star />, color: "bg-cyan-50 text-cyan-600", border: "hover:border-cyan-200" },
             { title: "1-on-1 Coaching", icon: <Users />, color: "bg-indigo-50 text-indigo-600", border: "hover:border-indigo-200" },
           ].map((item, i) => (
             <motion.div 
               key={i} 
               whileHover={{ y: -10 }}
               className={`p-6 md:p-10 rounded-[40px] ${item.color} ${item.border} flex flex-col items-center text-center gap-4 md:gap-6 border-2 border-transparent transition-all cursor-default`}
             >
               <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                  {React.cloneElement(item.icon, { size: 32 })}
               </div>
               <span className="font-black uppercase tracking-tighter text-sm md:text-xl leading-tight">{item.title}</span>
             </motion.div>
           ))}
        </div>
      </section>

      {/* --- 5. FINAL URGENCY CTA --- */}
      <section className="pb-20 md:pb-32 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto bg-slate-900 rounded-[40px] md:rounded-[70px] p-10 md:p-20 text-center relative overflow-hidden border-4 border-slate-900 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]">
          {/* Decorative Elements */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-indigo-500/20 rounded-full blur-[100px]" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-orange-500/20 rounded-full blur-[100px]" />
          
          <div className="relative z-10 space-y-8">
            <h3 className="text-4xl md:text-7xl font-[1000] text-white tracking-tighter uppercase leading-[0.85]">
              Limited <span className="text-orange-400 italic">Slots</span> <br/> 
              Available Monthly
            </h3>
            <p className="text-slate-400 font-bold max-w-lg mx-auto uppercase text-[10px] md:text-xs tracking-[0.2em] leading-relaxed">
              We maintain small batch sizes and strictly limit demo classes to ensure focused attention.
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 md:px-16 py-6 md:py-8 bg-orange-500 text-white rounded-[20px] md:rounded-[30px] font-[1000] uppercase tracking-widest text-xs md:text-sm hover:bg-white hover:text-slate-900 transition-all shadow-2xl"
            >
              Claim Your Free Demo
            </motion.button>
          </div>
        </div>
      </section>

    </div>
  );
}