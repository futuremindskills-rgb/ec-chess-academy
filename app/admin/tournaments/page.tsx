"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  addTournament, 
  editTournament, 
  deleteTournament, 
  getTournaments 
} from "@/app/actions/adminActions";
import ImageUpload from "@/components/admin/ImageUpload";
import { 
  Plus, Trash2, Pencil, X, Trophy, Loader2, Search, 
  MapPin, Users, DollarSign, UserCheck, CheckCircle2, 
  Clock3, ShieldAlert, ChevronRight, Printer, 
  Cake, Baby, Hash, Globe, BarChart, VenusMars, Mail, Phone,
  ChevronDown, ChevronUp, Filter
} from "lucide-react";

export default function TournamentAdmin() {
  const [tournaments, setTournaments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Modals / UI States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewingPlayers, setViewingPlayers] = useState<any>(null); 
  const [playerFilter, setPlayerFilter] = useState<'ALL' | 'PAID' | 'PENDING'>('ALL');
  const [expandedPlayer, setExpandedPlayer] = useState<string | null>(null);
  
  // Form State
  const [editingItem, setEditingItem] = useState<any>(null);
  const [bannerUrl, setBannerUrl] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => { loadData(); }, []);

  async function loadData() {
    setIsLoading(true);
    try {
      const data = await getTournaments();
      setTournaments(data);
    } catch (error) {
      console.error("Failed to load tournaments", error);
    } finally {
      setIsLoading(false);
    }
  }

  // --- Utility Functions ---
  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const difference = Date.now() - birthDate.getTime();
    return Math.abs(new Date(difference).getUTCFullYear() - 1970);
  };

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    if (bannerUrl) formData.set("bannerImage", bannerUrl);
    try {
      if (editingItem) await editTournament(editingItem.id, formData);
      else await addTournament(formData);
      closeModal();
      await loadData();
    } catch (error) {
      alert("Failed to save tournament.");
    } finally { setIsSubmitting(false); }
  }

  async function handleDelete(id: number) {
    if (confirm("Delete this tournament and all its records?")) {
      await deleteTournament(id);
      loadData();
    }
  }

  function closeModal() {
    setIsModalOpen(false);
    setEditingItem(null);
    setBannerUrl("");
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPEN': return 'bg-emerald-400 text-slate-900 border-emerald-500';
      case 'ONGOING': return 'bg-blue-400 text-slate-900 border-blue-500';
      case 'COMPLETED': return 'bg-slate-300 text-slate-700 border-slate-400';
      case 'CANCELLED': return 'bg-red-400 text-white border-red-500';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  // Filter Logic for Drawer
  const filteredRegistrations = viewingPlayers?.registrations?.filter((reg: any) => {
    if (playerFilter === 'PAID') return reg.status === 'COMPLETED';
    if (playerFilter === 'PENDING') return reg.status === 'PENDING';
    return true;
  }) || [];

  return (
    <div className="min-h-screen pb-20 p-4 md:p-8 font-sans">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 className="text-4xl font-[1000] text-slate-900 flex items-center gap-3 uppercase tracking-tighter">
            Tournament <span className="text-blue-600">Admin</span>
          </h1>
          <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest mt-1">Management & Full Player Analytics</p>
        </div>
        <button 
          onClick={() => { setEditingItem(null); setBannerUrl(""); setIsModalOpen(true); }}
          className="bg-blue-600 hover:bg-slate-900 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-[6px_6px_0px_#1e1b4b] active:translate-y-1 active:shadow-none"
        >
          <Plus size={18} className="inline mr-2" /> New Tournament
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="bg-white p-2 rounded-2xl border-4 border-slate-900 shadow-[6px_6px_0px_#f1f5f9] mb-10 flex items-center gap-3">
        <div className="bg-slate-100 p-3 rounded-xl"><Search className="text-slate-500" size={20} /></div>
        <input 
          type="text" placeholder="SEARCH EVENTS..." 
          className="flex-1 bg-transparent outline-none font-black uppercase text-xs"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* TOURNAMENT GRID */}
      {isLoading ? (
        <div className="p-20 flex flex-col items-center gap-4"><Loader2 className="animate-spin text-blue-600" size={48} /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tournaments.filter(t => t.title.toLowerCase().includes(searchTerm.toLowerCase())).map((t) => (
                <div key={t.id} className="bg-white rounded-[32px] border-4 border-slate-900 overflow-hidden shadow-[10px_10px_0px_#f1f5f9] flex flex-col transition-all hover:translate-x-1 hover:translate-y-1">
                    <div className="relative h-44 bg-slate-100 border-b-4 border-slate-900">
                        <img src={t.bannerImage || "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=800"} alt="" className="w-full h-full object-cover" />
                        <div className="absolute top-4 right-4"><span className={`px-3 py-1 rounded-lg text-[10px] font-black border-2 border-slate-900 shadow-[3px_3px_0px_#000] ${getStatusColor(t.status)}`}>{t.status}</span></div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow space-y-4">
                        <h3 className="font-[1000] text-slate-900 text-xl uppercase line-clamp-1">{t.title}</h3>
                        <div className="flex justify-between items-end">
                            <div className="space-y-1">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Confirmed Players</p>
                                <p className="text-lg font-black">{t.registrations?.filter((r:any)=>r.status === 'COMPLETED').length || 0} / {t.maxPlayers}</p>
                            </div>
                            <button 
                                onClick={() => setViewingPlayers(t)}
                                className="px-4 py-2 bg-slate-900 text-white rounded-xl font-black uppercase text-[10px] hover:bg-blue-600 transition-all"
                            >
                                Manage Roster
                            </button>
                        </div>
                        <div className="pt-4 flex gap-2 border-t-2 border-slate-50">
                            <button onClick={() => { setEditingItem(t); setBannerUrl(t.bannerImage || ""); setIsModalOpen(true); }} className="flex-1 py-3 bg-blue-50 text-blue-600 rounded-xl font-black uppercase text-[10px] border-2 border-blue-100 hover:bg-blue-600 hover:text-white">Edit</button>
                            <button onClick={() => handleDelete(t.id)} className="p-3 bg-red-50 text-red-600 rounded-xl border-2 border-red-100 hover:bg-red-600 hover:text-white"><Trash2 size={16}/></button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      )}

      {/* --- PARTICIPANT DRAWER (Full Info & Filter) --- */}
      <AnimatePresence>
        {viewingPlayers && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setViewingPlayers(null)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 30 }} className="relative w-full max-w-3xl bg-white border-l-8 border-slate-900 h-full shadow-2xl flex flex-col">
              
              <div className="p-8 border-b-4 border-slate-900 bg-blue-600 text-white">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h2 className="text-3xl font-[1000] uppercase tracking-tighter">Participant Hub</h2>
                        <p className="text-sm font-bold text-blue-100 uppercase">{viewingPlayers.title}</p>
                    </div>
                    <button onClick={() => setViewingPlayers(null)} className="p-3 bg-slate-900 text-white rounded-2xl hover:bg-white hover:text-slate-900 transition-all"><X size={24} /></button>
                </div>

                {/* FILTER TABS */}
                <div className="flex gap-2 p-1 bg-blue-700 rounded-2xl w-fit">
                    {(['ALL', 'PAID', 'PENDING'] as const).map((tab) => (
                        <button 
                            key={tab}
                            onClick={() => setPlayerFilter(tab)}
                            className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all ${playerFilter === tab ? 'bg-white text-blue-600 shadow-lg' : 'text-white hover:bg-blue-600'}`}
                        >
                            {tab} ({tab === 'ALL' ? viewingPlayers.registrations.length : viewingPlayers.registrations.filter((r:any) => tab === 'PAID' ? r.status === 'COMPLETED' : r.status === 'PENDING').length})
                        </button>
                    ))}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {filteredRegistrations.length === 0 ? (
                    <div className="text-center py-20 text-slate-400 font-bold uppercase text-xs">No records found for this filter.</div>
                ) : (
                    filteredRegistrations.map((reg: any) => (
                        <div key={reg.id} className={`bg-white rounded-[24px] border-4 border-slate-900 transition-all ${expandedPlayer === reg.id ? 'shadow-none translate-x-1 translate-y-1' : 'shadow-[6px_6px_0px_#f1f5f9]'}`}>
                            <div 
                                onClick={() => setExpandedPlayer(expandedPlayer === reg.id ? null : reg.id)}
                                className="p-5 cursor-pointer flex items-center justify-between"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-white shadow-md ${reg.status === 'COMPLETED' ? 'bg-emerald-500' : 'bg-amber-500'}`}>
                                        {reg.playerName.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-black text-slate-900 uppercase tracking-tight">{reg.playerName}</p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase">{reg.studentCategory} • {reg.gender}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right hidden sm:block">
                                        <p className={`text-[10px] font-black uppercase ${reg.status === 'COMPLETED' ? 'text-emerald-600' : 'text-amber-600'}`}>
                                            {reg.status === 'COMPLETED' ? 'PAID' : 'PENDING'}
                                        </p>
                                        <p className="text-[9px] font-bold text-slate-300">{new Date(reg.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    {expandedPlayer === reg.id ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}
                                </div>
                            </div>

                            <AnimatePresence>
                                {expandedPlayer === reg.id && (
                                    <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden bg-slate-50 border-t-2 border-slate-100 rounded-b-[20px]">
                                        <div className="p-6 grid grid-cols-2 md:grid-cols-3 gap-6">
                                            {/* Contact Info */}
                                            <div className="col-span-2 md:col-span-1 space-y-3">
                                                <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Contact Details</p>
                                                <div className="flex items-center gap-2 text-xs font-bold text-slate-600"><Mail size={14} className="text-blue-500"/> {reg.email}</div>
                                                <div className="flex items-center gap-2 text-xs font-bold text-slate-600"><Phone size={14} className="text-blue-500"/> {reg.phone}</div>
                                            </div>
                                            
                                            {/* Student Details */}
                                            <div className="space-y-3">
                                                <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Student Profile</p>
                                                <div className="flex items-center gap-2 text-xs font-bold text-slate-600"><Cake size={14} className="text-orange-500"/> {new Date(reg.dob).toLocaleDateString()} ({calculateAge(reg.dob)} Yrs)</div>
                                                <div className="flex items-center gap-2 text-xs font-bold text-slate-600"><Baby size={14} className="text-indigo-500"/> {reg.studentCategory}</div>
                                                <div className="flex items-center gap-2 text-xs font-bold text-slate-600"><VenusMars size={14} className="text-rose-500"/> {reg.gender}</div>
                                            </div>

                                            {/* Chess Stats */}
                                            <div className="space-y-3">
                                                <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Chess Data</p>
                                                <div className="flex items-center gap-2 text-xs font-bold text-slate-600"><BarChart size={14} className="text-emerald-500"/> Rating: {reg.rating || "N/A"}</div>
                                                <div className="flex items-center gap-2 text-xs font-bold text-slate-600"><Hash size={14} className="text-slate-900"/> FIDE: {reg.fideId || "N/A"}</div>
                                                <div className="flex items-center gap-2 text-xs font-bold text-slate-600"><Globe size={14} className="text-cyan-500"/> {reg.onlineUsername || "No Username"}</div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))
                )}
              </div>
              
              {/* Footer Actions */}
              <div className="p-8 border-t-4 border-slate-900 bg-slate-50 flex gap-4">
                 <button onClick={() => window.print()} className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-xs flex items-center justify-center gap-2">
                    <Printer size={18} /> Export Participant PDF
                 </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {isModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="bg-white border-4 border-slate-900 rounded-[40px] w-full max-w-2xl shadow-[15px_15px_0px_#000] overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="p-8 border-b-4 border-slate-900 flex justify-between items-center bg-slate-50">
              <h2 className="text-2xl font-[1000] text-slate-900 uppercase tracking-tighter">
                {editingItem ? "Update Event" : "Setup Event"}
              </h2>
              <button onClick={closeModal} className="p-3 bg-white border-4 border-slate-900 text-slate-900 rounded-2xl hover:bg-slate-900 hover:text-white transition-all"><X size={24} /></button>
            </div>
            
            <form action={handleSubmit} className="p-10 space-y-6 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="md:col-span-2">
                    <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Banner Image</label>
                    <ImageUpload value={bannerUrl} onChange={setBannerUrl} />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-[10px] font-black uppercase text-slate-900 tracking-widest mb-2">Event Title</label>
                    <input name="title" defaultValue={editingItem?.title} required className="w-full p-4 border-4 border-slate-900 rounded-2xl font-black uppercase text-xs focus:ring-4 ring-blue-100 outline-none" />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-[10px] font-black uppercase text-slate-900 tracking-widest mb-2">Details</label>
                    <textarea name="description" defaultValue={editingItem?.description} required rows={3} className="w-full p-4 border-4 border-slate-900 rounded-2xl font-bold text-xs focus:ring-4 ring-blue-100 outline-none" />
                </div>

                <div>
                    <label className="block text-[10px] font-black uppercase text-slate-900 tracking-widest mb-2">Fee (HKD Cents)</label>
                    <input type="number" name="entryFee" defaultValue={editingItem?.entryFee} required placeholder="e.g. 50000" className="w-full p-4 border-4 border-slate-900 rounded-2xl font-black text-xs" />
                </div>
                <div>
                    <label className="block text-[10px] font-black uppercase text-slate-900 tracking-widest mb-2">Max Players</label>
                    <input type="number" name="maxPlayers" defaultValue={editingItem?.maxPlayers} required className="w-full p-4 border-4 border-slate-900 rounded-2xl font-black text-xs" />
                </div>

                <div>
                    <label className="block text-[10px] font-black uppercase text-slate-900 tracking-widest mb-2">Starts</label>
                    <input type="datetime-local" name="startDate" defaultValue={editingItem?.startDate ? new Date(editingItem.startDate).toISOString().slice(0, 16) : ""} required className="w-full p-4 border-4 border-slate-900 rounded-2xl font-black text-[10px]" />
                </div>
                <div>
                    <label className="block text-[10px] font-black uppercase text-slate-900 tracking-widest mb-2">Ends</label>
                    <input type="datetime-local" name="endDate" defaultValue={editingItem?.endDate ? new Date(editingItem.endDate).toISOString().slice(0, 16) : ""} required className="w-full p-4 border-4 border-slate-900 rounded-2xl font-black text-[10px]" />
                </div>

                <div>
                    <label className="block text-[10px] font-black uppercase text-slate-900 tracking-widest mb-2">Location</label>
                    <input name="location" defaultValue={editingItem?.location} required className="w-full p-4 border-4 border-slate-900 rounded-2xl font-black uppercase text-[10px]" />
                </div>
                <div>
                    <label className="block text-[10px] font-black uppercase text-slate-900 tracking-widest mb-2">Status</label>
                    <select name="status" defaultValue={editingItem?.status || "OPEN"} className="w-full p-4 border-4 border-slate-900 rounded-2xl font-black uppercase text-[10px]">
                        <option value="OPEN">Open</option>
                        <option value="ONGOING">Ongoing</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="CANCELLED">Cancelled</option>
                    </select>
                </div>
              </div>

              <button 
                type="submit" disabled={isSubmitting}
                className="w-full py-5 bg-blue-600 hover:bg-slate-900 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-[6px_6px_0px_#1e1b4b] flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isSubmitting ? <Loader2 className="animate-spin" /> : editingItem ? "Apply Changes" : "Create Event"}
              </button>
            </form>
          </motion.div>
        </div>
      )}

    </div>
  );
}