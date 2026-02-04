"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Phone, 
  Mail, 
  MessageCircle,
  Rocket,
  Facebook,
  Instagram,
  ChevronUp,
  MapPin
} from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#1a1652] text-white pt-32 pb-10 font-sans overflow-hidden">
      
      {/* --- 1. THE WAVE DIVIDER --- */}
      <div className="absolute top-0 left-0 w-full overflow-hidden line-height-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] fill-white">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5,73.84-4.36,147.54,16.88,218.2,35.26,69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"></path>
        </svg>
      </div>

      {/* --- 2. THE STICKER DOODLES --- */}
      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-40 left-10 opacity-60 hidden xl:block"
      >
        <div className="w-16 h-16 bg-red-500 rounded-full border-2 border-white shadow-lg relative">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-4 border-b-2 border-white/40 rounded-full -rotate-12" />
        </div>
      </motion.div>

      <motion.div 
        animate={{ x: [0, 10, 0], y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-32 right-20 opacity-40 hidden xl:block"
      >
        <Rocket size={60} className="fill-white" />
      </motion.div>

      {/* --- 3. MAIN CONTENT GRID --- */}
      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* LOGO COLUMN */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-auto h-20 p-2 shadow-xl">
                 <img src="/icon.png" alt="EC Chess" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-3xl tracking-tighter uppercase leading-none">
                  EC <span className="text-orange-500">CHESS</span>
                </span>
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-60 mt-1">Learn to be limitless</span>
              </div>
            </Link>
            
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-3 group cursor-pointer">
                <div className="p-2 rounded-lg bg-white/10 group-hover:bg-indigo-500 transition-all">
                  <Mail size={18} />
                </div>
                <span className="text-sm font-medium">enquiry.ecchess@gmail.com</span>
              </div>
              <div className="flex gap-4 pt-2">
                <Link href="https://www.facebook.com/ecchess" className="p-2 bg-white/10 rounded-full hover:bg-white hover:text-indigo-900 transition-all">
                  <Facebook size={20} />
                </Link>
                <Link href="https://www.instagram.com/ec_chess/" className="p-2 bg-white/10 rounded-full hover:bg-white hover:text-indigo-900 transition-all">
                  <Instagram size={20} />
                </Link>
              </div>
            </div>
          </div>

          {/* LINKS COLUMN */}
          <div className="lg:col-span-2">
            <h4 className="text-lg font-black uppercase tracking-widest mb-4">Useful Links</h4>
            <div className="w-10 h-1.5 bg-indigo-500 rounded-full mb-6" />
            <ul className="space-y-4 text-slate-300">
              {["Home", "Curriculum", "Gallery", "Blog"].map((link) => (
                <li key={link}>
                  <Link href={`/${link.toLowerCase()}`} className="hover:text-white hover:translate-x-1 inline-block transition-all font-bold">{link}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COMPANY COLUMN */}
          <div className="lg:col-span-2">
            <h4 className="text-lg font-black uppercase tracking-widest mb-4">Our Company</h4>
            <div className="w-10 h-1.5 bg-purple-500 rounded-full mb-6" />
            <ul className="space-y-4 text-slate-300">
              {["Contact Us", "Achievements", "About Us", "Registration"].map((link) => (
                <li key={link}>
                  <Link href={`/${link.replace(/\s+/g, '').toLowerCase()}`} className="hover:text-white hover:translate-x-1 inline-block transition-all font-bold">{link}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* BRANCHES COLUMN */}
          <div className="lg:col-span-4 space-y-6">
            <h4 className="text-lg font-black uppercase tracking-widest mb-4">HK Branches</h4>
            <div className="w-10 h-1.5 bg-orange-500 rounded-full mb-6" />
            
            <div className="space-y-6">
              <div className="group">
                <div className="flex items-center gap-2 mb-1 text-orange-400">
                   <MapPin size={14} />
                   <span className="text-[10px] font-black uppercase tracking-widest">Kowloon City</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/10 group-hover:bg-orange-500 transition-all">
                    <Phone size={16} />
                  </div>
                  <span className="text-sm font-bold tracking-widest">4614 4561</span>
                </div>
              </div>

              <div className="group">
                <div className="flex items-center gap-2 mb-1 text-indigo-400">
                   <MapPin size={14} />
                   <span className="text-[10px] font-black uppercase tracking-widest">Yuen Long</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/10 group-hover:bg-indigo-500 transition-all">
                    <Phone size={16} />
                  </div>
                  <span className="text-sm font-bold tracking-widest">5406 6800</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* --- 4. BOTTOM BAR --- */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
          
          <motion.a 
            whileHover={{ scale: 1.05 }}
            href="https://wa.me/85254066800" 
            target="_blank"
            className="flex items-center gap-3 bg-[#25D366] px-6 py-3 rounded-2xl shadow-xl border-b-4 border-green-700"
          >
            <MessageCircle size={20} fill="white" />
            <span className="text-sm font-black uppercase tracking-wider">WhatsApp Us</span>
          </motion.a>

          <p className="text-[10px] font-bold opacity-40 uppercase tracking-[0.2em] text-center">
            © 2010 - {new Date().getFullYear()} EC CHESS ACADEMY. ALL RIGHTS RESERVED.
          </p>

          <button 
            onClick={scrollToTop}
            className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center shadow-2xl hover:bg-orange-500 transition-all"
          >
            <ChevronUp size={24} strokeWidth={3} />
          </button>
        </div>
      </div>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 opacity-10 pointer-events-none">
         <div className="w-20 h-10 bg-indigo-400 rounded-full blur-xl" />
      </div>

    </footer>
  );
}