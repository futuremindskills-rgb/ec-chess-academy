"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Search, 
  Calendar, 
  Clock, 
  ArrowRight, 
  BookOpen,
  Atom,
  Crown,
  BrainCircuit,
  ChevronRight,
  Loader2
} from "lucide-react";
import BlogBanner from "@/components/ui/blogBanner";
import { getBlogPosts } from "@/app/actions/adminActions";

// Categories should match the options in your Admin Panel
const categories = ["All", "Physics", "Chess & Logic", "Study Tips", "Career Skills"];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // 1. Fetch data from Prisma on mount
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getBlogPosts();
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch blog posts:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  // 2. Identify Featured Post (Top priority: featured flag, Secondary: newest post)
  const featuredPost = posts.find(post => post.featured) || posts[0];
  
  // 3. Filtering Logic for the grid
  const filteredPosts = posts.filter(post => {
    // Exclude the featured post from the general grid to avoid duplication
    if (post.id === featuredPost?.id) return false;

    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="bg-slate-50 min-h-screen font-sans">
      <BlogBanner />

      <div className="container mx-auto px-4 md:px-8 max-w-7xl -mt-10 relative z-20 pb-20">
        
        {isLoading ? (
          <div className="flex flex-col justify-center items-center py-40 gap-4">
            <Loader2 className="w-12 h-12 text-teal-600 animate-spin" />
            <p className="text-slate-500 font-bold animate-pulse">Fetching latest articles...</p>
          </div>
        ) : (
          <>
            {/* --- FEATURED POST SECTION --- */}
            {featuredPost && !searchTerm && activeCategory === "All" && (
              <section className="mb-16">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-[2rem] p-6 md:p-8 shadow-2xl shadow-slate-900/10 border border-slate-100 flex flex-col lg:flex-row gap-8 items-center"
                >
                  <div className="w-full lg:w-1/2 relative h-64 lg:h-96 rounded-2xl overflow-hidden group bg-slate-100">
                     <img 
                       src={featuredPost.image} 
                       alt={featuredPost.title} 
                       className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                     />
                     <div className="absolute top-4 left-4 bg-teal-600 text-white text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest shadow-lg">
                       Featured Story
                     </div>
                  </div>

                  <div className="w-full lg:w-1/2 flex flex-col justify-center p-4">
                     <div className="flex items-center gap-4 text-xs text-slate-400 mb-4 font-bold uppercase tracking-widest">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={14} className="text-teal-500" /> 
                          {new Date(featuredPost.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock size={14} className="text-teal-500" /> {featuredPost.readTime}
                        </span>
                     </div>
                     
                     <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
                        {featuredPost.title}
                     </h2>
                     
                     <p className="text-slate-500 text-lg mb-8 leading-relaxed line-clamp-3">
                        {featuredPost.excerpt}
                     </p>

                     <Link 
                        href={`/blog/${featuredPost.slug}`}
                        className="group inline-flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-teal-600 transition-all shadow-xl shadow-slate-900/20"
                      >
                        Read Full Article
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                     </Link>
                  </div>
                </motion.div>
              </section>
            )}

            {/* --- FILTER CONTROLS --- */}
            <nav className="flex flex-col lg:flex-row justify-between items-center gap-8 mb-12">
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`
                      px-6 py-2.5 rounded-xl text-sm font-black tracking-tight transition-all
                      ${activeCategory === cat 
                        ? "bg-teal-600 text-white shadow-lg shadow-teal-200" 
                        : "bg-white text-slate-500 border border-slate-200 hover:border-teal-400 hover:text-teal-600 shadow-sm"}
                    `}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative w-full lg:w-80">
                 <input 
                   type="text" 
                   placeholder="Search articles..." 
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl text-sm font-bold shadow-sm focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all"
                 />
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
              </div>
            </nav>

            {/* --- BLOG GRID --- */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post) => (
                    <motion.article
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      key={post.id}
                      className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-teal-900/10 transition-all duration-500 flex flex-col h-full"
                    >
                      <Link href={`/blog/${post.slug}`} className="block relative h-64 overflow-hidden bg-slate-100">
                         <img 
                           src={post.image} 
                           alt={post.title} 
                           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                         />
                         <div className="absolute top-4 left-4">
                            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-white/95 backdrop-blur-md text-slate-900 text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg">
                               {post.category.includes('Chess') ? <Crown size={12} className="text-amber-500"/> : 
                                post.category.includes('Physics') ? <Atom size={12} className="text-teal-500"/> : 
                                <BrainCircuit size={12} className="text-indigo-500"/>}
                               {post.category}
                            </span>
                         </div>
                      </Link>

                      <div className="p-8 flex flex-col flex-grow">
                         <div className="flex items-center gap-3 text-[10px] text-slate-400 font-black uppercase tracking-widest mb-4">
                            <span>{new Date(post.date).toLocaleDateString()}</span>
                            <span className="w-1 h-1 rounded-full bg-teal-500"></span>
                            <span>{post.readTime}</span>
                         </div>

                         <h3 className="text-xl font-black text-slate-900 mb-4 group-hover:text-teal-600 transition-colors line-clamp-2">
                            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                         </h3>
                         
                         <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-3">
                            {post.excerpt}
                         </p>

                         <Link 
                            href={`/blog/${post.slug}`} 
                            className="mt-auto inline-flex items-center gap-2 text-sm font-black text-slate-900 group-hover:text-teal-600 transition-all"
                          >
                            Keep Reading <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                         </Link>
                      </div>
                    </motion.article>
                  ))
                ) : (
                  <div className="col-span-full text-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
                    <BookOpen className="w-16 h-16 mx-auto mb-6 text-slate-200" />
                    <p className="text-xl font-black text-slate-400 uppercase tracking-widest">No matching articles found</p>
                    <button 
                        onClick={() => {setActiveCategory("All"); setSearchTerm("");}} 
                        className="mt-4 text-teal-600 font-bold hover:underline"
                    >
                        Clear filters
                    </button>
                  </div>
                )}
              </AnimatePresence>
            </section>
          </>
        )}
      </div>
    </main>
  );
}