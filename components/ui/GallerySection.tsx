"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera,
  Trophy,
  X,
  ChevronLeft,
  ChevronRight,
  Crown, 
  ShieldCheck,
} from 'lucide-react';

// --- 1. STATIC CHAMPION DATA ---
const CHAMPION_PHOTOS = [
  { id: "1", src: "/1.jpeg", category: "Awards" },
  { id: "2", src: "/2.jpeg", category: "Tournaments" },
  { id: "3", src: "/3.jpeg", category: "Awards" },
  { id: "4", src: "/4.jpeg", category: "Awards" },
  { id: "5", src: "/5.jpeg", category: "Tournaments" },
  { id: "6", src: "/6.jpeg", category: "Tournaments" },
  { id: "7", src: "/7.jpeg", category: "Awards" },
  { id: "8", src: "/8.jpeg", category: "Tournaments" },
  { id: "9", src: "/9.jpeg", category: "Awards" },
  { id: "10", src: "/10.jpeg", category: "Awards" },
  { id: "11", src: "/11.jpeg", category: "Tournaments" },
  { id: "12", src: "/12.jpeg", category: "Tournaments" },
  { id: "13", src: "/13.jpeg", category: "Awards" },
  { id: "14", src: "/14.jpeg", category: "Tournaments" },
  { id: "15", src: "/15.jpeg", category: "Awards" },
  { id: "16", src: "/16.jpeg", category: "Awards" },
  { id: "17", src: "/17.jpeg", category: "Tournaments" },
  { id: "18", src: "/18.jpeg", category: "Tournaments" },
  { id: "19", src: "/19.jpeg", category: "Awards" },
  { id: "20", src: "/20.jpeg", category: "Tournaments" },
  { id: "21", src: "/21.jpeg", category: "Awards" },
  { id: "22", src: "/22.jpeg", category: "Awards" },
  { id: "23", src: "/23.jpeg", category: "Tournaments" },
  { id: "24", src: "/24.jpeg", category: "Tournaments" },
  { id: "25", src: "/25.jpeg", category: "Awards" },
  { id: "26", src: "/26.jpeg", category: "Tournaments" },
  { id: "27", src: "/27.jpeg", category: "Awards" },
  { id: "28", src: "/28.jpeg", category: "Awards" },
  { id: "29", src: "/29.jpeg", category: "Tournaments" },
  { id: "30", src: "/30.jpeg", category: "Tournaments" },
  { id: "31", src: "/31.jpeg", category: "Awards" },
  { id: "32", src: "/32.jpeg", category: "Tournaments" },
  { id: "33", src: "/33.jpeg", category: "Awards" },
  { id: "34", src: "/34.jpeg", category: "Awards" },
  { id: "35", src: "/35.jpeg", category: "Tournaments" },
  { id: "36", src: "/36.jpeg", category: "Tournaments" },
  { id: "37", src: "/37.jpeg", category: "Awards" },
  { id: "38", src: "/38.jpeg", category: "Tournaments" },
  { id: "39", src: "/39.jpeg", category: "Awards" },
  { id: "40", src: "/40.jpeg", category: "Awards" },
  { id: "41", src: "/41.jpeg", category: "Tournaments" },
  { id: "42", src: "/42.jpeg", category: "Tournaments" },
  { id: "43", src: "/43.jpeg", category: "Awards" },
  { id: "44", src: "/44.jpeg", category: "Tournaments" },
  { id: "45", src: "/45.jpeg", category: "Awards" },
  { id: "46", src: "/46.jpeg", category: "Awards" },
  { id: "47", src: "/47.jpeg", category: "Tournaments" },
  { id: "48", src: "/48.jpeg", category: "Tournaments" },
  { id: "49", src: "/49.jpeg", category: "Awards" },
  { id: "50", src: "/50.jpeg", category: "Tournaments" },
  { id: "51", src: "/51.jpeg", category: "Awards" },
  { id: "52", src: "/52.jpeg", category: "Awards" },
  { id: "53", src: "/53.jpeg", category: "Tournaments" },
  { id: "54", src: "/54.jpeg", category: "Tournaments" },
  { id: "55", src: "/55.jpeg", category: "Awards" },
  { id: "56", src: "/56.jpeg", category: "Tournaments" },
  { id: "57", src: "/57.jpeg", category: "Awards" },
];

const categories = [
  { id: "All", label: "All Moments", icon: Camera, color: "bg-slate-900" },
  { id: "Tournaments", label: "Tournaments", icon: Crown, color: "bg-[#4F46E5]" },
  { id: "Awards", label: "Awards", icon: Trophy, color: "bg-[#FFD700]" },
];

export default function FullGalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxImage, setLightboxImage] = useState<any | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const filteredImages = activeCategory === "All"
    ? CHAMPION_PHOTOS
    : CHAMPION_PHOTOS.filter(img => img.category === activeCategory);

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const currentIndex = filteredImages.findIndex(img => img.id === lightboxImage.id);
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setLightboxImage(filteredImages[nextIndex]);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const currentIndex = filteredImages.findIndex(img => img.id === lightboxImage.id);
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setLightboxImage(filteredImages[prevIndex]);
  };

  return (
    <section className="relative py-16 md:py-28 bg-white overflow-hidden font-sans" id="gallery">
      
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:32px_32px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-10 md:mb-20">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-4 shadow-lg"
          >
            <ShieldCheck size={12} className="text-teal-400" />
            Academy Archive
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-[1000] text-slate-900 tracking-tighter leading-[1.1] uppercase mb-6">
            Hall of {" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-indigo-600 to-cyan-500">
                Champions
            </span>
          </h1>
        </div>

        {/* --- FILTER TABS --- */}
        <div className="relative mb-12">
            <div ref={scrollRef} className="flex overflow-x-auto no-scrollbar justify-center gap-3 snap-x">
                {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                    <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 border-2
                        ${isActive
                            ? `${cat.color} text-white border-transparent shadow-xl scale-105`
                            : 'bg-white text-slate-500 border-slate-100 hover:border-slate-200'
                        }`}
                    >
                        <cat.icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                        {cat.label}
                    </button>
                );
                })}
            </div>
        </div>

        {/* --- MASONRY GRID (PURE IMAGES) --- */}
        <motion.div 
          layout
          className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
        >
          <AnimatePresence mode='popLayout'>
            {filteredImages.map((image) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative break-inside-avoid rounded-[2rem] overflow-hidden cursor-zoom-in bg-slate-50 border-2 border-slate-100 hover:border-teal-500 hover:shadow-2xl transition-all duration-500"
                onClick={() => setLightboxImage(image)}
              >
                <img
                  src={image.src}
                  alt="Academy Moment"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Subtle Hover Glow (No text) */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* --- LIGHTBOX (PURE IMAGE VIEWER) --- */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-xl flex items-center justify-center"
            onClick={() => setLightboxImage(null)}
          >
            {/* Close */}
            <button className="absolute top-6 right-6 p-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors z-[110]">
              <X size={24} />
            </button>
            
            {/* Nav Arrows */}
            <button className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 p-4 text-white/40 hover:text-white transition-colors" onClick={handlePrev}>
              <ChevronLeft size={48} />
            </button>
            <button className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 p-4 text-white/40 hover:text-white transition-colors" onClick={handleNext}>
              <ChevronRight size={48} />
            </button>

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="max-w-[90vw] max-h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={lightboxImage.src} 
                alt="Enlarged moment" 
                className="rounded-[2rem] md:rounded-[3rem] border-4 border-white/10 shadow-2xl object-contain max-h-[85vh]" 
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}