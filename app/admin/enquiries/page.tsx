"use client";

import { useState, useEffect } from "react";
import { getEnquiries, updateEnquiry, deleteEnquiry } from "@/app/actions/adminActions";
import { 
  Search, 
  Trash2, 
  X, 
  Loader2, 
  MessageSquare,
  Eye,
  CheckCircle,
  Clock,
  Archive,
  User,
  Phone,
  Mail
} from "lucide-react";

export default function EnquiriesAdmin() {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setIsLoading(true);
    try {
      const data = await getEnquiries();
      setEnquiries(data);
    } catch (error) {
      console.error("Failed to load enquiries", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleUpdate(formData: FormData) {
    if (!selectedItem) return;
    
    setIsSubmitting(true);
    try {
      await updateEnquiry(selectedItem.id, formData);
      closeModal();
      await loadData();
    } catch (error) {
      alert("Failed to update enquiry.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(id: number) {
    if (confirm("Are you sure you want to delete this enquiry permanently?")) {
      await deleteEnquiry(id);
      loadData();
    }
  }

  function openModal(item: any) {
    setSelectedItem(item);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setSelectedItem(null);
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return 'bg-blue-100 text-blue-700 ring-1 ring-blue-200';
      case 'Contacted': return 'bg-amber-100 text-amber-700 ring-1 ring-amber-200';
      case 'Closed': return 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200';
      default: return 'bg-slate-100 text-slate-700 ring-1 ring-slate-200';
    }
  };

  const filteredData = enquiries.filter(item => 
    item.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen pb-20">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
            <MessageSquare className="text-indigo-600" size={32} />
            Enquiries
          </h1>
          <p className="text-slate-500 mt-1">Manage incoming leads and student requests.</p>
        </div>
      </div>

      {/* --- SEARCH --- */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-6 flex items-center gap-3">
        <Search className="text-slate-400" size={20} />
        <input 
          type="text" 
          placeholder="Search by name, email or subject..." 
          className="flex-1 outline-none text-slate-700 placeholder:text-slate-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* --- DATA TABLE --- */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-12 flex justify-center items-center text-indigo-600">
            <Loader2 size={40} className="animate-spin" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date</th>
                  <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Parent / Contact</th>
                  <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Subject</th>
                  <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredData.length === 0 ? (
                    <tr>
                        <td colSpan={5} className="p-12 text-center text-slate-400 italic">No enquiries found.</td>
                    </tr>
                ) : (
                    filteredData.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="p-4 text-sm text-slate-500 font-medium">
                        {new Date(item.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        </td>
                        <td className="p-4">
                        <div className="font-bold text-slate-900">{item.parentName}</div>
                        <div className="text-xs text-slate-400">{item.email}</div>
                        </td>
                        <td className="p-4 text-sm text-slate-600 font-medium">{item.subject}</td>
                        <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${getStatusColor(item.status)}`}>
                            {item.status}
                        </span>
                        </td>
                        <td className="p-4 text-right">
                        <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => openModal(item)} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                            <Eye size={18} />
                            </button>
                            <button onClick={() => handleDelete(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 size={18} />
                            </button>
                        </div>
                        </td>
                    </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* --- DETAIL MODAL --- */}
      {isModalOpen && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
            
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Enquiry Details</h2>
              <button onClick={closeModal} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400"><X size={20}/></button>
            </div>
            
            <div className="p-8 space-y-6 overflow-y-auto">
              
              {/* Contact Card */}
              <div className="grid grid-cols-2 gap-6 p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
                <div className="space-y-1">
                  <label className="flex items-center gap-1 text-indigo-400 text-[10px] uppercase font-bold tracking-wider"><User size={12}/> Parent</label>
                  <p className="font-bold text-slate-900">{selectedItem.parentName}</p>
                </div>
                <div className="space-y-1">
                  <label className="flex items-center gap-1 text-indigo-400 text-[10px] uppercase font-bold tracking-wider"><User size={12}/> Student</label>
                  <p className="font-bold text-slate-900">{selectedItem.studentName || "—"}</p>
                </div>
                <div className="space-y-1">
                  <label className="flex items-center gap-1 text-indigo-400 text-[10px] uppercase font-bold tracking-wider"><Phone size={12}/> Phone</label>
                  <p className="font-bold text-slate-900">{selectedItem.phone}</p>
                </div>
                <div className="space-y-1">
                  <label className="flex items-center gap-1 text-indigo-400 text-[10px] uppercase font-bold tracking-wider"><Mail size={12}/> Email</label>
                  <p className="font-bold text-slate-900 truncate" title={selectedItem.email}>{selectedItem.email}</p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-slate-400 text-[10px] uppercase font-bold tracking-wider">Message / Inquiry</label>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
                    {selectedItem.message}
                </div>
              </div>

              {/* Edit Status & Notes Form */}
              <form action={handleUpdate} className="space-y-6 border-t border-slate-100 pt-6">
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-slate-700">Update Status</label>
                  <div className="flex flex-wrap gap-2">
                    {['New', 'Contacted', 'Closed'].map((status) => (
                      <label key={status} className="flex-1 min-w-[100px] cursor-pointer">
                        <input 
                          type="radio" 
                          name="status" 
                          value={status} 
                          defaultChecked={selectedItem.status === status}
                          className="peer sr-only"
                        />
                        <div className="py-2.5 text-center rounded-xl border border-slate-200 text-slate-500 text-xs font-bold peer-checked:bg-indigo-600 peer-checked:text-white peer-checked:border-indigo-600 transition-all">
                          {status}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-slate-700">Internal Admin Notes</label>
                  <textarea 
                    name="notes" 
                    defaultValue={selectedItem.notes}
                    placeholder="E.g. Called on Tuesday, student interested in Chess..."
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                    rows={4}
                  />
                </div>

                <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isSubmitting && <Loader2 size={18} className="animate-spin" />}
                  Save Updates
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}