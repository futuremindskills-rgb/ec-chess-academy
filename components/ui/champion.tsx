"use client";
import React from "react";
import { motion } from "framer-motion";

// Extracting all unique images from the data
const allChampionImages = [
  // Student 1
  { url: "/ng1.jpeg", name: "Ng Kwun Wang" },
  { url: "/ng2.jpeg", name: "Ng Kwun Wang" },
  { url: "/ng3.jpeg", name: "Ng Kwun Wang" },
  // Student 2
  { url: "/luo1.jpeg", name: "Luo Xu Nan" },
  { url: "/luo2.jpeg", name: "Luo Xu Nan" },
  // Student 3
  { url: "/wong1.jpeg", name: "Wong Ping Hei" },
  { url: "/wong2.jpeg", name: "Wong Ping Hei" },
  { url: "/wong3.jpeg", name: "Wong Ping Hei" },
  // Student 4
  { url: "/jim1.jpeg", name: "Jim Tsz Chun" },
  { url: "/jim2.jpeg", name: "Jim Tsz Chun" },
  { url: "/jim3.jpeg", name: "Jim Tsz Chun" },
  { url: "/jim4.jpeg", name: "Jim Tsz Chun" },
  { url: "/jim5.jpeg", name: "Jim Tsz Chun" },
  { url: "/jim6.jpeg", name: "Jim Tsz Chun" },
  { url: "/jim7.jpeg", name: "Jim Tsz Chun" },
  { url: "/jim8.jpeg", name: "Jim Tsz Chun" },
  { url: "/jim9.jpeg", name: "Jim Tsz Chun" },
  { url: "/jim10.jpeg", name: "Jim Tsz Chun" },
  { url: "/jim11.jpeg", name: "Jim Tsz Chun" },
  { url: "/jim12.jpeg", name: "Jim Tsz Chun" },
  { url: "/jim13.jpeg", name: "Jim Tsz Chun" },
  { url: "/jim14.jpeg", name: "Jim Tsz Chun" },
  { url: "/jim15.jpeg", name: "Jim Tsz Chun" },
  { url: "/jim16.jpeg", name: "Jim Tsz Chun" },
  { url: "/jim17.jpeg", name: "Jim Tsz Chun" },
  { url: "/jim18.jpeg", name: "Jim Tsz Chun" },
  { url: "/jim19.jpeg", name: "Jim Tsz Chun" },
];

// Duplicate for seamless loop
const duplicateImages = [...allChampionImages, ...allChampionImages];

const ChampionGallery: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50 overflow-hidden border-t-4 border-slate-900">
      <div className="mb-12 text-center px-4">
        <h3 className="text-2xl md:text-4xl font-[1000] text-slate-900 uppercase tracking-tighter">
          Gallery of <span className="text-orange-500">Excellence</span>
        </h3>
        <p className="text-slate-500 font-bold uppercase text-[10px] md:text-xs tracking-[0.3em] mt-2">
          Capturing the moments of victory across Hong Kong
        </p>
      </div>

      {/* INFINITE MARQUEE CONTAINER */}
      <div className="flex relative items-center">
        {/* Gradients for fading edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-slate-50 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-slate-50 to-transparent z-10" />

        <motion.div 
          className="flex gap-4 md:gap-8 pr-4 md:pr-8"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            ease: "linear", 
            duration: 40, // Adjust this for speed (higher = slower)
            repeat: Infinity 
          }}
        >
          {duplicateImages.map((img, i) => (
            <div 
              key={i} 
              className="flex-shrink-0 group relative"
            >
              {/* Image Card */}
              <div className="w-48 h-64 md:w-64 md:h-80 rounded-2xl md:rounded-[32px] overflow-hidden border-2 md:border-[3px] border-slate-900 shadow-md group-hover:shadow-xl transition-all group-hover:-translate-y-2 bg-white">
                <img 
                  src={img.url} 
                  alt={img.name} 
                  className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-500"
                />
                
                {/* Overlay Name */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md border border-slate-900 px-3 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-[10px] font-black text-slate-900 uppercase tracking-tighter text-center">
                    {img.name}
                  </p>
                </div>
              </div>

              {/* Decorative Shadow */}
              <div className="absolute inset-0 bg-slate-900 rounded-[32px] translate-x-1 translate-y-1 -z-10 opacity-20" />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="mt-16 flex justify-center">
        <div className="inline-flex items-center gap-4 bg-slate-900 text-white px-6 py-3 rounded-full font-black uppercase text-[10px] tracking-widest shadow-2xl">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Join the hall of fame
        </div>
      </div>
    </section>
  );
};

export default ChampionGallery;