"use client";

import { useState, useEffect } from "react";
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
  IndianRupee 
} from "lucide-react";

export default function TournamentAdmin() {
  const [tournaments, setTournaments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
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
    
    // Add banner image to form data
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
    if (confirm("Are you sure you want to delete this tournament?")) {
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
      case 'OPEN': return 'bg-emerald-100 text-emerald-700 ring-emerald-200';
      case 'ONGOING': return 'bg-blue-100 text-blue-700 ring-blue-200';
      case 'COMPLETED': return 'bg-slate-100 text-slate-700 ring-slate-200';
      case 'CANCELLED': return 'bg-red-100 text-red-700 ring-red-200';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const filteredTournaments = tournaments.filter(t => 
    t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen pb-20">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
            <Trophy className="text-blue-600" size={32} />
            Tournament Manager
          </h1>
          <p className="text-slate-500 mt-1">Organize and track your upcoming chess events.</p>
        </div>
        
        <button 
          onClick={openAdd} 
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-200 transition-all hover:-translate-y-1"
        >
          <Plus size={20} /> Create Tournament
        </button>
      </div>

      {/* --- SEARCH BAR --- */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-8 flex items-center gap-3">
        <Search className="text-slate-400" size={20} />
        <input 
          type="text" 
          placeholder="Search by tournament name or location..." 
          className="flex-1 outline-none text-slate-700 placeholder:text-slate-400 font-medium"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* --- TOURNAMENT GRID --- */}
      {isLoading ? (
        <div className="p-12 flex justify-center items-center text-blue-600">
          <Loader2 size={40} className="animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTournaments.length === 0 ? (
            <div className="col-span-full p-12 text-center text-slate-500 italic bg-white rounded-2xl border border-slate-200">
              No tournaments found. Create one to get started!
            </div>
          ) : (
            filteredTournaments.map((t) => (
              <div key={t.id} className="group bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
                
                {/* Banner Image */}
                <div className="relative h-40 overflow-hidden bg-slate-100">
                  <img 
                    src={t.bannerImage || "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&q=80&w=800"} 
                    alt={t.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ring-1 ${getStatusColor(t.status)}`}>
                        {t.status}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-grow space-y-4">
                  <div>
                    <h3 className="font-black text-slate-900 text-lg leading-tight line-clamp-1">{t.title}</h3>
                    <p className="text-slate-500 text-sm flex items-center gap-1 mt-1">
                        <MapPin size={14} className="text-slate-400" /> {t.location}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                    <div className="space-y-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Entry Fee</p>
                        <p className="font-bold text-slate-900 flex items-center gap-0.5"><IndianRupee size={14}/>{t.entryFee}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Players</p>
                        <p className="font-bold text-slate-900 flex items-center gap-1"><Users size={14}/>{t.maxPlayers} Max</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500 bg-slate-50 p-2 rounded-lg">
                    <Calendar size={14} />
                    {new Date(t.startDate).toLocaleDateString()} - {new Date(t.endDate).toLocaleDateString()}
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button 
                      onClick={() => openEdit(t)} 
                      className="p-2.5 bg-slate-50 text-blue-600 rounded-xl border border-slate-200 hover:bg-blue-50 transition-colors"
                    >
                      <Pencil size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(t.id)} 
                      className="p-2.5 bg-slate-50 text-red-600 rounded-xl border border-slate-200 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* --- ADD / EDIT MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh]">
            
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                {editingItem ? "Edit Tournament" : "New Tournament"}
              </h2>
              <button onClick={closeModal} className="p-2 hover:bg-slate-100 rounded-full text-slate-400"><X size={24} /></button>
            </div>
            
            <form action={handleSubmit} className="p-8 space-y-6 overflow-y-auto">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Banner Upload */}
                <div className="md:col-span-2 space-y-2">
                    <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest">Tournament Banner</label>
                    <ImageUpload value={bannerUrl} onChange={setBannerUrl} />
                </div>

                {/* Title */}
                <div className="md:col-span-2 space-y-2">
                    <label className="block text-sm font-bold text-slate-700">Event Title</label>
                    <input 
                    name="title" 
                    defaultValue={editingItem?.title} 
                    required 
                    placeholder="e.g. Annual Chess Championship 2024"
                    className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-900" 
                    />
                </div>

                {/* Description */}
                <div className="md:col-span-2 space-y-2">
                    <label className="block text-sm font-bold text-slate-700">Description</label>
                    <textarea 
                    name="description" 
                    defaultValue={editingItem?.description} 
                    required 
                    rows={3}
                    placeholder="Details about the format, prizes, etc."
                    className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-slate-700" 
                    />
                </div>

                {/* Fee & Players */}
                <div className="space-y-2">
                    <label className="block text-sm font-bold text-slate-700">Entry Fee (₹)</label>
                    <input 
                    type="number"
                    name="entryFee" 
                    defaultValue={editingItem?.entryFee} 
                    required 
                    placeholder="0 for free"
                    className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none" 
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-bold text-slate-700">Max Players</label>
                    <input 
                    type="number"
                    name="maxPlayers" 
                    defaultValue={editingItem?.maxPlayers} 
                    required 
                    placeholder="e.g. 50"
                    className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none" 
                    />
                </div>

                {/* Dates */}
                <div className="space-y-2">
                    <label className="block text-sm font-bold text-slate-700">Start Date & Time</label>
                    <input 
                    type="datetime-local"
                    name="startDate" 
                    defaultValue={editingItem?.startDate ? new Date(editingItem.startDate).toISOString().slice(0, 16) : ""} 
                    required 
                    className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none" 
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-bold text-slate-700">End Date & Time</label>
                    <input 
                    type="datetime-local"
                    name="endDate" 
                    defaultValue={editingItem?.endDate ? new Date(editingItem.endDate).toISOString().slice(0, 16) : ""} 
                    required 
                    className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none" 
                    />
                </div>

                {/* Location & Status */}
                <div className="space-y-2">
                    <label className="block text-sm font-bold text-slate-700">Location</label>
                    <input 
                    name="location" 
                    defaultValue={editingItem?.location} 
                    required 
                    placeholder="Venue address or 'Online'"
                    className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none" 
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-bold text-slate-700">Status</label>
                    <select 
                    name="status" 
                    defaultValue={editingItem?.status || "OPEN"} 
                    className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold"
                    >
                    <option value="OPEN">Open for Registration</option>
                    <option value="ONGOING">Ongoing</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="CANCELLED">Cancelled</option>
                    </select>
                </div>

              </div>

              <div className="pt-4 border-t border-slate-100">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isSubmitting && <Loader2 size={18} className="animate-spin" />}
                  {editingItem ? "Update Tournament" : "Launch Tournament"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}