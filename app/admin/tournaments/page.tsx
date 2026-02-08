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
  Plus, 
  Trash2, 
  Pencil, 
  X, 
  Trophy, 
  Loader2, 
  Search, 
  Calendar, 
  MapPin, 
  Users, 
  DollarSign,
  UserCheck,
  CheckCircle2,
  Clock3,
  ShieldAlert,
  ChevronRight,
  Printer
} from "lucide-react";

export default function TournamentAdmin() {
  const [tournaments, setTournaments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Modals / UI States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewingPlayers, setViewingPlayers] = useState<any>(null); // State for Participant Drawer
  
  // Form State
  const [editingItem, setEditingItem] = useState<any>(null);
  const [bannerUrl, setBannerUrl] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadData();
  }, []);

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

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    
    if (bannerUrl) {
        formData.set("bannerImage", bannerUrl);
    }

    try {
      if (editingItem) {
        await editTournament(editingItem.id, formData);
      } else {
        await addTournament(formData);
      }
      closeModal();
      await loadData();
    } catch (error) {
      console.error("Error saving tournament", error);
      alert("Failed to save tournament.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(id: number) {
    if (confirm("Are you sure you want to delete this tournament and all its records?")) {
      await deleteTournament(id);
      loadData();
    }
  }

  function openAdd() {
    setEditingItem(null);
    setBannerUrl("");
    setIsModalOpen(true);
  }

  function openEdit(item: any) {
    setEditingItem(item);
    setBannerUrl(item.bannerImage || "");
    setIsModalOpen(true);
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

  const getPaymentBadge = (status: string) => {
    switch (status) {
      case 'COMPLETED': return <span className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md text-[10px] font-black border border-emerald-100"><CheckCircle2 size={12}/> PAID</span>;
      case 'PENDING': return <span className="flex items-center gap-1 text-amber-600 bg-amber-50 px-2 py-1 rounded-md text-[10px] font-black border border-amber-100"><Clock3 size={12}/> PENDING</span>;
      case 'FAILED': return <span className="flex items-center gap-1 text-red-600 bg-red-50 px-2 py-1 rounded-md text-[10px] font-black border border-red-100"><ShieldAlert size={12}/> FAILED</span>;
      default: return status;
    }
  };

  const filteredTournaments = tournaments.filter(t => 
    t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen pb-20 p-4 md:p-8">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 className="text-4xl font-[1000] text-slate-900 flex items-center gap-3 uppercase tracking-tighter">
            Tournament <span className="text-blue-600">Admin</span>
          </h1>
          <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest mt-1">Management & Player Registrations</p>
        </div>
        
        <button 
          onClick={openAdd} 
          className="bg-blue-600 hover:bg-slate-900 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-2 transition-all shadow-[6px_6px_0px_#1e1b4b] active:translate-y-1 active:shadow-none"
        >
          <Plus size={18} /> New Tournament
        </button>
      </div>

      {/* --- SEARCH BAR --- */}
      <div className="bg-white p-2 rounded-2xl border-4 border-slate-900 shadow-[6px_6px_0px_#f1f5f9] mb-10 flex items-center gap-3">
        <div className="bg-slate-100 p-3 rounded-xl"><Search className="text-slate-500" size={20} /></div>
        <input 
          type="text" 
          placeholder="SEARCH EVENTS..." 
          className="flex-1 bg-transparent outline-none text-slate-900 placeholder:text-slate-400 font-black uppercase text-xs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* --- TOURNAMENT GRID --- */}
      {isLoading ? (
        <div className="p-20 flex flex-col justify-center items-center gap-4 text-blue-600">
          <Loader2 size={48} className="animate-spin" />
          <p className="font-black uppercase text-xs tracking-widest text-slate-400">Loading Database...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTournaments.length === 0 ? (
            <div className="col-span-full p-20 text-center border-4 border-dashed border-slate-200 rounded-[40px]">
              <p className="text-slate-400 font-black uppercase tracking-widest text-sm">No Events Found</p>
            </div>
          ) : (
            filteredTournaments.map((t) => (
              <div key={t.id} className="group bg-white rounded-[32px] border-4 border-slate-900 overflow-hidden shadow-[10px_10px_0px_#f1f5f9] flex flex-col transition-all hover:shadow-none hover:translate-x-1 hover:translate-y-1">
                
                {/* Banner */}
                <div className="relative h-44 overflow-hidden bg-slate-100 border-b-4 border-slate-900">
                  <img src={t.bannerImage || "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=800"} alt="" className="w-full h-full object-cover" />
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase border-2 border-slate-900 shadow-[3px_3px_0px_#000] ${getStatusColor(t.status)}`}>
                        {t.status}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow space-y-5">
                  <div>
                    <h3 className="font-[1000] text-slate-900 text-xl uppercase leading-tight line-clamp-1">{t.title}</h3>
                    <p className="text-slate-500 font-bold uppercase text-[10px] flex items-center gap-1 mt-1">
                        <MapPin size={12} className="text-blue-600" /> {t.location}
                    </p>
                  </div>

                  {/* Player Counter */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase text-slate-400">
                        <span>Registrations</span>
                        <span className="text-slate-900">{t.registrations?.filter((r:any)=>r.status === 'COMPLETED').length || 0} / {t.maxPlayers}</span>
                    </div>
                    <div className="h-3 bg-slate-100 border-2 border-slate-900 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500" 
                          style={{ width: `${Math.min(((t.registrations?.filter((r:any)=>r.status === 'COMPLETED').length || 0) / t.maxPlayers) * 100, 100)}%` }}
                        />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-3 rounded-xl border-2 border-slate-100">
                        <p className="text-[9px] font-black text-slate-400 uppercase">Fee (HKD)</p>
                        <p className="font-black text-slate-900 text-sm flex items-center gap-0.5"><DollarSign size={14}/>{t.entryFee / 100}</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border-2 border-slate-100">
                        <p className="text-[9px] font-black text-slate-400 uppercase">Start Date</p>
                        <p className="font-black text-slate-900 text-[10px]">{new Date(t.startDate).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col gap-2">
                    <button 
                      onClick={() => setViewingPlayers(t)}
                      className="w-full py-3 bg-blue-50 text-blue-600 rounded-xl font-black uppercase text-[10px] border-2 border-blue-100 flex items-center justify-center gap-2 hover:bg-blue-600 hover:text-white transition-all"
                    >
                      <UserCheck size={16} /> View Participants
                    </button>
                    <div className="flex gap-2">
                        <button onClick={() => openEdit(t)} className="flex-1 py-3 bg-slate-900 text-white rounded-xl font-black uppercase text-[10px] hover:bg-blue-600 transition-all">Edit</button>
                        <button onClick={() => handleDelete(t.id)} className="p-3 bg-red-50 text-red-600 rounded-xl border-2 border-red-100 hover:bg-red-600 hover:text-white transition-all"><Trash2 size={16} /></button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* --- PARTICIPANT DRAWER (Side Panel) --- */}
      <AnimatePresence>
        {viewingPlayers && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setViewingPlayers(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            {/* Panel */}
            <motion.div 
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative w-full max-w-2xl bg-white border-l-8 border-slate-900 h-full shadow-2xl flex flex-col"
            >
              <div className="p-8 border-b-4 border-slate-900 flex justify-between items-center bg-blue-600 text-white">
                <div>
                  <h2 className="text-2xl font-[1000] uppercase tracking-tighter">Event Roster</h2>
                  <p className="text-xs font-bold text-blue-100 uppercase mt-1">{viewingPlayers.title}</p>
                </div>
                <button onClick={() => setViewingPlayers(null)} className="p-3 bg-slate-900 text-white rounded-2xl hover:bg-white hover:text-slate-900 transition-all"><X size={24} /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-8">
                {viewingPlayers.registrations?.length === 0 ? (
                  <div className="text-center py-20 flex flex-col items-center">
                    <Users size={64} className="text-slate-100 mb-4" />
                    <p className="text-slate-400 font-black uppercase text-sm">No registrations found.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-[10px] font-black uppercase text-slate-400">Participant Details</p>
                        <button onClick={() => window.print()} className="flex items-center gap-2 text-[10px] font-black uppercase text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 hover:bg-blue-600 hover:text-white transition-all">
                            <Printer size={14} /> Print List
                        </button>
                    </div>
                    <div className="space-y-3">
                      {viewingPlayers.registrations.map((reg: any) => (
                        <div key={reg.id} className="bg-white p-5 rounded-[24px] border-4 border-slate-900 shadow-[6px_6px_0px_#f1f5f9] flex items-center justify-between">
                          <div>
                            <p className="font-black text-slate-900 uppercase text-sm tracking-tight">{reg.playerName}</p>
                            <div className="flex gap-4 mt-1">
                                <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1 uppercase tracking-tight"><Mail size={12}/>{reg.email}</span>
                                <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1 uppercase tracking-tight"><Phone size={12}/>{reg.phone}</span>
                            </div>
                          </div>
                          <div className="text-right">
                             {getPaymentBadge(reg.status)}
                             <p className="text-[9px] font-bold text-slate-400 mt-2 uppercase">{new Date(reg.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- ADD / EDIT MODAL --- */}
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

// Re-using same input icons for the Drawer
function Mail({ size }: { size: number }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>; }
function Phone({ size }: { size: number }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>; }