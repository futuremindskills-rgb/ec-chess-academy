"use client";

import { useState, useEffect } from "react";
import { 
  addBlogPost, 
  editBlogPost, 
  deleteBlogPost, 
  getBlogPosts 
} from "@/app/actions/adminActions";
import ImageUpload from "@/components/admin/ImageUpload";
import { 
  Plus, 
  Pencil, 
  Trash2, 
  X, 
  Search, 
  FileText, 
  Loader2, 
  Clock,
  Sparkles
} from "lucide-react";

export default function BlogAdmin() {
  const [posts, setPosts] = useState<any[]>([]);
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
      const data = await getBlogPosts();
      setPosts(data);
    } catch (error) {
      console.error("Failed to load blog posts", error);
    } finally {
      setIsLoading(false);
    }
  }

  // Handle Create / Update
  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    
    // 1. Manually add the image URL from state
    if (imageUrl) {
        formData.set("image", imageUrl); 
    } else if (!editingItem) {
        alert("Please upload a cover image.");
        setIsSubmitting(false);
        return;
    }

    // 2. Handle Checkbox Logic 
    // (HTML forms don't send anything if unchecked, so we explicitly set it)
    const featured = formData.get("featured") === "on";
    formData.set("featured", featured ? "true" : "false");

    try {
      if (editingItem) {
        await editBlogPost(editingItem.id, formData);
      } else {
        await addBlogPost(formData);
      }
      
      closeModal();
      await loadData();
    } catch (error) {
      console.error("Error saving post", error);
      alert("Failed to save post.");
    } finally {
      setIsSubmitting(false);
    }
  }

  // Handle Delete
  async function handleDelete(id: number) {
    if (confirm("Are you sure you want to delete this article?")) {
      await deleteBlogPost(id);
      loadData();
    }
  }

  // Modal Helpers
  function openAdd() {
    setEditingItem(null);
    setImageUrl("");
    setIsModalOpen(true);
  }

  function openEdit(post: any) {
    setEditingItem(post);
    setImageUrl(post.image);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setEditingItem(null);
    setImageUrl("");
  }

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen pb-20">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
            <FileText className="text-amber-500" size={32} />
            Blog Management
          </h1>
          <p className="text-slate-500 mt-1">Write and manage articles for students.</p>
        </div>
        
        <button 
          onClick={openAdd} 
          className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-amber-200 transition-all hover:-translate-y-1"
        >
          <Plus size={20} /> Write Article
        </button>
      </div>

      {/* --- SEARCH BAR --- */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-8 flex items-center gap-3">
        <Search className="text-slate-400" size={20} />
        <input 
          type="text" 
          placeholder="Search articles by title or category..." 
          className="flex-1 outline-none text-slate-700 placeholder:text-slate-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* --- BLOG GRID --- */}
      {isLoading ? (
        <div className="p-12 flex justify-center items-center text-amber-500">
          <Loader2 size={40} className="animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.length === 0 ? (
            <div className="col-span-full p-12 text-center text-slate-500 italic bg-white rounded-2xl border border-slate-200">
              No articles found. Start writing!
            </div>
          ) : (
            filteredPosts.map((post) => (
              <div key={post.id} className="group bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-slate-800 text-[10px] font-bold uppercase tracking-wider rounded-md shadow-sm">
                        {post.category}
                    </span>
                  </div>

                  {post.featured && (
                    <div className="absolute top-3 right-3">
                        <span className="px-2 py-1 bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-md shadow-sm flex items-center gap-1">
                            <Sparkles size={10} fill="currentColor" /> Featured
                        </span>
                    </div>
                  )}
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-bold uppercase mb-2">
                    <Clock size={12} /> {post.readTime}
                  </div>
                  
                  <h3 className="font-bold text-slate-900 text-lg leading-tight mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-slate-500 text-sm line-clamp-3 mb-4 flex-grow">
                    {post.excerpt}
                  </p>

                  <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                    <button 
                      onClick={() => openEdit(post)} 
                      className="p-2 bg-slate-50 text-indigo-600 rounded-lg hover:bg-indigo-50 border border-slate-200 transition-colors"
                    >
                      <Pencil size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(post.id)} 
                      className="p-2 bg-slate-50 text-red-600 rounded-lg hover:bg-red-50 border border-slate-200 transition-colors"
                    >
                      <Trash2 size={16} />
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
            
            <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-20">
              <h2 className="text-2xl font-black text-slate-900">
                {editingItem ? "Edit Article" : "Write Article"}
              </h2>
              <button onClick={closeModal} className="p-2 hover:bg-slate-100 rounded-full text-slate-400">
                <X size={24} />
              </button>
            </div>
            
            <form action={handleSubmit} className="p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1 space-y-6">
                    <div className="space-y-2">
                        <label className="block text-xs font-bold text-slate-500 uppercase">Cover Image</label>
                        <ImageUpload value={imageUrl} onChange={setImageUrl} />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-xs font-bold text-slate-500 uppercase">Category</label>
                        <select 
                            name="category" 
                            defaultValue={editingItem?.category || "Physics"} 
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium"
                        >
                            <option value="Physics">Physics</option>
                            <option value="Chess & Logic">Chess & Logic</option>
                            <option value="Study Tips">Study Tips</option>
                            <option value="Career Skills">Career Skills</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-xs font-bold text-slate-500 uppercase">Read Time</label>
                        <input 
                            name="readTime" 
                            defaultValue={editingItem?.readTime} 
                            placeholder="e.g. 5 min read" 
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium" 
                        />
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-amber-50 border border-amber-100 rounded-xl">
                        <input 
                            type="checkbox" 
                            name="featured" 
                            id="featured"
                            defaultChecked={editingItem?.featured}
                            className="w-5 h-5 text-amber-600 rounded border-gray-300" 
                        />
                        <label htmlFor="featured" className="font-bold text-slate-700 text-sm cursor-pointer select-none">
                            Mark as Featured
                        </label>
                    </div>
                </div>

                <div className="md:col-span-2 space-y-6">
                    <div className="space-y-2">
                        <label className="block text-xs font-bold text-slate-500 uppercase">Article Title</label>
                        <input 
                            name="title" 
                            defaultValue={editingItem?.title} 
                            required 
                            placeholder="Enter a catchy title..." 
                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-lg text-slate-900" 
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-xs font-bold text-slate-500 uppercase">Short Excerpt</label>
                        <textarea 
                            name="excerpt" 
                            defaultValue={editingItem?.excerpt} 
                            required 
                            rows={3}
                            placeholder="A brief summary..." 
                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none text-slate-700 resize-none" 
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-xs font-bold text-slate-500 uppercase">Main Content</label>
                        <textarea 
                            name="content" 
                            defaultValue={editingItem?.content} 
                            rows={10}
                            placeholder="Write your full article here..." 
                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none text-slate-700 font-mono text-sm" 
                        />
                    </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button type="button" onClick={closeModal} className="px-6 py-3 font-bold text-slate-600 bg-white border border-slate-200 rounded-xl">
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow-lg flex items-center gap-2 disabled:opacity-70"
                >
                  {isSubmitting && <Loader2 size={18} className="animate-spin" />}
                  {editingItem ? "Update Article" : "Publish Article"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}