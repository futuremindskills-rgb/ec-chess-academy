"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { 
  Trophy, Calendar, Clock, MapPin, ChevronRight, Zap, Target, 
  ShieldCheck, Star, Users, Loader2, DollarSign, X, User, 
  Mail, Phone, Baby, Cake, BarChart, Hash, Globe, FileText,
  Sword, Filter, LayoutGrid, Medal
} from "lucide-react";
import TournamentBanner from "@/components/ui/tournamentBanner";
import { getTournaments } from "@/app/actions/adminActions";
import { registerForTournament } from "@/app/actions/tournamentActions";

type GameFilter = "ALL" | "Weiqi" | "Xiangqi" | "International Chess";

export default function TournamentsPage() {
  const [tournaments, setTournaments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<GameFilter>("ALL");
  
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
      if (result?.url) window.location.href = result.url;
    } catch (error) {
      console.error("Registration error:", error);
      alert("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  // --- FILTERING LOGIC ---
  const filteredTournaments = tournaments.filter(t => {
    const isNotCancelled = t.status !== "CANCELLED";
    if (activeFilter === "ALL") return isNotCancelled;

    try {
      // Check if the tournament categories (stored as JSON string) contains the active filter
      const cats = t.categories ? JSON.parse(t.categories) : [];
      return isNotCancelled && cats.includes(activeFilter);
    } catch (e) {
      return false;
    }
  });

  return (
    <div className="bg-white font-sans overflow-x-hidden text-slate-900 pb-20">
      <TournamentBanner/>

      {/* --- DYNAMIC FILTER BAR --- */}
      <div className="container mx-auto px-4 mt-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-6 border-4 border-slate-900 rounded-[32px] shadow-[8px_8px_0px_#000]">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-xl text-white border-2 border-slate-900">
              <Filter size={20} />
            </div>
            <div>
                <h2 className="font-black uppercase tracking-tighter text-lg leading-none">Tournament Filter</h2>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Select your discipline</p>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {(["ALL", "Weiqi", "Xiangqi", "International Chess"] as GameFilter[]).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all border-4 border-slate-900 
                  ${activeFilter === filter 
                    ? "bg-indigo-600 text-white shadow-[4px_4px_0px_#000] -translate-y-1" 
                    : "bg-white text-slate-900 hover:bg-slate-50 shadow-[2px_2px_0px_#000] active:shadow-none active:translate-y-0.5"
                  }`}
              >
                {filter === "International Chess" ? "Intl. Chess" : filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* --- TOURNAMENT GRID --- */}
      <section className="py-12 md:py-20 container mx-auto px-4 md:px-6">
        {loading ? (
          <div className="flex flex-col justify-center items-center py-20 gap-4">
            <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
            <p className="font-bold text-slate-400 uppercase tracking-widest text-xs">Loading Championship Data...</p>
          </div>
        ) : (
          <>
            {filteredTournaments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-12">
                {filteredTournaments.map((t) => (
                  <motion.div 
                    key={t.id} 
                    layout 
                    initial={{ opacity: 0, scale: 0.9 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    whileHover={{ y: -10 }} 
                    className="relative group h-full"
                  >
                    <div className="absolute inset-0 bg-slate-900 rounded-[32px] md:rounded-[40px] translate-x-2 translate-y-2 md:translate-x-3 md:translate-y-3" />
                    <div className="relative bg-white border-4 border-slate-900 rounded-[32px] md:rounded-[40px] flex flex-col h-full overflow-hidden">
                      <div className="relative w-full h-48 md:h-56 bg-slate-200 overflow-hidden border-b-4 border-slate-900">
                        {t.bannerImage && <Image src={t.bannerImage} alt={t.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />}
                        <div className="absolute top-4 right-4">
                          <span className="px-4 py-1.5 text-[10px] font-black uppercase bg-emerald-400 border-2 border-slate-900 shadow-[3px_3px_0px_#000]">{t.status}</span>
                        </div>
                      </div>
                      <div className="p-6 md:p-8 pt-6 flex flex-col flex-1">
                        <h3 className="text-xl md:text-2xl font-[1000] uppercase tracking-tight mb-4 text-slate-900 leading-tight">{t.title}</h3>
                        <div className="space-y-3 mb-8 flex-1 text-slate-500 font-bold text-[11px] uppercase tracking-wide">
                          <div className="flex items-center gap-3"><Calendar size={18} className="text-orange-500" /> {new Date(t.startDate).toLocaleDateString()}</div>
                          <div className="flex items-center gap-3"><MapPin size={18} className="text-indigo-600" /> {t.location}</div>
                        </div>
                        <div className="flex flex-col gap-3">
                          <button onClick={() => setViewingRegs(t)} className="w-full py-3 border-4 border-slate-900 rounded-2xl font-black uppercase text-[10px] hover:bg-slate-50 transition-all flex items-center justify-center gap-2 text-slate-900">
                            <FileText size={16} /> Regulations 章程
                          </button>
                          <button onClick={() => setSelectedTournament(t)} className="w-full py-4 bg-indigo-600 hover:bg-slate-900 text-white font-black uppercase rounded-2xl transition-all shadow-xl text-xs tracking-widest">
                            Register Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-32 border-8 border-dotted border-slate-100 rounded-[60px]">
                <LayoutGrid size={64} className="mx-auto text-slate-200 mb-4" />
                <p className="font-black text-slate-300 uppercase tracking-widest text-xl">No active tournaments in {activeFilter}</p>
                <button onClick={() => setActiveFilter("ALL")} className="mt-4 bg-slate-900 text-white px-6 py-2 rounded-full font-bold uppercase text-[10px] tracking-tighter">Show All Events</button>
              </div>
            )}
          </>
        )}
      </section>

      {/* --- REGULATIONS MODAL --- */}
      <AnimatePresence>
        {viewingRegs && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-md">
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}
              className="bg-white border-4 border-slate-900 rounded-[32px] w-full max-w-3xl max-h-[85vh] overflow-hidden flex flex-col shadow-[20px_20px_0px_#4f46e5]"
            >
              <div className="p-6 border-b-4 border-slate-900 bg-slate-50 flex justify-between items-center text-slate-900">
                <h3 className="font-[1000] uppercase text-xl tracking-tighter">比賽章程 Regulations</h3>
                <button onClick={() => setViewingRegs(null)} className="p-2 bg-white border-2 border-slate-900 rounded-xl hover:bg-red-500 hover:text-white transition-all"><X size={20}/></button>
              </div>
              <div className="p-8 overflow-y-auto bg-white text-slate-900">
                <div className="prose prose-slate max-w-none">
                  <p className="whitespace-pre-wrap font-medium text-slate-700 leading-relaxed text-sm">
                    {viewingRegs.regulations || "Detailed regulations for this event are not yet uploaded. Please contact the organizer."}
                  </p>
                </div>
              </div>
              <div className="p-6 bg-slate-50 border-t-4 border-slate-900 text-center">
                 <button onClick={() => { setSelectedTournament(viewingRegs); setViewingRegs(null); }} className="px-12 py-4 bg-indigo-600 text-white font-black uppercase rounded-2xl text-xs hover:bg-slate-900 transition-colors shadow-lg">Confirm & Start Registration</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- REGISTRATION MODAL --- */}
      <AnimatePresence>
        {selectedTournament && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md overflow-y-auto">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white border-4 border-slate-900 rounded-[40px] w-full max-w-2xl my-auto relative shadow-[20px_20px_0px_#000]"
            >
              <button onClick={() => setSelectedTournament(null)} className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full z-10 text-slate-900"><X size={24} /></button>

              <form onSubmit={handleFormSubmit} className="p-6 md:p-10 max-h-[85vh] overflow-y-auto no-scrollbar text-slate-900">
                <div className="mb-8">
                  <h3 className="text-3xl font-[1000] uppercase tracking-tighter">Tournament Entry</h3>
                  <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mt-1">Event: {selectedTournament.title}</p>
                </div>

                <input type="hidden" name="tournamentId" value={selectedTournament.id} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Student Details */}
                  <div className="relative md:col-span-2">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input required name="playerName" placeholder="Student Full Name" className="w-full pl-12 pr-4 py-4 border-4 border-slate-900 rounded-2xl font-black uppercase text-xs outline-none focus:border-indigo-600 text-slate-900" />
                    <span className="absolute -top-2 left-4 bg-white px-1 text-[8px] font-black text-slate-400 uppercase">Required</span>
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input required name="email" type="email" placeholder="Guardian Email" className="w-full pl-12 pr-4 py-4 border-4 border-slate-900 rounded-2xl font-black uppercase text-xs outline-none focus:border-indigo-600 text-slate-900" />
                  </div>

                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input required name="phone" placeholder="Phone Number" className="w-full pl-12 pr-4 py-4 border-4 border-slate-900 rounded-2xl font-black uppercase text-xs outline-none focus:border-indigo-600 text-slate-900" />
                  </div>

                  <div className="relative">
                    <Cake className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input required name="dob" type="date" className="w-full pl-12 pr-4 py-4 border-4 border-slate-900 rounded-2xl font-black text-xs outline-none focus:border-indigo-600 text-slate-900" />
                    <span className="absolute -top-2 left-4 bg-white px-1 text-[8px] font-black text-slate-400 uppercase tracking-tighter">Date of Birth</span>
                  </div>

                  <div className="relative">
                    <select required name="gender" className="w-full px-4 py-4 border-4 border-slate-900 rounded-2xl font-black uppercase text-xs outline-none appearance-none bg-white focus:border-indigo-600 text-slate-900">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    <span className="absolute -top-2 left-4 bg-white px-1 text-[8px] font-black text-slate-400 uppercase tracking-tighter">Gender</span>
                  </div>

                  {/* DYNAMIC STUDENT CATEGORY (Populated by Admin Levels) */}
                  <div className="relative md:col-span-2">
                    <Baby className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    {selectedTournament.levels ? (
                       <select required name="studentCategory" className="w-full pl-12 pr-4 py-4 border-4 border-slate-900 rounded-2xl font-black uppercase text-xs outline-none appearance-none bg-white focus:border-indigo-600 text-slate-900">
                          <option value="">-- Choose Category / Group --</option>
                          {JSON.parse(selectedTournament.levels).map((lvl: string) => (
                            <option key={lvl} value={lvl}>{lvl}</option>
                          ))}
                       </select>
                    ) : (
                      <select required name="studentCategory" className="w-full pl-12 pr-4 py-4 border-4 border-slate-900 rounded-2xl font-black uppercase text-xs outline-none appearance-none bg-white focus:border-indigo-600 text-slate-900">
                        <option value="lower_primary">Lower Primary</option>
                        <option value="upper_primary">Upper Primary</option>
                        <option value="secondary">Secondary</option>
                        <option value="college">College</option>
                        <option value="open">Open</option>
                      </select>
                    )}
                    <span className="absolute -top-2 left-4 bg-white px-1 text-[8px] font-black text-slate-400 uppercase tracking-tighter">Tournament Category</span>
                  </div>

                  {/* STATIC RATING / LEVEL BOX */}
                  <div className="relative md:col-span-1">
                    <BarChart className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input name="rating" placeholder="Rating" className="w-full pl-12 pr-4 py-4 border-4 border-slate-900 rounded-2xl font-black uppercase text-xs outline-none focus:border-indigo-600 text-slate-900" />
                    <span className="absolute -top-2 left-4 bg-white px-1 text-[8px] font-black text-slate-400 uppercase tracking-tighter">Current Level/Rating</span>
                  </div>

                  <div className="relative md:col-span-1">
                    <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input name="fideId" placeholder="FIDE ID" className="w-full pl-12 pr-4 py-4 border-4 border-slate-900 rounded-2xl font-black uppercase text-xs outline-none focus:border-indigo-600 text-slate-900" />
                    <span className="absolute -top-2 left-4 bg-white px-1 text-[8px] font-black text-slate-400 uppercase tracking-tighter">FIDE ID (Optional)</span>
                  </div>

                  {/* OPTIONAL USERNAME FIELD */}
                  <div className="relative md:col-span-2">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input name="onlineUsername" required={false} placeholder="e.g. Lichess_Master_99" className="w-full pl-12 pr-4 py-4 border-4 border-slate-900 rounded-2xl font-black uppercase text-xs outline-none focus:border-indigo-600 text-slate-900" />
                    <span className="absolute -top-2 left-4 bg-white px-1 text-[8px] font-black text-slate-400 uppercase tracking-tighter">Online Username (Optional)</span>
                  </div>
                </div>

                <div className="mt-10 p-6 bg-indigo-50 border-4 border-indigo-100 rounded-[24px] flex justify-between items-center shadow-inner">
                   <div>
                      <p className="font-black text-indigo-900 uppercase text-[10px] tracking-widest">Registration Fee</p>
                      <p className="font-[1000] text-3xl text-indigo-600">HK${(selectedTournament.entryFee / 100).toLocaleString()}</p>
                   </div>
                   <DollarSign className="text-indigo-200" size={48} strokeWidth={3} />
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full mt-8 py-5 bg-slate-900 hover:bg-indigo-600 text-white rounded-2xl font-[1000] uppercase tracking-widest text-sm flex items-center justify-center gap-3 transition-all disabled:opacity-50 shadow-[6px_6px_0px_#000] active:translate-y-1 active:shadow-none">
                  {isSubmitting ? <Loader2 className="animate-spin" /> : <>Complete & Proceed to Pay <ChevronRight size={18} /></>}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      {/* --- EXTRA SECTIONS --- */}
      <section className="py-16 md:py-24 bg-slate-900 relative overflow-hidden">
         <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0h30v30H30V0zM0 30h30v30H0V30z' fill='%23ffffff' /%3E%3C/svg%3E")` }} />
         <div className="container mx-auto px-6 relative z-10 text-center mb-12 md:mb-16 text-white">
            <h2 className="text-3xl md:text-6xl font-[1000] uppercase tracking-tighter mb-4 leading-none">Competition <span className="text-orange-400 italic">Formats</span></h2>
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

      <section className="py-16 md:py-24 lg:py-32 container mx-auto px-6">
  <div className="max-w-7xl mx-auto lg:grid lg:grid-cols-12 lg:gap-16 lg:items-center">
    
    {/* LEFT COLUMN: IMAGE COMPOSITION (Takes 5/12 columns) */}
    <div className="lg:col-span-5 relative w-full max-w-[500px] mx-auto lg:mx-0 mb-12 lg:mb-0">
      <div className="relative aspect-square">
        {/* Shadow Background */}
        <div className="absolute inset-0 bg-orange-500 rounded-[40px] md:rounded-[60px] transform rotate-3" />
        
        {/* Image Frame */}
        <div className="absolute inset-0 bg-white border-4 border-slate-900 rounded-[40px] md:rounded-[60px] overflow-hidden shadow-2xl z-10 transition-transform hover:rotate-0 duration-500">
          <img 
            src="/3.webp" 
            alt="Chess Tournament Preparation" 
            className="w-full h-full object-cover"
          />
          
          {/* Badge Overlay */}
          <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md border-2 border-slate-900 rounded-[24px] p-5 text-center shadow-2xl">
            <div className="inline-flex items-center justify-center w-10 h-10 bg-indigo-600 text-white rounded-full mb-3">
              <Star size={20} fill="currentColor" />
            </div>
            <h3 className="text-xl md:text-2xl font-[1000] text-slate-900 uppercase tracking-tight leading-none">
              Real-World Prep
            </h3>
          </div>
        </div>
      </div>
    </div>

    {/* RIGHT COLUMN: CONTENT (Takes 7/12 columns - Fills the space) */}
    <div className="lg:col-span-7 space-y-10">
      <div className="space-y-4">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="bg-indigo-600 text-white text-[10px] font-black uppercase tracking-[0.3em] px-4 py-1.5 rounded-full w-fit shadow-lg"
        >
          Competitive Excellence
        </motion.div>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-[1000] text-slate-900 uppercase tracking-tighter leading-none">
          Beyond the <br />
          <span className="text-indigo-600 italic">Practice Board</span>
        </h2>
        <p className="text-slate-500 font-bold text-sm md:text-base max-w-2xl leading-relaxed">
          We bridge the gap between classroom theory and the intense pressure of international championships. Our students don't just learn to move pieces; they learn to conquer environments.
        </p>
      </div>

      {/* GRID LIST: Now 2 columns on desktop to fill the right side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        {[
          { text: "Post-Game Analysis with GMs", icon: <Sword size={18} /> },
          { text: "Psychology & Resilience", icon: <Zap size={18} /> },
          { text: "Official Ranking Opportunities", icon: <Trophy size={18} /> },
          { text: "Strategic Time Management", icon: <Clock size={18} /> },
          { text: "Championship Environment Simulation", icon: <ShieldCheck size={18} /> },
          { text: "FIDE Standard Mentorship", icon: <Medal size={18} /> }
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-4 group p-2">
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shrink-0 group-hover:bg-orange-500 group-hover:scale-110 transition-all shadow-[4px_4px_0px_#4f46e5]">
              {item.icon}
            </div>
            <span className="font-black text-slate-900 uppercase text-[10px] md:text-xs tracking-tight leading-tight">
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>
    </div>
  );
}