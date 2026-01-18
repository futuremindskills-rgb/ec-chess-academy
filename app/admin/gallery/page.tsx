"use client";

import { useState, useEffect } from "react";
import { 
  addGalleryImage, 
  editGalleryImage, 
  deleteGalleryImage, 
  getGalleryImages 
} from "@/app/actions/adminActions";
import ImageUpload from "@/components/admin/ImageUpload";
import { 
  Plus, 
  Trash2, 
  Pencil, 
  X, 
  Image as ImageIcon, 
  Loader2, 
  Search 
} from "lucide-react";

export default function GalleryAdmin() {
  const [images, setImages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [editingItem, setEditingItem] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Initial Data Fetch
  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setIsLoading(true);
    try {
      const data = await getGalleryImages();
      setImages(data);
    } catch (error) {
      console.error("Failed to load images", error);
    } finally {
      setIsLoading(false);
    }
  }

  // Handle Create / Update
  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    
    // For gallery, 'src' is the field name used in the Prisma model/actions
    if (imageUrl) {
        formData.set("src", imageUrl);
    } else if (!editingItem) {
        alert("Please upload an image.");
        setIsSubmitting(false);
        return;
    }

    try {
      if (editingItem) {
        await editGalleryImage(editingItem.id, formData);
      } else {
        await addGalleryImage(formData);
      }
      
      closeModal();
      await loadData();
    } catch (error) {
      console.error("Error saving image", error);
      alert("Failed to save image.");
    } finally {
      setIsSubmitting(false);
    }
  }

  // Handle Delete
  async function handleDelete(id: number) {
    if (confirm("Are you sure you want to delete this image?")) {
      await deleteGalleryImage(id);
      loadData();
    }
  }

  // Modal Helpers
  function openAdd() {
    setEditingItem(null);
    setImageUrl("");
    setIsModalOpen(true);
  }

  function openEdit(item: any) {
    setEditingItem(item);
    setImageUrl(item.src);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setEditingItem(null);
    setImageUrl("");
  }

  // Filter Logic
  const filteredImages = images.filter(img => 
    img.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    img.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen pb-20">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
            <ImageIcon className="text-indigo-600" size={32} />
            Gallery Manager
          </h1>
          <p className="text-slate-500 mt-1">Manage photos for various categories.</p>
        </div>
        
        <button 
          onClick={openAdd} 
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-indigo-200 transition-all hover:-translate-y-1"
        >
          <Plus size={20} /> Add New Photo
        </button>
      </div>

      {/* --- SEARCH BAR --- */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-8 flex items-center gap-3">
        <Search className="text-slate-400" size={20} />
        <input 
          type="text" 
          placeholder="Search by title or category..." 
          className="flex-1 outline-none text-slate-700 placeholder:text-slate-400 font-medium"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* --- GALLERY GRID --- */}
      {isLoading ? (
        <div className="p-12 flex justify-center items-center text-indigo-600">
          <Loader2 size={40} className="animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredImages.length === 0 ? (
            <div className="col-span-full p-12 text-center text-slate-500 italic bg-white rounded-2xl border border-slate-200">
              No images found. Upload one to get started.
            </div>
          ) : (
            filteredImages.map((img) => (
              <div key={img.id} className="group bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
                
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden bg-slate-100">
                  <img 
                    src={img.src} 
                    alt={img.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-sm">
                    <button 
                      onClick={() => openEdit(img)} 
                      className="p-3 bg-white text-indigo-600 rounded-full hover:bg-indigo-50 transition-colors shadow-lg"
                    >
                      <Pencil size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(img.id)} 
                      className="p-3 bg-white text-red-600 rounded-full hover:bg-red-50 transition-colors shadow-lg"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  {/* Category Tag */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest rounded-md">
                        {img.category}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="font-bold text-slate-900 truncate">{img.title}</h3>
                  <p className="text-slate-500 text-xs mt-1 line-clamp-2">{img.description || "No description provided."}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* --- MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh]">
            
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-xl font-black text-slate-900 uppercase">
                {editingItem ? "Edit Photo" : "Upload Photo"}
              </h2>
              <button onClick={closeModal} className="p-2 hover:bg-slate-100 rounded-full text-slate-400"><X size={24} /></button>
            </div>
            
            <form action={handleSubmit} className="p-6 space-y-6 overflow-y-auto">
              
              <div className="space-y-2">
                <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest">Image Content</label>
                <ImageUpload value={imageUrl} onChange={setImageUrl} />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest">Image Title</label>
                <input 
                  name="title" 
                  defaultValue={editingItem?.title} 
                  required 
                  placeholder="e.g. Physics Workshop 2024"
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-bold text-slate-900" 
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest">Category</label>
                <select 
                  name="category" 
                  defaultValue={editingItem?.category || "Physics"} 
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-slate-900 appearance-none"
                >
                  <option value="Physics">Physics</option>
                  <option value="Chess">Chess</option>
                  <option value="Awards">Awards</option>
                  <option value="Events">Events</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest">Description (Optional)</label>
                <textarea 
                  name="description" 
                  defaultValue={editingItem?.description} 
                  rows={3} 
                  placeholder="Add a short caption..."
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-slate-600 resize-none" 
                />
              </div>

              <div className="pt-2">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isSubmitting && <Loader2 size={18} className="animate-spin" />}
                  {editingItem ? "Update Image" : "Publish to Gallery"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}