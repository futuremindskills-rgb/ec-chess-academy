"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera,
  Trophy,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Crown, 
  Users,
  Loader2,
  ShieldCheck,
  Star,
  Target,
  Zap
} from 'lucide-react';
import { getGalleryImages } from "@/app/actions/adminActions";

// Categories kept exactly as your design
const categories = [
  { id: "All", label: "All Moments", icon: Camera, color: "bg-slate-900" },
  { id: "Coaching", label: "Elite Coaching", icon: Target, color: "bg-[#8A2BE2]" },
  { id: "Tournaments", label: "Chess Arena", icon: Crown, color: "bg-[#4F46E5]" },
  { id: "Awards", label: "Hall of Fame", icon: Trophy, color: "bg-[#FFD700]" },
  { id: "Student Life", label: "Student Life", icon: Users, color: "bg-[#1a5f5f]" },
];

const demoImages = [
  { id: "d1", src: "/1.webp", title: "UAE National Qualifiers", category: "Tournaments", description: "Students competing at the highest level of national chess." },
  { id: "d2", src: "/2.webp", title: "Grandmaster Masterclass", category: "Coaching", description: "Deep tactical analysis session with our FIDE lead coach." },
  { id: "d3", src: "/3.webp", title: "Junior Podium Finish", category: "Awards", description: "Celebrating excellence and strategic growth in our U-12 category." },
  { id: "d4", src: "/1.webp", title: "Opening Theory Workshop", category: "Coaching", description: "Focusing on the Sicilian Defense and central control." },
  { id: "d5", src: "/2.webp", title: "Internal League Day", category: "Student Life", description: "A day of fun, friendly competition and sportsmanship." },
  { id: "d6", src: "/3.webp", title: "Tactical Puzzle Challenge", category: "Tournaments", description: "Speed solving session to improve calculation skills." },
];

