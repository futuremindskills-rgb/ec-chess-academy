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
  Crown,
  BrainCircuit,
  ChevronRight,
  Loader2,
} from "lucide-react";
import BlogBanner from "@/components/ui/blogBanner";
import { getBlogPosts } from "@/app/actions/adminActions";
import { useLocale } from "next-intl";

const categories = ["All", "Chess & Logic", "Skills"];

export default function BlogPage() {
  const locale = useLocale();
  const isZh = locale === "zh";
  const [activeCategory, setActiveCategory] = useState("All");
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

    const matchesCategory =
      activeCategory === "All" || post.category === activeCategory;

    // ✅ FIXED: works for Chinese + English
    const matchesSearch =
      post.title?.includes(searchTerm) ||
      post.excerpt?.includes(searchTerm);

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
              {isZh ? "正在加载最新文章..." : "Fetching latest articles..."}
            </p>
          </div>
        ) : (
          <>
            {/* FEATURED */}
            {featuredPost && !searchTerm && activeCategory === "All" && (
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
                  </div>

                  <div className="w-full lg:w-1/2">
                    <div className="flex gap-4 text-xs text-slate-400 mb-4 font-bold uppercase">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {new Date(featuredPost.date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {featuredPost.readTime}
                      </span>
                    </div>

                    <h2 className="text-3xl font-black mb-4">
                      {featuredPost.title}
                    </h2>

                    <p className="text-slate-500 mb-6">
                      {featuredPost.excerpt}
                    </p>

                    {/* ✅ FIXED */}
                    <Link
                      href={`/blog/${encodeURIComponent(
                        featuredPost.slug
                      )}`}
                      className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold"
                    >
                      {isZh ? "阅读全文" : "Read Full Article"} <ArrowRight size={18} />
                    </Link>
                  </div>
                </motion.div>
              </section>
            )}

            {/* FILTER */}
            <nav className="flex flex-col lg:flex-row justify-between items-center gap-8 mb-12">
              <div className="flex flex-wrap gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2 rounded-xl font-bold ${
                      activeCategory === cat
                        ? "bg-teal-600 text-white"
                        : "bg-white border"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative w-full lg:w-80">
                <input
                  type="text"
                  placeholder={isZh ? "搜索文章..." : "Search articles..."}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border rounded-xl"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
              </div>
            </nav>

            {/* GRID */}
            <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post) => (
                    <motion.article
                      key={post.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="bg-white rounded-2xl overflow-hidden border"
                    >
                      {/* ✅ FIXED */}
                      <Link
                        href={`/blog/${encodeURIComponent(post.slug)}`}
                        className="block h-56"
                      >
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </Link>

                      <div className="p-6 flex flex-col">
                        <div className="text-xs text-slate-400 mb-2">
                          {new Date(post.date).toLocaleDateString()} •{" "}
                          {post.readTime}
                        </div>

                        <h3 className="font-bold mb-3">
                          {/* ✅ FIXED */}
                          <Link
                            href={`/blog/${encodeURIComponent(post.slug)}`}
                          >
                            {post.title}
                          </Link>
                        </h3>

                        <p className="text-sm text-slate-500 mb-4">
                          {post.excerpt}
                        </p>

                        {/* ✅ FIXED */}
                        <Link
                          href={`/blog/${encodeURIComponent(post.slug)}`}
                          className="mt-auto font-bold flex items-center gap-1"
                        >
                          {isZh ? "继续阅读" : "Keep Reading"} <ChevronRight size={16} />
                        </Link>
                      </div>
                    </motion.article>
                  ))
                ) : (
                  <div className="col-span-full text-center py-20">
                    <BookOpen className="mx-auto mb-4 text-slate-300" />
                    <p>{isZh ? "未找到相关文章" : "No articles found"}</p>
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