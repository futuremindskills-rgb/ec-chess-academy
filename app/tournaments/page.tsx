"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { 
  Trophy, Calendar, Clock, MapPin, ChevronRight, Zap, Target, 
  ShieldCheck, Star, Users, Loader2, DollarSign, X, User, 
  Mail, Phone, Baby, Cake, BarChart, Hash, Globe, FileText
} from "lucide-react";
import TournamentBanner from "@/components/ui/tournamentBanner";
import { getTournaments } from "@/app/actions/adminActions";
import { registerForTournament } from "@/app/actions/tournamentActions";

export default function TournamentsPage() {
  const [tournaments, setTournaments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal States
  const [selectedTournament, setSelectedTournament] = useState<any>(null);
  const [viewingRegs, setViewingRegs] = useState<any>(null);
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

      {/* TOURNAMENT LISTING */}
      <section className="py-12 md:py-24 container mx-auto px-4 md:px-6">
        <div className="text-center md:text-left mb-12">
            <h2 className="text-3xl md:text-5xl font-[1000] uppercase tracking-tighter leading-tight">
            Upcoming <span className="text-indigo-600 underline underline-offset-8">Events</span>
            </h2>
        </div>

        {loading ? (
          <div className="flex flex-col justify-center items-center py-20 gap-4">
            <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
            <p className="font-bold text-slate-400 uppercase tracking-widest text-xs">Accessing Championship Data...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-12">
            {displayTournaments.map((t) => (
                <motion.div key={t.id} whileHover={{ y: -8 }} className="relative group h-full">
                    <div className="absolute inset-0 bg-[#0f172a] rounded-[32px] md:rounded-[40px] translate-x-2 translate-y-2 md:translate-x-3 md:translate-y-3" />
                    <div className="relative bg-white border-4 border-slate-900 rounded-[32px] md:rounded-[40px] flex flex-col h-full overflow-hidden">
                        <div className="relative w-full h-48 md:h-56 bg-slate-200 overflow-hidden border-b-4 border-slate-900">
                          {t.bannerImage && <Image src={t.bannerImage} alt={t.title} fill className="object-cover" />}
                          <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
                            <span className="px-3 py-1 text-[10px] font-black uppercase bg-emerald-400 border-2 border-slate-900 shadow-[2px_2px_0px_#000]">{t.status}</span>
                            {/* Category Badges */}
                            <div className="flex gap-1">
                              {t.categories && JSON.parse(t.categories).map((cat: string) => (
                                <span key={cat} className="px-2 py-1 text-[8px] font-black uppercase bg-white border-2 border-slate-900 shadow-[2px_2px_0px_#000]">{cat}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="p-6 md:p-8 pt-6 flex flex-col flex-1">
                          <h3 className="text-xl md:text-2xl font-[1000] uppercase tracking-tight mb-4">{t.title}</h3>
                          <div className="space-y-2 mb-6 flex-1 text-slate-500 font-bold text-xs uppercase">
                            <div className="flex items-center gap-3"><Calendar size={16} className="text-orange-500" /> {new Date(t.startDate).toLocaleDateString()}</div>
                            <div className="flex items-center gap-3"><MapPin size={16} className="text-indigo-600" /> {t.location}</div>
                          </div>
                          
                          <div className="flex flex-col gap-3">
                            <button 
                              onClick={() => setViewingRegs(t)}
                              className="w-full py-3 border-4 border-slate-900 rounded-2xl font-black uppercase text-[10px] hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                            >
                              <FileText size={14} /> View Regulations 章程
                            </button>
                            <button 
                              onClick={() => setSelectedTournament(t)}
                              className="w-full py-4 bg-indigo-600 hover:bg-orange-500 text-white font-black uppercase rounded-2xl transition-all shadow-xl"
                            >
                              Register Now
                            </button>
                          </div>
                        </div>
                    </div>
                </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* REGULATIONS MODAL */}
      <AnimatePresence>
        {viewingRegs && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, y: 50 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: 50 }}
              className="bg-white border-4 border-slate-900 rounded-[32px] w-full max-w-3xl max-h-[85vh] overflow-hidden flex flex-col shadow-[20px_20px_0px_#4f46e5]"
            >
              <div className="p-6 border-b-4 border-slate-900 bg-slate-50 flex justify-between items-center">
                <h3 className="font-[1000] uppercase text-xl tracking-tighter">比賽章程 Regulations</h3>
                <button onClick={() => setViewingRegs(null)} className="p-2 bg-white border-2 border-slate-900 rounded-xl hover:bg-red-500 hover:text-white transition-all"><X size={20}/></button>
              </div>
              
              <div className="p-8 overflow-y-auto bg-white">
                <div className="prose prose-slate max-w-none">
                  {/* whitespace-pre-wrap ensures typed line breaks from admin are preserved */}
                  <p className="whitespace-pre-wrap font-medium text-slate-700 leading-relaxed text-sm">
                    {viewingRegs.regulations || "No regulations provided for this event."}
                  </p>
                </div>
              </div>

              <div className="p-6 bg-slate-50 border-t-4 border-slate-900 text-center">
                 <button 
                    onClick={() => {
                        setSelectedTournament(viewingRegs);
                        setViewingRegs(null);
                    }}
                    className="px-8 py-3 bg-indigo-600 text-white font-black uppercase rounded-xl text-xs"
                 >
                    Confirm & Register
                 </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* REGISTRATION MODAL */}
      <AnimatePresence>
        {selectedTournament && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md overflow-y-auto">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white border-4 border-slate-900 rounded-[32px] md:rounded-[40px] w-full max-w-2xl my-auto relative shadow-[20px_20px_0px_#000]"
            >
              <button onClick={() => setSelectedTournament(null)} className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full z-10"><X size={24} /></button>

              <form onSubmit={handleFormSubmit} className="p-6 md:p-10 max-h-[85vh] overflow-y-auto no-scrollbar">
                <div className="mb-8">
                  <h3 className="text-3xl font-[1000] uppercase tracking-tighter">Student Registration</h3>
                  <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest">Tournament: {selectedTournament.title}</p>
                </div>

                <input type="hidden" name="tournamentId" value={selectedTournament.id} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Basic Info */}
                  <div className="relative md:col-span-2">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input required name="playerName" className="w-full pl-12 pr-4 py-4 border-4 border-slate-900 rounded-2xl font-black uppercase text-xs outline-none focus:border-indigo-600" />
                    <span className="absolute -top-2 left-4 bg-white px-1 text-[8px] font-black text-slate-400 uppercase">Student Full Name</span>
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input required name="email" type="email" className="w-full pl-12 pr-4 py-4 border-4 border-slate-900 rounded-2xl font-black uppercase text-xs outline-none focus:border-indigo-600" />
                    <span className="absolute -top-2 left-4 bg-white px-1 text-[8px] font-black text-slate-400 uppercase">Email Address</span>
                  </div>

                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input required name="phone" className="w-full pl-12 pr-4 py-4 border-4 border-slate-900 rounded-2xl font-black uppercase text-xs outline-none focus:border-indigo-600" />
                    <span className="absolute -top-2 left-4 bg-white px-1 text-[8px] font-black text-slate-400 uppercase">Phone Number</span>
                  </div>

                  {/* New Details */}
                  <div className="relative">
                    <Cake className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input required name="dob" type="date" className="w-full pl-12 pr-4 py-4 border-4 border-slate-900 rounded-2xl font-black uppercase text-xs outline-none focus:border-indigo-600" />
                    <span className="absolute -top-2 left-4 bg-white px-1 text-[8px] font-black text-slate-400 uppercase">Date of Birth</span>
                  </div>

                  <div className="relative">
                    <select required name="gender" className="w-full pl-4 pr-4 py-4 border-4 border-slate-900 rounded-2xl font-black uppercase text-xs outline-none appearance-none bg-white focus:border-indigo-600">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    <span className="absolute -top-2 left-4 bg-white px-1 text-[8px] font-black text-slate-400 uppercase">Gender</span>
                  </div>

                  <div className="relative md:col-span-2">
                    <Baby className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <select required name="studentCategory" className="w-full pl-12 pr-4 py-4 border-4 border-slate-900 rounded-2xl font-black uppercase text-xs outline-none appearance-none bg-white focus:border-indigo-600">
                        <option value="lower_primary">Lower Primary</option>
                        <option value="upper_primary">Upper Primary</option>
                        <option value="secondary">Secondary</option>
                        <option value="college">College</option>
                        <option value="open">Open</option>
                        <option value="age">Age Based</option>
                    </select>
                    <span className="absolute -top-2 left-4 bg-white px-1 text-[8px] font-black text-slate-400 uppercase">Student Category</span>
                  </div>

                  <div className="relative">
                    <BarChart className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input name="rating" className="w-full pl-12 pr-4 py-4 border-4 border-slate-900 rounded-2xl font-black uppercase text-xs outline-none focus:border-indigo-600" />
                    <span className="absolute -top-2 left-4 bg-white px-1 text-[8px] font-black text-slate-400 uppercase">Rating / Level</span>
                  </div>

                  <div className="relative">
                    <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input name="fideId" className="w-full pl-12 pr-4 py-4 border-4 border-slate-900 rounded-2xl font-black uppercase text-xs outline-none focus:border-indigo-600" />
                    <span className="absolute -top-2 left-4 bg-white px-1 text-[8px] font-black text-slate-400 uppercase">FIDE ID (Optional)</span>
                  </div>

                  <div className="relative md:col-span-2">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input required name="onlineUsername" className="w-full pl-12 pr-4 py-4 border-4 border-slate-900 rounded-2xl font-black uppercase text-xs outline-none focus:border-indigo-600" />
                    <span className="absolute -top-2 left-4 bg-white px-1 text-[8px] font-black text-slate-400 uppercase">Username (Lichess/Chess.com)</span>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-indigo-50 border-4 border-indigo-100 rounded-[24px] flex justify-between items-center">
                   <div>
                      <p className="font-black text-indigo-900 uppercase text-[10px]">Total Registration Fee</p>
                      <p className="font-[1000] text-2xl text-indigo-600">HK${(selectedTournament.entryFee / 100).toLocaleString()}</p>
                   </div>
                   <DollarSign className="text-indigo-200" size={40} />
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-8 py-5 bg-slate-900 hover:bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all disabled:opacity-50 shadow-[6px_6px_0px_#000]"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" /> : <>Proceed to Payment <ChevronRight size={18} /></>}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- TOURNAMENT FORMATS --- */}
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

      {/* --- WHY TOURNAMENTS? --- */}
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