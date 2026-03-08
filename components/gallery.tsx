"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image"; // Crucial for SEO & Performance
import { 
  Atom,           
  Crown,          
  Trophy,         
  Users,          
  ArrowRight,
  ImageIcon,
  ZoomIn,
  Loader2,
  Sparkles
} from "lucide-react";

const tabs = [
  { id: "All", label: "All", icon: ImageIcon },
  { id: "Chess", label: "Chess", icon: Crown },
  { id: "Awards", label: "Awards", icon: Trophy },
  { id: "Student Activities", label: "Activities", icon: Users },
];

export default function GallerySection() {
  const [activeTab, setActiveTab] = useState("All");
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // --- SEO Image Gallery Schema ---
  const gallerySchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": " & Chess Learning Gallery",
    "description": "Visual highlights of student achievements, xperiments, and chess tournaments at the Academy.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": " & Strategy Academy"
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
      } catch (error) {
        console.error("Gallery Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredImages = activeTab === "All" 
    ? images 
    : images.filter(img => img.category === activeTab);

  return (
    <section className="relative py-16 lg:py-24 bg-white font-sans overflow-hidden" id="gallery">
      {/* SEO Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(gallerySchema) }} />

      {/* --- Optimized Background --- */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:32px_32px]" />
        <div className="absolute top-1/2 left-0 w-[40vw] h-[40vw] bg-teal-50 rounded-full blur-[120px] -translate-x-1/2" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-12">
          <div className="max-w-2xl text-center md:text-left">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-6"
            >
              <Sparkles size={14} className="text-teal-400 fill-teal-400" /> Academy Life
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-[1.1] tracking-tight">
              Capturing Moments of <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-indigo-600">Learning & Joy.</span>
            </h2>
          </div>

          {/* Tabs / Filter Nav */}
          <nav className="flex flex-wrap justify-center md:justify-end gap-2" aria-label="Gallery Categories">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                aria-pressed={activeTab === tab.id}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all
                  ${activeTab === tab.id 
                    ? "bg-teal-500 text-white shadow-lg shadow-teal-500/20 scale-105" 
                    : "bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-200"}
                `}
              >
                <tab.icon size={14} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* --- Content Grid --- */}
        <div className="min-h-[450px]">
          {loading ? (
            <div className="flex justify-center items-center h-[400px]">
              <Loader2 className="w-10 h-10 text-teal-600 animate-spin" />
            </div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredImages.slice(0, 6).map((image) => (
                  <motion.figure
                    layout
                    key={image.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="group relative h-[300px] rounded-[2rem] overflow-hidden bg-slate-100 shadow-sm hover:shadow-2xl transition-all"
                  >
                    <Image 
                      src={image.src} 
                      alt={`${image.title} - ${image.category} Strategy Academy`} 
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Premium Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-8">
                      <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <span className="inline-block px-3 py-1 bg-teal-500 text-white text-[9px] font-black uppercase tracking-widest rounded-lg mb-3">
                          {image.category}
                        </span>
                        <figcaption className="text-white font-black text-xl mb-1">
                          {image.title}
                        </figcaption>
                        <p className="text-slate-300 text-xs font-medium leading-relaxed line-clamp-2">
                          {image.description}
                        </p>
                      </div>

                      <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-500 bg-white/20 backdrop-blur-md p-2 rounded-xl text-white">
                        <ZoomIn size={20} />
                      </div>
                    </div>
                  </motion.figure>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>

        {/* --- Multi-Domain Empty State --- */}
        {!loading && filteredImages.length === 0 && (
          <div className="text-center py-20 bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
            <ImageIcon className="mx-auto text-slate-300 mb-4" size={48} />
            <p className="text-slate-500 font-bold uppercase tracking-widest">Moment coming soon...</p>
          </div>
        )}

        {/* --- Footer CTA --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mt-0"
        >
          <Link href="/gallery" className="group inline-flex items-center gap-4 px-10 py-5 bg-white border-2 border-slate-900 text-slate-900 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all shadow-xl shadow-slate-200">
            Enter Full Gallery
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}