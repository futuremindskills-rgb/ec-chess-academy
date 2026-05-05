"use client";

import { useState, useEffect } from "react";
import { 
  getAlbums, 
  createAlbum, 
  updateAlbum, 
  deleteAlbum, 
  deleteAlbumImage 
} from "@/app/actions/adminActions";
import { 
  Plus, Trash2, Pencil, X, FolderOpen, Loader2, Search, 
  ChevronLeft, Image as ImageIcon, Layers, ExternalLink, Upload 
} from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";

export default function GalleryAdmin() {
  const [albums, setAlbums] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [view, setView] = useState<'list' | 'detail'>('list');
  const [selectedAlbum, setSelectedAlbum] = useState<any>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAlbum, setEditingAlbum] = useState<any>(null);
  const [multiImageUrls, setMultiImageUrls] = useState<string[]>([]);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setIsLoading(true);
    try {
      const data = await getAlbums();
      setAlbums(data);
      if (selectedAlbum) {
        const updated = data.find((a: any) => a.id === selectedAlbum.id);
        setSelectedAlbum(updated || null);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  // Bulk Upload using Cloudinary Widget
  const handleBulkUpload = (result: any) => {
    if (result?.info?.files) {
      const urls = result.info.files.map((file: any) => file.uploadInfo.secure_url);
      setMultiImageUrls(prev => [...prev, ...urls]);
    } else if (result?.info?.secure_url) {
      // Fallback for single upload
      setMultiImageUrls(prev => [...prev, result.info.secure_url]);
    }
  };

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
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
      console.error(error);
      alert("Failed to save album.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function openAdd() {
    setEditingAlbum(null);
    setMultiImageUrls([]);
    setIsModalOpen(true);
  }

  function openEdit(album: any) {
    setEditingAlbum(album);
    setMultiImageUrls([]);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setEditingAlbum(null);
    setMultiImageUrls([]);
  }

  const filteredAlbums = albums.filter(album =>
    album.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    album.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Detail View
  if (view === 'detail' && selectedAlbum) {
    return (
      <div className="min-h-screen pb-20">
        <button onClick={() => setView('list')} className="flex items-center gap-2 mb-6 text-slate-500 hover:text-indigo-600 font-bold">
          <ChevronLeft size={20} /> Back to Albums
        </button>

        <div className="flex flex-col md:flex-row justify-between mb-8">
          <div>
            <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-black uppercase tracking-widest">
              {selectedAlbum.category}
            </span>
            <h1 className="text-4xl font-black mt-2">{selectedAlbum.title}</h1>
            <p className="text-slate-500 mt-2">{selectedAlbum.description}</p>
          </div>
          <button onClick={() => openEdit(selectedAlbum)} className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2">
            <Plus size={20} /> Add More Photos
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {selectedAlbum.images?.map((img: any) => (
            <div key={img.id} className="group relative aspect-square rounded-2xl overflow-hidden border border-slate-200">
              <img src={img.src} className="w-full h-full object-cover" alt="" />
              <button onClick={() => handleDeleteSingleImage(img.id)} className="absolute top-3 right-3 p-3 bg-white text-red-600 rounded-full opacity-0 group-hover:opacity-100">
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black flex items-center gap-3">
          <FolderOpen className="text-indigo-600" size={32} />
          Gallery Albums
        </h1>
        <button onClick={openAdd} className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2">
          <Plus size={20} /> Create New Album
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border mb-8 flex items-center gap-3">
        <Search className="text-slate-400" size={20} />
        <input type="text" placeholder="Search albums..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="flex-1 outline-none" />
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20"><Loader2 size={40} className="animate-spin text-indigo-600" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAlbums.map((album) => (
            <div key={album.id} className="bg-white rounded-3xl border overflow-hidden shadow-sm hover:shadow-xl group">
              <div className="relative h-52 bg-slate-100 overflow-hidden">
                {album.images?.[0] ? (
                  <img src={album.images[0].src} className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt="" />
                ) : (
                  <div className="h-full flex items-center justify-center text-slate-300"><ImageIcon size={64} /></div>
                )}
                <div className="absolute top-4 left-4 px-3 py-1 bg-black/70 text-white text-xs font-bold rounded-lg">{album.category}</div>
                <div className="absolute bottom-4 right-4 bg-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <Layers size={14} /> {album.images?.length || 0}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl">{album.title}</h3>
                <p className="text-slate-500 text-sm mt-2 line-clamp-2">{album.description || "No description"}</p>
                <div className="flex justify-between mt-6 pt-6 border-t">
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(album)}><Pencil size={18} /></button>
                    <button onClick={() => handleDeleteAlbum(album.id)} className="text-red-600"><Trash2 size={18} /></button>
                  </div>
                  <button onClick={() => { setSelectedAlbum(album); setView('detail'); }} className="text-indigo-600 font-bold">Manage →</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL - BULK UPLOAD */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="p-6 border-b">
              <h2 className="text-xl font-black">
                {editingAlbum ? "Add Photos to Album" : "Create New Album"}
              </h2>
            </div>

            <form action={handleSubmit} className="flex-1 overflow-auto p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500">Title</label>
                  <input name="title" defaultValue={editingAlbum?.title} required className="w-full p-4 border rounded-2xl mt-1" />
                </div>
                <div>
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500">Category</label>
                  <select name="category" defaultValue={editingAlbum?.category} className="w-full p-4 border rounded-2xl mt-1">
                    <option value="Academy">Academy</option>
                    <option value="Tournament">Tournament</option>
                    <option value="Events">Events</option>
                    <option value="Workshops">Workshops</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-black uppercase tracking-widest text-slate-500">Description</label>
                <textarea name="description" defaultValue={editingAlbum?.description} rows={3} className="w-full p-4 border rounded-2xl mt-1" />
              </div>

              {/* BULK UPLOAD WIDGET */}
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3 block">
                  Upload Multiple Images
                </label>

                <CldUploadWidget
                  uploadPreset="physics"
                  onSuccess={handleBulkUpload}
                  options={{
                    maxFiles: 20,           // Allow up to 20 images at once
                    multiple: true,
                    sources: ["local", "url", "camera"]
                  }}
                >
                  {({ open }) => (
                    <div
                      onClick={() => open()}
                      className="border-2 border-dashed border-slate-300 rounded-3xl p-12 text-center cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition-all"
                    >
                      <Upload size={48} className="mx-auto text-slate-400 mb-4" />
                      <p className="font-semibold text-lg">Click to upload multiple images</p>
                      <p className="text-slate-500 mt-1">You can select many photos at once</p>
                    </div>
                  )}
                </CldUploadWidget>

                {/* Preview Selected Images */}
                {multiImageUrls.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mt-6">
                    {multiImageUrls.map((url, index) => (
                      <div key={index} className="relative aspect-square rounded-2xl overflow-hidden border group">
                        <img src={url} alt="preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setMultiImageUrls(prev => prev.filter((_, i) => i !== index))}
                          className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl disabled:opacity-70"
              >
                {isSubmitting ? "Saving..." : editingAlbum ? "Add Photos" : "Create Album"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );

  async function handleDeleteAlbum(id: number) {
    if (confirm("Delete album and all photos?")) {
      await deleteAlbum(id);
      loadData();
    }
  }

  async function handleDeleteSingleImage(imageId: number) {
    if (confirm("Delete this photo?")) {
      await deleteAlbumImage(imageId);
      loadData();
    }
  }
}