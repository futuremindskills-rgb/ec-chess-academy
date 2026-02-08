"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { 
  Trophy, 
  Calendar, 
  Clock, 
  MapPin, 
  ChevronRight, 
  Zap, 
  Target, 
  ShieldCheck, 
  Star,
  Users,
  Loader2,
  DollarSign,
  X,
  User,
  Mail,
  Phone
} from "lucide-react";
import Link from "next/link";
import TournamentBanner from "@/components/ui/tournamentBanner";
import { getTournaments } from "@/app/actions/adminActions";
import { registerForTournament } from "@/app/actions/tournamentActions";

export default function TournamentsPage() {
  const [tournaments, setTournaments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Registration Modal State
  const [selectedTournament, setSelectedTournament] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getTournaments();
        setTournaments(data);
      } catch (error) {
        console.error("Failed to fetch tournaments:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      const result = await registerForTournament(formData);
      if (result?.url) {
        // Redirect the user to Stripe Checkout
        window.location.href = result.url;
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  const displayTournaments = tournaments.filter(t => t.status !== "CANCELLED");

  return (
    <div className="bg-white font-sans overflow-x-hidden text-slate-900">
      
      <TournamentBanner/>

      {/* --- 1. TOURNAMENT LISTING --- */}
      <section className="py-12 md:py-24 container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 md:mb-16 gap-6">
           <div>
              <h2 className="text-3xl md:text-5xl font-[1000] uppercase tracking-tighter leading-tight">
                Upcoming <span className="text-indigo-600 underline decoration-indigo-100 decoration-4 md:decoration-8 underline-offset-4 md:underline-offset-8">Events</span>
              </h2>
              <p className="text-slate-400 font-black uppercase text-[10px] tracking-widest mt-4">
                {displayTournaments.length} Championships Available in Hong Kong
              </p>
           </div>
        </div>

        {loading ? (
          <div className="flex flex-col justify-center items-center py-20 gap-4">
            <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
            <p className="font-bold text-slate-400 uppercase tracking-widest text-xs">Accessing Championship Data...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-12">
            <AnimatePresence mode="popLayout">
              {displayTournaments.length > 0 ? (
                displayTournaments.map((t) => (
                  <motion.div 
                    key={t.id} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -8 }} 
                    className="relative group h-full"
                  >
                    <div className="absolute inset-0 bg-[#0f172a] rounded-[32px] md:rounded-[40px] translate-x-2 translate-y-2 md:translate-x-3 md:translate-y-3 transition-transform group-hover:translate-x-4 group-hover:translate-y-4" />
                    
                    <div className="relative bg-white border-4 border-slate-900 rounded-[32px] md:rounded-[40px] flex flex-col h-full overflow-hidden">
                        
                        <div className="relative w-full h-48 md:h-56 bg-slate-200 overflow-hidden border-b-4 border-slate-900">
                          {t.bannerImage ? (
                            <Image src={t.bannerImage} alt={t.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-indigo-50"><Trophy size={48} className="text-indigo-200" /></div>
                          )}
                          
                          <div className="absolute top-4 right-4">
                            <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-lg border-2 border-slate-900 shadow-[2px_2px_0px_#000] ${
                              t.status === 'OPEN' ? 'bg-emerald-400 text-slate-900' : 'bg-amber-400 text-slate-900'
                            }`}>
                                {t.status}
                            </span>
                          </div>
                          <div className="absolute -bottom-6 left-8 w-12 h-12 md:w-14 md:h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg border-2 border-white z-10"><Trophy size={24} /></div>
                        </div>

                        <div className="p-6 md:p-8 lg:p-10 pt-10 flex flex-col flex-1">
                          <h3 className="text-xl md:text-2xl font-[1000] uppercase tracking-tight text-slate-900 leading-tight mb-6 line-clamp-2">{t.title}</h3>
                          
                          <div className="space-y-3 mb-8 flex-1">
                            <div className="flex items-center gap-3 text-slate-500 font-bold text-xs md:text-sm uppercase tracking-tight">
                                <Calendar size={16} className="text-orange-500" /> 
                                {new Date(t.startDate).toLocaleDateString('en-HK', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </div>
                            <div className="flex items-center gap-3 text-slate-500 font-bold text-xs md:text-sm uppercase tracking-tight">
                                <MapPin size={16} className="text-indigo-600" /> {t.location}
                            </div>
                            <div className="flex items-center gap-3 text-slate-500 font-bold text-xs md:text-sm uppercase tracking-tight">
                                <Users size={16} className="text-cyan-500" /> Max {t.maxPlayers} Players
                            </div>
                            {/* FEE DISPLAY HKD */}
                            <div className="flex items-center gap-3 text-indigo-700 font-black text-xs md:text-sm uppercase tracking-tight bg-indigo-50 p-3 rounded-xl border border-indigo-100 mt-4">
                                <DollarSign size={14} /> Fee: {t.entryFee === 0 ? "FREE" : `HK$${(t.entryFee / 100).toLocaleString('en-HK')}`}
                            </div>
                          </div>

                          <button 
                            onClick={() => setSelectedTournament(t)}
                            disabled={t.status !== 'OPEN'} 
                            className={`w-full py-4 md:py-5 rounded-2xl text-white font-black uppercase tracking-widest text-[10px] md:text-xs flex items-center justify-center gap-2 transition-all shadow-xl ${
                              t.status === 'OPEN' ? 'bg-indigo-600 hover:bg-orange-500' : 'bg-slate-400 cursor-not-allowed'
                            }`}
                          >
                            {t.status === 'OPEN' ? 'Register Now' : 'Registration Closed'} <ChevronRight size={16} />
                          </button>
                        </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-20 text-center border-4 border-dashed border-slate-100 rounded-[40px]">
                  <p className="text-slate-400 font-black uppercase tracking-widest text-sm">No new tournaments scheduled. Check back soon!</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        )}
      </section>

      {/* --- 2. REGISTRATION MODAL --- */}
      <AnimatePresence>
        {selectedTournament && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white border-4 border-slate-900 rounded-[32px] md:rounded-[40px] w-full max-w-lg overflow-hidden relative shadow-[20px_20px_0px_#000]"
            >
              <button 
                onClick={() => setSelectedTournament(null)}
                className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>

              <form onSubmit={handleFormSubmit} className="p-8 md:p-12">
                <div className="mb-8">
                  <h3 className="text-3xl font-[1000] uppercase tracking-tighter">Enter Details</h3>
                  <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest">
                    Tournament: <span className="text-indigo-600">{selectedTournament.title}</span>
                  </p>
                </div>

                {/* Hidden input to pass ID to server action */}
                <input type="hidden" name="tournamentId" value={selectedTournament.id} />

                <div className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input required name="playerName" placeholder="PLAYER FULL NAME" className="w-full pl-12 pr-4 py-4 border-4 border-slate-900 rounded-2xl font-black uppercase text-xs focus:ring-4 ring-indigo-100 outline-none" />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input required name="email" type="email" placeholder="EMAIL ADDRESS" className="w-full pl-12 pr-4 py-4 border-4 border-slate-900 rounded-2xl font-black uppercase text-xs focus:ring-4 ring-indigo-100 outline-none" />
                  </div>

                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input required name="phone" placeholder="PHONE NUMBER" className="w-full pl-12 pr-4 py-4 border-4 border-slate-900 rounded-2xl font-black uppercase text-xs focus:ring-4 ring-indigo-100 outline-none" />
                  </div>
                </div>

                <div className="mt-8 p-6 bg-indigo-50 border-4 border-indigo-100 rounded-[24px] flex justify-between items-center">
                   <div>
                      <p className="font-black text-indigo-900 uppercase text-[10px]">Registration Fee</p>
                      <p className="font-[1000] text-2xl text-indigo-600">HK${(selectedTournament.entryFee / 100).toLocaleString()}</p>
                   </div>
                   <div className="w-12 h-12 bg-white border-2 border-indigo-200 rounded-xl flex items-center justify-center text-indigo-600">
                     <DollarSign size={24} />
                   </div>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-8 py-5 bg-slate-900 hover:bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all disabled:opacity-50 shadow-[0_8px_0_#4f46e5] active:translate-y-1 active:shadow-none"
                >
                  {isSubmitting ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <>Proceed to Payment <ChevronRight size={18} /></>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- 3. TOURNAMENT FORMATS --- */}
      <section className="py-16 md:py-24 bg-slate-900 relative overflow-hidden">
         <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0h30v30H30V0zM0 30h30v30H0V30z' fill='%23ffffff' /%3E%3C/svg%3E")` }} />
         <div className="container mx-auto px-6 relative z-10 text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-6xl font-[1000] text-white uppercase tracking-tighter mb-4 leading-none">Competition <span className="text-orange-400 italic">Formats</span></h2>
         </div>
         <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Bullet", time: "1 min", icon: <Zap /> },
              { title: "Blitz", time: "3 - 5 mins", icon: <Target /> },
              { title: "Rapid", time: "10 - 25 mins", icon: <Clock /> },
              { title: "Classical", time: "60+ mins", icon: <Trophy /> },
            ].map((f, i) => (
              <div key={i} className="p-8 bg-white/5 border border-white/10 rounded-[32px] group hover:bg-white hover:border-white transition-all">
                 <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mb-6 group-hover:bg-orange-500 transition-colors">{f.icon}</div>
                 <h4 className="text-xl font-black text-white group-hover:text-slate-900 uppercase tracking-tighter">{f.title}</h4>
                 <p className="text-orange-400 font-black text-[10px] uppercase tracking-widest mb-3">{f.time}</p>
              </div>
            ))}
         </div>
      </section>

      {/* --- 4. WHY TOURNAMENTS? --- */}
      <section className="py-16 md:py-24 container mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 md:gap-20">
         <div className="flex-1 relative w-full max-w-[500px]">
            <div className="relative aspect-square">
               <div className="absolute inset-0 bg-orange-500 rounded-[40px] md:rounded-[60px] transform rotate-3" />
               <div className="absolute inset-0 bg-white border-4 border-slate-900 rounded-[40px] md:rounded-[60px] overflow-hidden shadow-2xl relative z-10 flex flex-col items-center justify-center p-8 md:p-12 text-center gap-6">
                  <div className="w-16 h-16 md:w-24 md:h-24 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600"><Star size={32} fill="currentColor" /></div>
                  <h3 className="text-2xl md:text-3xl font-[1000] text-slate-900 uppercase tracking-tight">Real-World Prep</h3>
                  <p className="text-slate-500 font-bold uppercase text-[10px] md:text-xs tracking-widest">Global championship conditions for students.</p>
               </div>
            </div>
         </div>
         <div className="flex-1 space-y-8">
            <h2 className="text-3xl md:text-5xl font-[1000] text-slate-900 uppercase tracking-tighter">Beyond the <span className="text-indigo-600">Practice Board</span></h2>
            <div className="space-y-6">
               {[
                 "Detailed Post-Game Analysis with GM Coaches",
                 "Tournament Psychology & Resilience",
                 "Official National Ranking Opportunities",
                 "Strategic Time Management Skills"
               ].map(text => (
                 <div key={text} className="flex items-center gap-4 group">
                    <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white shrink-0 group-hover:bg-orange-500 transition-colors">
                       <ShieldCheck size={18} />
                    </div>
                    <span className="font-black text-slate-900 uppercase text-[10px] md:text-xs tracking-tight">{text}</span>
                 </div>
               ))}
            </div>
         </div>
      </section>

    </div>
  );
}