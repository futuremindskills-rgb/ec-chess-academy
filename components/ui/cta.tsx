"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Navigation, 
  Clock, 
  Star, 
  Zap, 
  ShieldCheck,
  ChevronRight,
  Trophy,
  Phone
} from 'lucide-react';

const VisitCampusCTA: React.FC = () => {
  return (
    <section className="relative py-16 lg:py-24 bg-white overflow-hidden font-sans">
      
      {/* Dynamic Background Blurs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-indigo-50 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-amber-50 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-12 lg:mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest mb-3 shadow-lg"
          >
            <ShieldCheck size={12} className="text-amber-400" />
            Academy Network
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-[1000] text-slate-900 tracking-tighter leading-none uppercase">
            Visit Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-amber-500">HK Centers</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 items-stretch">
          
          {/* LEFT COLUMN: Kowloon City Card (PURPLE) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="lg:col-span-3 bg-[#4F46E5] p-8 rounded-[35px] text-white shadow-xl flex flex-col justify-between relative overflow-hidden group"
          >
             <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform">
                <Star size={120} fill="currentColor" />
             </div>

             <div className="relative z-10">
                <div className="bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-md">
                   <MapPin className="text-white" size={24} />
                </div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-200 mb-2">Branch 01</h3>
                <p className="text-xl font-[1000] leading-tight mb-2 uppercase tracking-tighter">
                   Kowloon City
                </p>
                <p className="text-xs font-bold text-indigo-100 leading-relaxed mb-6">
                   Smart-A Unit 3/B, 348-352 <br />
                   Prince Edward Road West
                </p>
             </div>

             <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-3">
                   <Phone size={16} className="text-indigo-200" />
                   <span className="text-sm font-black tracking-widest">4614 4561</span>
                </div>
                <a 
                   href="https://www.google.com/maps/dir/?api=1&destination=348+Prince+Edward+Road+West+Kowloon+City"
                   target="_blank"
                   className="flex items-center justify-between bg-white/10 hover:bg-white/20 p-4 rounded-2xl border border-white/10 transition-all group/btn"
                >
                   <span className="text-[10px] font-black uppercase tracking-widest text-white">Get Directions</span>
                   <Navigation size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </a>
             </div>
          </motion.div>

          {/* CENTER COLUMN: Interactive Map (CLEAN) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="lg:col-span-6 min-h-[400px] bg-slate-50 rounded-[40px] border-4 border-white shadow-2xl overflow-hidden relative"
          >
             <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.0371302835154!2d114.1866324760592!3d22.32483864169542!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x340406d4e287a26f%3A0x6b772276587d6091!2s348-352%20Prince%20Edward%20Rd%20W%2C%20Kowloon%20City!5e0!3m2!1sen!2shk!4v1710000000000!5m2!1sen!2shk"
                className="w-full h-full border-0 grayscale-[0.2] contrast-[1.1]"
                allowFullScreen
                loading="lazy"
                title="EC Chess Academy Location"
             />
             
             <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md p-3 px-5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3">
                <div className="bg-indigo-600 p-2 rounded-xl">
                   <Trophy size={16} className="text-white" />
                </div>
                <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Professional Chess Hub</span>
             </div>
          </motion.div>

          {/* RIGHT COLUMN: Yuen Long Card (AMBER/DARK) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="lg:col-span-3 bg-slate-900 p-8 rounded-[35px] text-white shadow-xl flex flex-col justify-between relative overflow-hidden group"
          >
             <div className="absolute -right-4 -top-4 opacity-5 group-hover:scale-110 transition-transform">
                <Zap size={120} fill="currentColor" />
             </div>

             <div className="relative z-10">
                <div className="bg-amber-400 w-12 h-12 rounded-2xl flex items-center justify-center mb-8">
                   <MapPin className="text-slate-900" size={24} />
                </div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">Branch 02</h3>
                <p className="text-xl font-[1000] leading-tight mb-2 uppercase tracking-tighter">
                   Yuen Long
                </p>
                <p className="text-xs font-bold text-slate-400 leading-relaxed mb-6">
                   Room 218, Yuen Long Centre, <br />
                   Sau Fu Street
                </p>
             </div>

             <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-3">
                   <Phone size={16} className="text-amber-400" />
                   <span className="text-sm font-black tracking-widest">5406 6800</span>
                </div>
                <a 
                   href="https://www.google.com/maps/dir/?api=1&destination=Yuen+Long+Centre+Sau+Fu+Street"
                   target="_blank"
                   className="flex items-center justify-between bg-white/5 hover:bg-white/10 p-4 rounded-2xl border border-white/10 transition-all group/btn"
                >
                   <span className="text-[10px] font-black uppercase tracking-widest text-white">Get Directions</span>
                   <Navigation size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </a>
             </div>
          </motion.div>

        </div>

        {/* Footer Support Info */}
        <div className="mt-8 flex justify-center">
           <div className="bg-slate-50 border border-slate-100 px-6 py-3 rounded-full flex items-center gap-4">
              <div className="flex items-center gap-2">
                 <Clock size={14} className="text-indigo-600" />
                 <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">General Enquiry:</span>
              </div>
              <a href="mailto:enquiry.ecchess@gmail.com" className="text-[11px] font-black text-slate-900 hover:text-indigo-600 transition-colors uppercase">
                 enquiry.ecchess@gmail.com
              </a>
           </div>
        </div>
      </div>
    </section>
  );
};

export default VisitCampusCTA;