export default function GallerySection() {
  const [images, setImages] = useState<any[]>([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxImage, setLightboxImage] = useState<any | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadImages() {
      try {
        const data = await getGalleryImages();
        setImages(data.length > 0 ? data : demoImages);
      } catch (error) {
        setImages(demoImages);
      } finally {
        setIsLoading(false);
      }
    }
    loadImages();
  }, []);

  const filteredImages = activeCategory === "All"
    ? images
    : images.filter(img => img.category === activeCategory);

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
      
      {/* Background Blurs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-full md:w-1/3 h-1/3 bg-yellow-50/50 rounded-full blur-[80px] md:blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-full md:w-1/3 h-1/3 bg-purple-50/50 rounded-full blur-[80px] md:blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-10 md:mb-20">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-4 shadow-lg"
          >
            <ShieldCheck size={12} className="text-yellow-400" />
            Visual Archive
          </motion.div>
          <h2 className="text-3xl md:text-6xl font-[1000] text-slate-900 tracking-tighter leading-[1.1] md:leading-none uppercase mb-6">
            Academy <br className="block md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500">
                Moments
            </span>
          </h2>
        </div>

        {/* --- FILTER TABS (Mobile Scrollable) --- */}
        <div className="relative mb-12 md:mb-16">
            <div 
                ref={scrollRef}
                className="flex overflow-x-auto no-scrollbar pb-4 md:pb-0 md:flex-wrap md:justify-center gap-3 snap-x"
            >
                {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                    <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`flex-shrink-0 snap-center flex items-center gap-2 px-5 py-3 md:px-6 md:py-3 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all duration-300 border-2
                        ${isActive
                            ? `${cat.color} text-white border-transparent shadow-lg scale-105`
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

        {/* --- MASONRY GRID --- */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-indigo-600 mb-4" />
            <p className="font-black text-[10px] uppercase tracking-widest text-slate-400">Syncing Gallery...</p>
          </div>
        ) : (
          <motion.div 
            layout
            className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6"
          >
            <AnimatePresence mode='popLayout'>
              {filteredImages.map((image) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group relative break-inside-avoid rounded-[24px] md:rounded-[35px] overflow-hidden cursor-zoom-in bg-slate-100 border-2 border-white shadow-sm hover:shadow-xl transition-all duration-500"
                  onClick={() => setLightboxImage(image)}
                >
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-auto object-cover transition-transform duration-700 md:group-hover:scale-105"
                  />
                  
                  {/* Overlay (Hidden on mobile unless clicked, visible on desktop hover) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-0 md:group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-5 md:p-8">
                    <span className="inline-block px-3 py-1 bg-[#f59e0b] text-slate-900 text-[8px] md:text-[9px] font-black uppercase tracking-widest rounded-full mb-2 w-fit">
                      {image.category}
                    </span>
                    <h4 className="text-white text-lg md:text-xl font-black uppercase tracking-tighter mb-1">{image.title}</h4>
                    <p className="text-slate-300 text-[10px] md:text-xs font-medium line-clamp-2">{image.description}</p>
                    
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-lg text-white hidden md:block">
                      <Maximize2 size={18} />
                    </div>
                  </div>

                  {/* Mobile Mobile Quick Info (Always slightly visible on mobile for UX) */}
                  <div className="md:hidden absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                     <h4 className="text-white text-sm font-bold uppercase tracking-tight">{image.title}</h4>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* --- PREMIUM LIGHTBOX --- */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-950/98 backdrop-blur-xl flex items-center justify-center p-0 md:p-10"
            onClick={() => setLightboxImage(null)}
          >
            {/* Close Button */}
            <button className="absolute top-6 right-6 p-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors z-[110]">
              <X size={24} />
            </button>
            
            {/* Nav Arrows (Desktop Only) */}
            <button className="absolute left-6 top-1/2 -translate-y-1/2 p-4 text-white/30 hover:text-white transition-colors hidden xl:block" onClick={handlePrev}>
              <ChevronLeft size={64} />
            </button>
            <button className="absolute right-6 top-1/2 -translate-y-1/2 p-4 text-white/30 hover:text-white transition-colors hidden xl:block" onClick={handleNext}>
              <ChevronRight size={64} />
            </button>

            <motion.div
              initial={{ scale: 0.9, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 40 }}
              className="bg-white md:rounded-[40px] overflow-hidden max-w-6xl w-full h-full md:h-auto md:max-h-[90vh] flex flex-col md:flex-row shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Area */}
              <div className="w-full h-[50vh] md:h-auto md:w-2/3 bg-black flex items-center justify-center relative group">
                 <img src={lightboxImage.src} alt={lightboxImage.title} className="max-w-full max-h-full md:max-h-[85vh] object-contain" />
                 
                 {/* Mobile Swipe Indicators/Navigation */}
                 <div className="absolute inset-x-0 bottom-4 flex justify-center gap-10 md:hidden">
                    <button onClick={handlePrev} className="p-3 bg-white/10 rounded-full text-white"><ChevronLeft /></button>
                    <button onClick={handleNext} className="p-3 bg-white/10 rounded-full text-white"><ChevronRight /></button>
                 </div>
              </div>
              
              {/* Text Area */}
              <div className="w-full md:w-1/3 p-8 md:p-10 lg:p-14 bg-white flex flex-col overflow-y-auto">
                  <div className="absolute -right-10 -bottom-10 opacity-[0.03] pointer-events-none text-slate-900 hidden md:block">
                      <Zap size={250} fill="currentColor" />
                  </div>

                  <span className="inline-block px-4 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[9px] font-black uppercase tracking-widest mb-4 w-fit">
                    {lightboxImage.category}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-[1000] text-slate-900 mb-4 md:mb-6 uppercase tracking-tighter leading-tight">
                    {lightboxImage.title}
                  </h3>
                  <p className="text-slate-500 font-medium text-sm md:text-base leading-relaxed mb-8">
                    {lightboxImage.description}
                  </p>
                  
                  {/* Footer Info */}
                  <div className="pt-6 border-t border-slate-100 mt-auto">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#f59e0b] rounded-xl flex items-center justify-center shrink-0">
                            <Star className="text-white w-5 h-5" fill="currentColor" />
                        </div>
                        <div>
                          <p className="text-[9px] text-slate-400 uppercase font-black tracking-widest leading-none mb-1">Academy Moment</p>
                          <p className="text-xs md:text-sm font-bold text-slate-900">EC Chess Academy</p>
                        </div>
                     </div>
                  </div>
              </div>
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