"use client";

import { useState, useEffect } from "react";
import { 
  getSiteBanner, 
  updateSiteBanner, 
  deleteSiteBanner 
} from "@/app/actions/adminActions";
import ImageUpload from "@/components/admin/ImageUpload";
import { 
  Trash2, 
  Save, 
  Loader2, 
  ExternalLink,
  Megaphone,
  Eye,
  EyeOff,
  Link as LinkIcon,
  AlertCircle,
  Image as ImageIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BannerAdmin() {
  const [banner, setBanner] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form State
  const [imageUrl, setImageUrl] = useState("");
  const [link, setLink] = useState("");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setIsLoading(true);
    try {
      const data = await getSiteBanner();
      if (data) {
        setBanner(data);
        setImageUrl(data.imageUrl || "");
        setLink(data.link || "");
        setIsActive(data.isActive);
      } else {
        setBanner(null);
      }
    } catch (error) {
      console.error("Failed to load banner settings", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSave() {
    if (!imageUrl) {
      alert("Please upload a banner image first.");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("imageUrl", imageUrl);
    formData.append("link", link);
    formData.append("isActive", isActive.toString());

    try {
      await updateSiteBanner(formData);
      await loadData();
      alert("Banner updated successfully!");
    } catch (error) {
      console.error("Error saving banner", error);
      alert("Failed to save banner.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete() {
    if (confirm("Are you sure you want to delete the banner? This will remove it from the website immediately.")) {
      setIsSubmitting(true);
      try {
        await deleteSiteBanner();
        setBanner(null);
        setImageUrl("");
        setLink("");
        setIsActive(false);
        alert("Banner deleted.");
      } catch (error) {
        console.error("Error deleting banner", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Loader2 size={40} className="animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-20 animate-in fade-in duration-500">
      
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3 uppercase tracking-tight">
          <Megaphone className="text-indigo-600" size={32} />
          Site Announcement Banner
        </h1>
        <p className="text-slate-500 mt-2 font-medium">
          Manage the top-level announcement image that appears above your Hero section.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        
       

        {/* CONFIGURATION FORM */}
        <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl p-8 md:p-10">
          <div className="space-y-8">
            
            {/* 1. STATUS TOGGLE */}
            <div className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100 transition-all">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl transition-colors ${isActive ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-400'}`}>
                  {isActive ? <Eye size={24} /> : <EyeOff size={24} />}
                </div>
                <div>
                  <h3 className="font-black text-slate-900 uppercase text-sm tracking-tight">Display Banner</h3>
                  <p className="text-xs text-slate-500 font-medium">Turn this on to show the banner to website visitors.</p>
                </div>
              </div>
              <button 
                onClick={() => setIsActive(!isActive)}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none ${isActive ? 'bg-green-500' : 'bg-slate-300'}`}
              >
                <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${isActive ? 'translate-x-7' : 'translate-x-1'}`} />
              </button>
            </div>

            {/* 2. IMAGE UPLOAD */}
            <div className="space-y-4">
               <label className="block text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-2">Banner Image (Recommended 1920x810px)</label>
               <div className="w-full max-w-xl">
                 <ImageUpload value={imageUrl} onChange={setImageUrl} />
               </div>
            </div>

            {/* 3. LINK SETTINGS */}
            <div className="space-y-4">
              <label className="block text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-2">Redirect URL (Optional)</label>
              <div className="relative flex items-center">
                <div className="absolute left-4 text-slate-400">
                  <LinkIcon size={18} />
                </div>
                <input 
                  type="url"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="https://your-tournament-link.com"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-bold text-slate-700"
                />
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleSave}
                disabled={isSubmitting}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-black uppercase tracking-widest transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                Save Banner Settings
              </button>
              
              {banner && (
                <button 
                  onClick={handleDelete}
                  disabled={isSubmitting}
                  className="bg-red-50 hover:bg-red-100 text-red-600 px-6 py-4 rounded-2xl font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                >
                  <Trash2 size={20} />
                  Delete
                </button>
              )}
            </div>

            {!banner && !isSubmitting && (
               <div className="mt-4 flex items-start gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100">
                  <AlertCircle className="text-amber-500 shrink-0" size={18} />
                  <p className="text-[10px] font-bold text-amber-700 leading-relaxed uppercase tracking-tight">
                    No active banner config found. Use the form above to publish your first announcement banner.
                  </p>
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}