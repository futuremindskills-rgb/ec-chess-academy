"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  addTournament, 
  editTournament, 
  deleteTournament, 
  getTournaments,
  addCoupon,
  getCoupons,
  deleteCoupon
} from "@/app/actions/adminActions";
import ImageUpload from "@/components/admin/ImageUpload";
import { 
  Plus, Trash2, X, Loader2, Search, 
  FileText, Gamepad2, ChevronDown, ChevronUp, 
  Mail, Phone, Cake, Baby, Hash, Globe, BarChart, Printer, ListOrdered,
  CreditCard, ExternalLink, ShieldCheck, Landmark, Ticket, Percent, CalendarDays, UserCheck
} from "lucide-react";

export default function TournamentAdmin() {
  const [tournaments, setTournaments] = useState<any[]>([]);
  const [coupons, setCoupons] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Modals / UI States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
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
      const [tData, cData] = await Promise.all([
        getTournaments(),
        getCoupons()
      ]);
      setTournaments(tData);
      setCoupons(cData);
    } catch (error) {
      console.error("Failed to load admin data", error);
    } finally {
      setIsLoading(false);
    }
  }

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const difference = Date.now() - birthDate.getTime();
    return Math.abs(new Date(difference).getUTCFullYear() - 1970);
  };

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    if (bannerUrl) formData.set("bannerImage", bannerUrl);
    
    const selectedCategories = Array.from(formData.getAll("categories"));
    formData.set("categories", JSON.stringify(selectedCategories));

    const levelsRaw = formData.get("levels") as string;
    if (levelsRaw) {
        const levelsArray = levelsRaw.split(',').map(s => s.trim()).filter(s => s !== "");
        formData.set("levels", JSON.stringify(levelsArray));
    } else {
        formData.set("levels", "");
    }

    try {
      if (editingItem) await editTournament(editingItem.id, formData);
      else await addTournament(formData);
      closeModal();
      await loadData();
    } catch (error) {
      alert("Failed to save tournament.");
    } finally { setIsSubmitting(false); }
  }

  async function handleCouponSubmit(formData: FormData) {
    setIsSubmitting(true);
    try {
      await addCoupon(formData);
      await loadData();
      (document.getElementById("coupon-form") as HTMLFormElement).reset();
    } catch (error) {
      alert("Failed to create coupon.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(id: number) {
    if (confirm("Delete this tournament and all its records?")) {
      await deleteTournament(id);
      loadData();
    }
  }

  async function handleDeleteCoupon(id: number) {
    if (confirm("Delete this coupon?")) {
      await deleteCoupon(id);
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

  const filteredRegistrations = viewingPlayers?.registrations?.filter((reg: any) => {
    if (playerFilter === 'PAID') return reg.status === 'COMPLETED';
    if (playerFilter === 'PENDING') return reg.status === 'PENDING';
    return true;
  }) || [];

  return (
    <div className="min-h-screen pb-20 p-4 md:p-8 font-sans bg-slate-50 text-slate-900">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 className="text-4xl font-[1000] text-slate-900 flex items-center gap-3 uppercase tracking-tighter">
            Tournament <span className="text-blue-600">Admin</span>
          </h1>
          <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest mt-1">Management & Full Player Analytics</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setIsCouponModalOpen(true)}
            className="bg-amber-400 hover:bg-slate-900 text-slate-900 hover:text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-[6px_6px_0px_#92400e] active:translate-y-1 active:shadow-none flex items-center gap-2"
          >
            <Ticket size={18} /> Manage Coupons
          </button>
          <button 
            onClick={() => { setEditingItem(null); setBannerUrl(""); setIsModalOpen(true); }}
            className="bg-blue-600 hover:bg-slate-900 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-[6px_6px_0px_#1e1b4b] active:translate-y-1 active:shadow-none"
          >
            <Plus size={18} className="inline mr-2" /> New Tournament
          </button>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="bg-white p-2 rounded-2xl border-4 border-slate-900 shadow-[6px_6px_0px_#f1f5f9] mb-10 flex items-center gap-3">
        <div className="bg-slate-100 p-3 rounded-xl"><Search className="text-slate-500" size={20} /></div>
        <input 
          type="text" 
          placeholder="SEARCH TOURNAMENTS..."
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
                        {t.bannerImage && <img src={t.bannerImage} alt="" className="w-full h-full object-cover" />}
                        <div className="absolute top-4 right-4"><span className={`px-3 py-1 rounded-lg text-[10px] font-black border-2 border-slate-900 shadow-[3px_3px_0px_#000] ${getStatusColor(t.status)}`}>{t.status}</span></div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow space-y-4">
                        <h3 className="font-[1000] text-slate-900 text-xl uppercase line-clamp-1">{t.title}</h3>
                        
                        <div className="flex gap-2">
                           {t.categories && JSON.parse(t.categories).map((cat: string) => (
                             <span key={cat} className="px-2 py-1 bg-slate-100 border border-slate-300 rounded text-[8px] font-bold uppercase">{cat}</span>
                           ))}
                        </div>

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

      {/* --- ADD/EDIT MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="bg-white border-4 border-slate-900 rounded-[40px] w-full max-w-2xl shadow-[15px_15px_0px_#000] overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="p-8 border-b-4 border-slate-900 flex justify-between items-center bg-slate-50">
              <h2 className="text-2xl font-[1000] text-slate-900 uppercase tracking-tighter">Tournament Editor</h2>
              <button onClick={closeModal} className="p-3 bg-white border-4 border-slate-900 text-slate-900 rounded-2xl hover:bg-slate-900 hover:text-white transition-all"><X size={24} /></button>
            </div>
            
            <form action={handleSubmit} className="p-10 space-y-6 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="md:col-span-2">
                    <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Banner Image</label>
                    <ImageUpload value={bannerUrl} onChange={setBannerUrl} />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-[10px] font-black uppercase text-slate-900 tracking-widest mb-2 flex items-center gap-2"><Gamepad2 size={14}/> Game Categories</label>
                    <div className="flex flex-wrap gap-4 bg-slate-50 p-4 rounded-2xl border-2 border-dashed border-slate-300">
                        {['Weiqi', 'Xiangqi', 'International Chess'].map((cat) => (
                           <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                              <input 
                                type="checkbox" 
                                name="categories" 
                                value={cat} 
                                defaultChecked={editingItem?.categories ? JSON.parse(editingItem.categories).includes(cat) : false}
                                className="w-5 h-5 border-2 border-slate-900 rounded checked:bg-blue-600 transition-all"
                              />
                              <span className="font-black uppercase text-[10px] text-slate-600 group-hover:text-blue-600 transition-colors">{cat}</span>
                           </label>
                        ))}
                    </div>
                </div>

                <div className="md:col-span-2">
                    <label className="block text-[10px] font-black uppercase text-slate-900 tracking-widest mb-2">Event Title</label>
                    <input name="title" defaultValue={editingItem?.title} required className="w-full p-4 border-4 border-slate-900 rounded-2xl font-black uppercase text-xs focus:ring-4 ring-blue-100 outline-none" />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-[10px] font-black uppercase text-slate-900 tracking-widest mb-2 flex items-center gap-2">
                      <ListOrdered size={14} className="text-blue-600"/> Skill Levels (Comma Separated)
                    </label>
                    <input 
                      name="levels" 
                      placeholder="e.g. Grade 1, Grade 2, Grade 3, Advanced"
                      defaultValue={editingItem?.levels ? JSON.parse(editingItem.levels).join(", ") : ""} 
                      className="w-full p-4 border-4 border-slate-900 rounded-2xl font-black uppercase text-xs focus:ring-4 ring-blue-100 outline-none" 
                    />
                </div>

                <div>
                    <label className="block text-[10px] font-black uppercase text-slate-900 tracking-widest mb-2">Fee (HKD)</label>
                    <input type="number" name="entryFee" defaultValue={editingItem?.entryFee} required className="w-full p-4 border-4 border-slate-900 rounded-2xl font-black text-xs outline-none" />
                </div>
                <div>
                    <label className="block text-[10px] font-black uppercase text-slate-900 tracking-widest mb-2">Max Players</label>
                    <input type="number" name="maxPlayers" defaultValue={editingItem?.maxPlayers} required className="w-full p-4 border-4 border-slate-900 rounded-2xl font-black text-xs outline-none" />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-[10px] font-black uppercase text-slate-900 tracking-widest mb-2">Location</label>
                    <input name="location" defaultValue={editingItem?.location} required className="w-full p-4 border-4 border-slate-900 rounded-2xl font-black uppercase text-[10px] outline-none" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  
{/* Start Date & Time */}
<div>
  <label className="block text-[10px] font-black uppercase text-slate-900 tracking-widest mb-2">
    Start Date & Time
  </label>
  <input
    type="datetime-local"
    name="startDate"
    defaultValue={
      editingItem?.startDate
        ? new Date(editingItem.startDate).toISOString().slice(0, 16)
        : ""
    }
    required
    className="w-full p-4 border-4 border-slate-900 rounded-2xl font-black text-xs outline-none"
  />
</div>

{/* End Date & Time */}
<div>
  <label className="block text-[10px] font-black uppercase text-slate-900 tracking-widest mb-2">
    End Date & Time
  </label>
  <input
    type="datetime-local"
    name="endDate"
    defaultValue={
      editingItem?.endDate
        ? new Date(editingItem.endDate).toISOString().slice(0, 16)
        : ""
    }
    required
    className="w-full p-4 border-4 border-slate-900 rounded-2xl font-black text-xs outline-none"
  />
</div>

</div>
              </div>
              <div>
  <label className="block text-[10px] font-black uppercase text-slate-900 tracking-widest mb-2">
    Tournament Status
  </label>

  <select
    name="status"
    defaultValue={editingItem?.status || "OPEN"}
    className="w-full p-4 border-4 border-slate-900 rounded-2xl font-black uppercase text-xs outline-none bg-white"
    required
  >
    <option value="OPEN">OPEN</option>
    <option value="ONGOING">ONGOING</option>
    <option value="COMPLETED">COMPLETED</option>
    <option value="CANCELLED">CANCELLED</option>
  </select>
</div>

              <button type="submit" disabled={isSubmitting} className="w-full py-5 bg-blue-600 hover:bg-slate-900 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-[6px_6px_0px_#1e1b4b] flex items-center justify-center gap-2">
                {isSubmitting ? <Loader2 className="animate-spin" /> : "Save Tournament"}
              </button>
            </form>
          </motion.div>
        </div>
      )}

      {/* --- COUPON HUB MODAL --- */}
      <AnimatePresence>
        {isCouponModalOpen && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white border-4 border-slate-900 rounded-[40px] w-full max-w-4xl shadow-[15px_15px_0px_#000] overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-8 border-b-4 border-slate-900 flex justify-between items-center bg-amber-50">
                <h2 className="text-2xl font-[1000] text-slate-900 uppercase tracking-tighter flex items-center gap-3">
                  <Ticket size={28} className="text-amber-600" /> Coupon Central
                </h2>
                <button onClick={() => setIsCouponModalOpen(false)} className="p-3 bg-white border-4 border-slate-900 text-slate-900 rounded-2xl hover:bg-slate-900 hover:text-white transition-all"><X size={24} /></button>
              </div>

              <div className="flex flex-col md:flex-row h-full overflow-hidden">
                {/* Coupon Creator */}
                <div className="w-full md:w-1/2 p-8 border-r-0 md:border-r-4 border-slate-900 overflow-y-auto">
                  <h3 className="text-sm font-black uppercase text-slate-400 tracking-widest mb-6">Create New Coupon</h3>
                  <form id="coupon-form" action={handleCouponSubmit} className="space-y-5">
                    <div>
                      <label className="block text-[10px] font-black uppercase text-slate-900 mb-2">Coupon Code</label>
                      <input name="code" placeholder="E.G. CHESS50" required className="w-full p-4 border-4 border-slate-900 rounded-xl font-black uppercase text-xs outline-none" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black uppercase text-slate-900 mb-2">Type</label>
                        <select name="discountType" className="w-full p-4 border-4 border-slate-900 rounded-xl font-black uppercase text-[10px] outline-none bg-white">
                          <option value="PERCENT">Percent (%)</option>
                          <option value="FIXED">Fixed (HK$)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase text-slate-900 mb-2">Value</label>
                        <input type="number" name="discountValue" placeholder="20" required className="w-full p-4 border-4 border-slate-900 rounded-xl font-black text-xs outline-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase text-slate-900 mb-2">Valid For Tournament (Optional)</label>
                      <select name="tournamentId" className="w-full p-4 border-4 border-slate-900 rounded-xl font-black uppercase text-[10px] outline-none bg-white">
                        <option value="">All Tournaments</option>
                        {tournaments.map(t => (
                          <option key={t.id} value={t.id}>{t.title}</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black uppercase text-slate-900 mb-2">Usage Limit</label>
                        <input type="number" name="usageLimit" placeholder="100" className="w-full p-4 border-4 border-slate-900 rounded-xl font-black text-xs outline-none" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase text-slate-900 mb-2">Expiry Date</label>
                        <input type="date" name="expiryDate" className="w-full p-4 border-4 border-slate-900 rounded-xl font-black text-xs outline-none" />
                      </div>
                    </div>

                    <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-amber-500 hover:bg-slate-900 text-white font-black uppercase tracking-widest rounded-xl transition-all shadow-[5px_5px_0px_#92400e] flex items-center justify-center gap-2">
                      {isSubmitting ? <Loader2 className="animate-spin" /> : "Mint Coupon"}
                    </button>
                  </form>
                </div>

                {/* Coupon List */}
                <div className="w-full md:w-1/2 p-8 bg-slate-50 overflow-y-auto">
                  <h3 className="text-sm font-black uppercase text-slate-400 tracking-widest mb-6">Existing Inventory</h3>
                  <div className="space-y-4">
                    {coupons.length === 0 ? (
                      <div className="text-center py-20 text-slate-300 font-black uppercase text-[10px]">No Coupons Minted</div>
                    ) : (
                      coupons.map((c) => (
                        <div key={c.id} className="bg-white border-4 border-slate-900 p-4 rounded-2xl shadow-[4px_4px_0px_#000] flex justify-between items-center">
                          <div>
                            <p className="font-black text-slate-900 uppercase text-xs">{c.code}</p>
                            <div className="flex gap-2 mt-1">
                              <span className="text-[8px] font-black px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded border border-emerald-200 uppercase">
                                {c.discountType === 'PERCENT' ? `${c.discountValue}% OFF` : `HK$${c.discountValue} OFF`}
                              </span>
                              <span className="text-[8px] font-black px-2 py-0.5 bg-blue-100 text-blue-700 rounded border border-blue-200 uppercase flex items-center gap-1">
                                <UserCheck size={8}/> {c.usedCount} / {c.usageLimit || '∞'}
                              </span>
                            </div>
                          </div>
                          <button onClick={() => handleDeleteCoupon(c.id)} className="p-2 text-red-400 hover:text-red-600 transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- PARTICIPANT DRAWER --- */}
      <AnimatePresence>
        {viewingPlayers && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setViewingPlayers(null)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 30 }} className="relative w-full max-w-3xl bg-white border-l-8 border-slate-900 h-full shadow-2xl flex flex-col">
              
              <div className="p-8 border-b-4 border-slate-900 bg-slate-900 text-white">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h2 className="text-3xl font-[1000] uppercase tracking-tighter leading-none">Participant Hub</h2>
                        <p className="text-[10px] font-bold text-slate-400 uppercase mt-2 tracking-widest">{viewingPlayers.title}</p>
                    </div>
                    <button onClick={() => setViewingPlayers(null)} className="p-3 bg-white text-slate-900 rounded-2xl hover:bg-blue-600 hover:text-white transition-all"><X size={24} /></button>
                </div>

                <div className="flex gap-2 p-1 bg-white/10 rounded-2xl w-fit">
                    {(['ALL', 'PAID', 'PENDING'] as const).map((tab) => (
                        <button 
                            key={tab}
                            onClick={() => setPlayerFilter(tab)}
                            className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all ${playerFilter === tab ? 'bg-white text-slate-900 shadow-lg' : 'text-white hover:bg-white/20'}`}
                        >
                            {tab} ({tab === 'ALL' ? viewingPlayers.registrations.length : viewingPlayers.registrations.filter((r:any) => tab === 'PAID' ? r.status === 'COMPLETED' : r.status === 'PENDING').length})
                        </button>
                    ))}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {filteredRegistrations.length === 0 ? (
                    <div className="text-center py-20 text-slate-300 font-black uppercase text-xs tracking-widest">No matching records found.</div>
                ) : (
                    filteredRegistrations.map((reg: any) => (
                        <div key={reg.id} className={`bg-white rounded-[24px] border-4 border-slate-900 transition-all ${expandedPlayer === reg.id ? 'translate-x-1 translate-y-1' : 'shadow-[6px_6px_0px_#f1f5f9]'}`}>
                            <div onClick={() => setExpandedPlayer(expandedPlayer === reg.id ? null : reg.id)} className="p-5 cursor-pointer flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-white ${reg.status === 'COMPLETED' ? 'bg-emerald-500' : 'bg-amber-500'}`}>
                                        {reg.playerName.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-black text-slate-900 uppercase tracking-tight">{reg.playerName}</p>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[9px] font-black bg-slate-100 px-2 py-0.5 rounded border border-slate-200 uppercase">{reg.studentCategory}</span>
                                            {reg.paymentGateway && (
                                              <span className={`text-[8px] font-black px-2 py-0.5 rounded border flex items-center gap-1 uppercase ${reg.paymentGateway === 'stripe' ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-emerald-50 border-emerald-200 text-emerald-600'}`}>
                                                {reg.paymentGateway === 'stripe' ? <ShieldCheck size={10}/> : <Landmark size={10}/>}
                                                {reg.paymentGateway}
                                              </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right hidden sm:block">
                                        <p className={`text-[10px] font-black uppercase ${reg.status === 'COMPLETED' ? 'text-emerald-600' : 'text-amber-600'}`}>{reg.status === 'COMPLETED' ? 'PAID' : 'PENDING'}</p>
                                    </div>
                                    {expandedPlayer === reg.id ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}
                                </div>
                            </div>
                            <AnimatePresence>
                                {expandedPlayer === reg.id && (
                                    <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden bg-slate-50 border-t-4 border-slate-900 rounded-b-[20px]">
                                        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                                            {/* PAYMENT INFO SECTION */}
                                            <div className="md:col-span-3 bg-white p-4 rounded-2xl border-2 border-slate-200 mb-2">
                                               <p className="text-[10px] font-black text-slate-400 uppercase mb-3 flex items-center gap-2"><CreditCard size={12}/> Transaction Verification</p>
                                               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                  <div className="flex flex-col">
                                                     <span className="text-[9px] font-bold text-slate-400 uppercase">Gateway Reference</span>
                                                     <span className="font-mono text-xs font-black break-all">{reg.transactionId || reg.stripeSessionId || "N/A"}</span>
                                                  </div>
                                                  <div className="flex flex-col">
                                                     <span className="text-[9px] font-bold text-slate-400 uppercase">Internal System ID</span>
                                                     <span className="font-mono text-xs font-black">{reg.id}</span>
                                                  </div>
                                               </div>
                                            </div>

                                            <div className="space-y-3">
                                                <p className="text-[10px] font-black text-slate-400 uppercase">Contact Info</p>
                                                <div className="flex items-center gap-2 text-xs font-bold break-all"><Mail size={14} className="text-blue-500 shrink-0"/> {reg.email}</div>
                                                <div className="flex items-center gap-2 text-xs font-bold"><Phone size={14} className="text-blue-500 shrink-0"/> {reg.phone}</div>
                                            </div>
                                            <div className="space-y-3">
                                                <p className="text-[10px] font-black text-slate-400 uppercase">Bio Profile</p>
                                                <div className="flex items-center gap-2 text-xs font-bold"><Cake size={14} className="text-orange-500 shrink-0"/> {new Date(reg.dob).toLocaleDateString()} ({calculateAge(reg.dob)} Yrs)</div>
                                                <div className="flex items-center gap-2 text-xs font-bold"><Baby size={14} className="text-indigo-500 shrink-0"/> {reg.gender}</div>
                                            </div>
                                            <div className="space-y-3">
                                                <p className="text-[10px] font-black text-slate-400 uppercase">Chess Stats</p>
                                                <div className="flex items-center gap-2 text-xs font-bold"><BarChart size={14} className="text-emerald-500 shrink-0"/> Rating: {reg.rating || "Unrated"}</div>
                                                <div className="flex items-center gap-2 text-xs font-bold"><Globe size={14} className="text-cyan-500 shrink-0"/> {reg.onlineUsername || "No Online Username"}</div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))
                )}
              </div>
              
              <div className="p-8 border-t-4 border-slate-900 bg-slate-50 flex gap-4">
                 <button onClick={() => window.print()} className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-xs flex items-center justify-center gap-2 hover:bg-blue-600 transition-all">
                    <Printer size={18} /> Print Attendance
                 </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}