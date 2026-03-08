"use client";

import { useState, useEffect } from "react";
import { 
  getAlbums, 
  createAlbum, 
  deleteAlbum, 
  updateAlbum, 
  deleteAlbumImage 
} from "@/app/actions/adminActions";
import ImageUpload from "@/components/admin/ImageUpload";
import { 
  Plus, 
  Trash2, 
  Pencil, 
  X, 
  FolderOpen, 
  Loader2, 
  Search, 
  ChevronLeft, 
  Image as ImageIcon,
  Layers,
  ExternalLink
} from "lucide-react";

export default function GalleryAdmin() {
  const [albums, setAlbums] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Navigation State
  const [view, setView] = useState<'list' | 'detail'>('list');
  const [selectedAlbum, setSelectedAlbum] = useState<any>(null);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAlbum, setEditingAlbum] = useState<any>(null);
  const [multiImageUrls, setMultiImageUrls] = useState<string[]>([""]); // Array for multiple uploads
  const [searchTerm, setSearchTerm] = useState("");

  // Initial Data Fetch
  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setIsLoading(true);
    try {
      const data = await getAlbums();
      setAlbums(data);
      // Refresh selected album if we are in detail view
      if (selectedAlbum) {
        const updated = data.find(a => a.id === selectedAlbum.id);
        setSelectedAlbum(updated || null);
        if (!updated) setView('list');
      }
    } catch (error) {
      console.error("Failed to load albums", error);
    } finally {
      setIsLoading(false);
    }
  }

  // --- Multi-Image Logic ---
  const addImageSlot = () => setMultiImageUrls([...multiImageUrls, ""]);
  
  const updateImageUrl = (index: number, url: string) => {
    const newUrls = [...multiImageUrls];
    newUrls[index] = url;
    setMultiImageUrls(newUrls);
  };

  const removeImageSlot = (index: number) => {
    setMultiImageUrls(multiImageUrls.filter((_, i) => i !== index));
  };

  // --- CRUD Handlers ---
  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    
    // Filter out empty strings from the upload array
    const validUrls = multiImageUrls.filter(url => url.trim() !== "");

    try {
      if (editingAlbum) {
        await updateAlbum(editingAlbum.id, formData, validUrls);
      } else {
        if (validUrls.length === 0) {
            alert("Please upload at least one image.");
            setIsSubmitting(false);
            return;
        }
        await createAlbum(formData, validUrls);
      }
      
      closeModal();
      await loadData();
    } catch (error) {
      console.error("Error saving album", error);
      alert("Failed to save album.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDeleteAlbum(id: number) {
    if (confirm("Are you sure? This will delete the entire album and all photos inside it.")) {
      await deleteAlbum(id);
      loadData();
    }
  }

  async function handleDeleteSingleImage(imageId: number) {
    if (confirm("Remove this photo from the album?")) {
        await deleteAlbumImage(imageId);
        loadData();
    }
  }

  // --- Modal Helpers ---
  function openAdd() {
    setEditingAlbum(null);
    setMultiImageUrls([""]);
    setIsModalOpen(true);
  }

  function openEdit(album: any) {
    setEditingAlbum(album);
    setMultiImageUrls([]); // Start empty for updates (to add NEW images)
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setEditingAlbum(null);
    setMultiImageUrls([""]);
  }

  // Filter Logic
  const filteredAlbums = albums.filter(album => 
    album.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    album.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- DETAIL VIEW: Images inside a specific album ---
  if (view === 'detail' && selectedAlbum) {
    return (
        <div className="min-h-screen pb-20 animate-in fade-in duration-500">
            <button 
                onClick={() => setView('list')}
                className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold mb-6 transition-colors"
            >
                <ChevronLeft size={20} /> Back to Albums
            </button>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
                <div>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-black uppercase tracking-widest">
                        {selectedAlbum.category}
                    </span>
                    <h1 className="text-4xl font-black text-slate-900 mt-2">{selectedAlbum.title}</h1>
                    <p className="text-slate-500 mt-2 max-w-2xl">{selectedAlbum.description}</p>
                </div>
                <button 
                    onClick={() => openEdit(selectedAlbum)}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg hover:bg-indigo-700 transition-all"
                >
                    <Plus size={20} /> Add More Photos
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {selectedAlbum.images.map((img: any) => (
                    <div key={img.id} className="group relative aspect-square rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-sm">
                        <img src={img.src} alt="" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                        <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button 
                                onClick={() => handleDeleteSingleImage(img.id)}
                                className="p-3 bg-white text-red-600 rounded-full hover:bg-red-50 shadow-xl"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
  }

  // --- LIST VIEW: All Albums ---
  return (
    <div className="min-h-screen pb-20">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
            <FolderOpen className="text-indigo-600" size={32} />
            Gallery Albums
          </h1>
          <p className="text-slate-500 mt-1">Group photos into collections by event or category.</p>
        </div>
        
        <button 
          onClick={openAdd} 
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-indigo-200 transition-all hover:-translate-y-1"
        >
          <Plus size={20} /> Create New Album
        </button>
      </div>

      {/* SEARCH */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-8 flex items-center gap-3">
        <Search className="text-slate-400" size={20} />
        <input 
          type="text" 
          placeholder="Search albums by title or category..." 
          className="flex-1 outline-none text-slate-700 placeholder:text-slate-400 font-medium"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="p-12 flex justify-center"><Loader2 size={40} className="animate-spin text-indigo-600" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAlbums.length === 0 ? (
            <div className="col-span-full p-20 text-center bg-white rounded-3xl border-2 border-dashed border-slate-200 text-slate-400 font-bold">
              No albums found. Create your first collection to get started.
            </div>
          ) : (
            filteredAlbums.map((album) => (
              <div key={album.id} className="group bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
                
                {/* Album Cover Preview */}
                <div className="relative h-52 bg-slate-100 overflow-hidden">
                  {album.images?.[0] ? (
                    <img 
                        src={album.images[0].src} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                        alt="" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                        <ImageIcon size={48} />
                    </div>
                  )}
                  
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest rounded-lg">
                        {album.category}
                    </span>
                  </div>

                  <div className="absolute bottom-4 right-4 bg-white px-3 py-1 rounded-full shadow-sm text-xs font-black flex items-center gap-2">
                    <Layers size={14} /> {album.images?.length || 0} Photos
                  </div>
                </div>

                {/* Album Details */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-slate-900 line-clamp-1">{album.title}</h3>
                  <p className="text-slate-500 text-sm mt-2 line-clamp-2 min-h-[40px]">
                    {album.description || "No description provided."}
                  </p>

                  <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-50">
                    <div className="flex gap-2">
                        <button 
                            onClick={() => openEdit(album)} 
                            className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-indigo-600 transition-colors"
                        >
                            <Pencil size={18} />
                        </button>
                        <button 
                            onClick={() => handleDeleteAlbum(album.id)} 
                            className="p-2 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-600 transition-colors"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                    <button 
                        onClick={() => { setSelectedAlbum(album); setView('detail'); }}
                        className="flex items-center gap-1 text-sm font-black text-indigo-600 hover:gap-2 transition-all uppercase tracking-wider"
                    >
                        Manage Photos <ExternalLink size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* MODAL: CREATE / EDIT ALBUM */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh]">
            
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-xl font-black text-slate-900 uppercase">
                {editingAlbum ? "Edit Album Details" : "Create New Album"}
              </h2>
              <button onClick={closeModal} className="p-2 hover:bg-slate-100 rounded-full text-slate-400"><X size={24} /></button>
            </div>
            
            <form action={handleSubmit} className="p-6 space-y-6 overflow-y-auto">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest">Album Title</label>
                    <input 
                        name="title" 
                        defaultValue={editingAlbum?.title} 
                        required 
                        placeholder="e.g. Winter Tournament 2024"
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 font-bold" 
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest">Category</label>
                    <select 
                        name="category" 
                        defaultValue={editingAlbum?.category || "Academy"} 
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold appearance-none"
                    >
                        <option value="Tournament">Tournament</option>
                        <option value="Academy">Academy</option>
                        <option value="Events">Events</option>
                        <option value="Workshops">Workshops</option>
                    </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest">Album Description</label>
                <textarea 
                  name="description" 
                  defaultValue={editingAlbum?.description} 
                  rows={2} 
                  placeholder="Describe this collection..."
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" 
                />
              </div>

              {/* DYNAMIC MULTI-IMAGE UPLOAD AREA */}
              <div className="space-y-4">
                <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest">
                    {editingAlbum ? "Add New Photos" : "Upload Photos"}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {multiImageUrls.map((url, index) => (
                        <div key={index} className="relative group animate-in zoom-in-95 duration-200">
                            <ImageUpload value={url} onChange={(val) => updateImageUrl(index, val)} />
                            {multiImageUrls.length > 1 && (
                                <button 
                                    type="button" 
                                    onClick={() => removeImageSlot(index)} 
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X size={12}/>
                                </button>
                            )}
                        </div>
                    ))}
                    
                    <button 
                        type="button" 
                        onClick={addImageSlot}
                        className="border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center p-4 hover:border-indigo-400 hover:bg-indigo-50 transition-all text-slate-400 hover:text-indigo-600 min-h-[120px]"
                    >
                        <Plus size={24} />
                        <span className="text-[10px] font-bold uppercase mt-2">More Slots</span>
                    </button>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase tracking-widest rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : (editingAlbum ? "Update Album" : "Publish Album")}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}