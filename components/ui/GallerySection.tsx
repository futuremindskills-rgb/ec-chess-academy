"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera,
  Trophy,
  X,
  ChevronLeft,
  ChevronRight,
  Crown, 
  ShieldCheck,
  Loader2,
  Images,
  FolderOpen,
  ArrowLeft,
  Layers
} from 'lucide-react';
import { getAlbums } from "@/app/actions/adminActions";
import { useLocale } from "next-intl";

export default function FullGalleryPage() {
  const locale = useLocale();
  const isZh = locale === "zh";
  const [albums, setAlbums] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  
  // Navigation State
  const [selectedAlbum, setSelectedAlbum] = useState<any | null>(null);
  const [lightboxImage, setLightboxImage] = useState<any | null>(null);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchGallery() {
      try {
        const data = await getAlbums();
        setAlbums(data);
      } catch (error) {
        console.error("Failed to fetch gallery:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchGallery();
  }, []);

  // Filter Albums by Category
  const filteredAlbums = activeCategory === "All"
    ? albums
    : albums.filter(album => album.category === activeCategory);

  // Dynamic Categories extracted from all albums
  const dynamicCategories = [
    "All",
    ...Array.from(new Set(albums.map((album) => album.category)))
  ];

  // Lightbox Nav (Scoped to the selected album's images)
  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!selectedAlbum) return;
    const currentIndex = selectedAlbum.images.findIndex((img: any) => img.id === lightboxImage.id);
    const nextIndex = (currentIndex + 1) % selectedAlbum.images.length;
    setLightboxImage(selectedAlbum.images[nextIndex]);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!selectedAlbum) return;
    const currentIndex = selectedAlbum.images.findIndex((img: any) => img.id === lightboxImage.id);
    const prevIndex = (currentIndex - 1 + selectedAlbum.images.length) % selectedAlbum.images.length;
    setLightboxImage(selectedAlbum.images[prevIndex]);
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'awards': return <Trophy size={14} />;
      case 'tournaments': return <Crown size={14} />;
      case 'academy': return <ShieldCheck size={14} />;
      default: return <Camera size={14} />;
    }
  };

  return (
    <section className="relative py-16 md:py-28 bg-white min-h-screen overflow-hidden font-sans" id="gallery">
      
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:32px_32px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-10 md:mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-4 shadow-lg"
          >
            <FolderOpen size={12} className="text-teal-400" />
            {selectedAlbum ? (isZh ? "查看相册" : "Viewing Album") : (isZh ? "学院档案" : "Academy Archive")}
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-[1000] text-slate-900 tracking-tighter leading-[1.1] uppercase mb-4">
            {selectedAlbum ? selectedAlbum.title : (isZh ? "冠军殿堂" : "Hall of Champions")}
          </h1>
          
          {selectedAlbum && (
            <p className="text-slate-500 max-w-2xl mx-auto font-medium">{selectedAlbum.description}</p>
          )}
        </div>

        {/* --- NAVIGATION / FILTERS --- */}
        <div className="mb-12">
            <AnimatePresence mode="wait">
                {selectedAlbum ? (
                    // BACK BUTTON
                    <motion.button
                        key="back-btn"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        onClick={() => setSelectedAlbum(null)}
                        className="flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-900 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all shadow-sm mx-auto md:mx-0"
                    >
                        <ArrowLeft size={16} /> {isZh ? "返回相册" : "Back to Albums"}
                    </motion.button>
                ) : (
                    // CATEGORY FILTERS
                    <motion.div 
                        key="filters"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        ref={scrollRef} 
                        className="flex overflow-x-auto no-scrollbar justify-center gap-3 snap-x"
                    >
                        {dynamicCategories.map((cat) => {
                            const isActive = activeCategory === cat;
                            return (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 border-2
                                    ${isActive
                                        ? `bg-indigo-600 text-white border-transparent shadow-xl scale-105`
                                        : 'bg-white text-slate-500 border-slate-100 hover:border-slate-200'
                                    }`}
                                >
                                    {getCategoryIcon(cat)}
                                    {cat}
                                </button>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>

        {/* --- CONTENT GRID --- */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 size={40} className="animate-spin text-indigo-600" />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {!selectedAlbum ? (
              // --- ALBUM LIST VIEW ---
              <motion.div 
                key="album-grid"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredAlbums.map((album) => (
                  <motion.div
                    key={album.id}
                    whileHover={{ y: -10 }}
                    onClick={() => setSelectedAlbum(album)}
                    className="group cursor-pointer bg-white rounded-[2.5rem] border-2 border-slate-100 overflow-hidden shadow-sm hover:shadow-2xl hover:border-teal-500 transition-all duration-500"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                        {album.images?.[0] ? (
                            <img 
                                src={album.images[0].src} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                alt="" 
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300"><Images size={48} /></div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                        <div className="absolute bottom-6 left-6 text-white">
                            <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg">
                                {album.category}
                            </span>
                        </div>
                        <div className="absolute bottom-6 right-6 flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-lg text-[10px] font-black text-slate-900">
                            <Layers size={14} /> {album.images?.length || 0}
                        </div>
                    </div>
                    <div className="p-8">
                        <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-2 group-hover:text-indigo-600 transition-colors">
                            {album.title}
                        </h3>
                        <p className="text-slate-500 text-sm font-medium line-clamp-2">{album.description || (isZh ? "查看该活动的照片。" : "View photos from this event.")}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              // --- IMAGE DETAIL VIEW ---
              <motion.div 
                key="image-grid"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
              >
                {selectedAlbum.images.map((image: any) => (
                  <motion.div
                    key={image.id}
                    layout
                    className="group relative break-inside-avoid rounded-[2rem] overflow-hidden cursor-zoom-in bg-slate-50 border-2 border-slate-100 hover:border-indigo-500 hover:shadow-2xl transition-all duration-500"
                    onClick={() => setLightboxImage(image)}
                  >
                    <img
                      src={image.src}
                      alt=""
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {/* Empty States */}
        {!isLoading && !selectedAlbum && filteredAlbums.length === 0 && (
          <div className="text-center py-20 text-slate-400 font-bold uppercase tracking-widest text-xs">
            {isZh ? "该分类暂无相册。" : "No albums found in this category."}
          </div>
        )}
      </div>

      {/* --- LIGHTBOX --- */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-950/98 backdrop-blur-xl flex flex-col items-center justify-center"
            onClick={() => setLightboxImage(null)}
          >
            {/* Header Info */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center pointer-events-none">
                <span className="text-teal-400 text-[10px] font-black uppercase tracking-[0.3em]">{selectedAlbum?.category}</span>
                <h2 className="text-white text-lg font-bold mt-1">{selectedAlbum?.title}</h2>
            </div>

            {/* Close Button */}
            <button className="absolute top-6 right-6 p-4 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors z-[110]">
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
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-[90vw] max-h-[80vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={lightboxImage.src} 
                className="rounded-2xl md:rounded-[2.5rem] border border-white/10 shadow-2xl object-contain max-h-[75vh]" 
                alt=""
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