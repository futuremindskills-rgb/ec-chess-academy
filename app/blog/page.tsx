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
  ChevronRight,
  Loader2,
} from "lucide-react";
import BlogBanner from "@/components/ui/blogBanner";
import { getBlogPosts } from "@/app/actions/adminActions";
import { useLocale } from "next-intl";

export default function BlogPage() {
  const locale = useLocale();
  const isZh = locale === "zh";

  // Categories localized for HK
  const categories = isZh 
    ? ["全部", "棋藝與邏輯", "棋藝技巧"] 
    : ["All", "Chess & Logic", "Skills"];

  const [activeCategory, setActiveCategory] = useState(isZh ? "全部" : "All");
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getBlogPosts();
        setPosts(data || []);
      } catch (error) {
        console.error("Failed to fetch blog posts:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const featuredPost = posts.find((post) => post.featured) || posts[0];

  const filteredPosts = posts.filter((post) => {
    if (post.id === featuredPost?.id) return false;

    // Check category match (handling both EN/ZH state)
    const matchesCategory =
      activeCategory === "All" || activeCategory === "全部" || post.category === activeCategory;

    const matchesSearch =
      post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <main className="bg-slate-50 min-h-screen font-sans">
      <BlogBanner />

      <div className="container mx-auto px-4 md:px-8 max-w-7xl -mt-10 relative z-20 pb-20">
        {isLoading ? (
          <div className="flex flex-col justify-center items-center py-40 gap-4">
            <Loader2 className="w-12 h-12 text-teal-600 animate-spin" />
            <p className="text-slate-500 font-bold animate-pulse">
              {isZh ? "正在載入最新文章..." : "Fetching latest articles..."}
            </p>
          </div>
        ) : (
          <>
            {/* FEATURED POST */}
            {featuredPost && !searchTerm && (activeCategory === "All" || activeCategory === "全部") && (
              <section className="mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-[2rem] p-6 md:p-8 shadow-2xl border flex flex-col lg:flex-row gap-8 items-center"
                >
                  <div className="w-full lg:w-1/2 relative h-64 lg:h-96 rounded-2xl overflow-hidden">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-lg font-black text-[10px] uppercase tracking-widest">
                      {isZh ? "精選文章" : "Featured"}
                    </div>
                  </div>

                  <div className="w-full lg:w-1/2">
                    <div className="flex gap-4 text-xs text-slate-400 mb-4 font-bold uppercase">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {new Date(featuredPost.date).toLocaleDateString(isZh ? 'zh-HK' : 'en-US')}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {featuredPost.readTime}
                      </span>
                    </div>

                    <h2 className="text-3xl font-black mb-4 text-slate-900 leading-tight">
                      {featuredPost.title}
                    </h2>

                    <p className="text-slate-500 mb-6 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>

                    <Link
                      href={`/blog/${encodeURIComponent(featuredPost.slug)}`}
                      className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-teal-600 transition-colors"
                    >
                      {isZh ? "閱讀全文" : "Read Full Article"} <ArrowRight size={18} />
                    </Link>
                  </div>
                </motion.div>
              </section>
            )}

            {/* FILTER & SEARCH */}
            <nav className="flex flex-col lg:flex-row justify-between items-center gap-8 mb-12">
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-6 py-2.5 rounded-xl font-bold transition-all ${
                      activeCategory === cat
                        ? "bg-teal-600 text-white shadow-lg shadow-teal-200"
                        : "bg-white border text-slate-500 hover:border-teal-600"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative w-full lg:w-80">
                <input
                  type="text"
                  placeholder={isZh ? "搜尋文章內容..." : "Search articles..."}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-slate-100 rounded-2xl focus:border-teal-600 outline-none transition-all"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              </div>
            </nav>

            {/* BLOG GRID */}
            <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post) => (
                    <motion.article
                      key={post.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="bg-white rounded-3xl overflow-hidden border border-slate-100 hover:shadow-xl transition-all group"
                    >
                      <Link
                        href={`/blog/${encodeURIComponent(post.slug)}`}
                        className="block h-56 overflow-hidden"
                      >
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </Link>

                      <div className="p-8 flex flex-col h-full">
                        <div className="flex items-center gap-3 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
                          <span>{new Date(post.date).toLocaleDateString(isZh ? 'zh-HK' : 'en-US')}</span>
                          <span className="w-1 h-1 bg-slate-200 rounded-full" />
                          <span>{post.readTime}</span>
                        </div>

                        <h3 className="font-bold text-xl mb-4 text-slate-900 group-hover:text-teal-600 transition-colors line-clamp-2">
                          <Link href={`/blog/${encodeURIComponent(post.slug)}`}>
                            {post.title}
                          </Link>
                        </h3>

                        <p className="text-sm text-slate-500 mb-6 line-clamp-3 leading-relaxed">
                          {post.excerpt}
                        </p>

                        <Link
                          href={`/blog/${encodeURIComponent(post.slug)}`}
                          className="mt-auto font-black text-[11px] uppercase tracking-widest flex items-center gap-1 text-slate-900 hover:text-teal-600 transition-colors"
                        >
                          {isZh ? "繼續閱讀" : "Keep Reading"} <ChevronRight size={16} />
                        </Link>
                      </div>
                    </motion.article>
                  ))
                ) : (
                  <div className="col-span-full text-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
                    <BookOpen className="mx-auto mb-4 text-slate-300 w-12 h-12" />
                    <p className="text-slate-400 font-bold">
                      {isZh ? "找不到相關網誌文章" : "No articles found matching your criteria"}
                    </p>
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