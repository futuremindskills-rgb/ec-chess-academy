"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Navigation, 
  Phone, 
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  Trophy
} from 'lucide-react';

const branchData = {
  kowloon: {
    name: 'Kowloon City',
    branchNum: 'Branch 01',
    address: 'Smart-A Unit 3/B, 348-352 Prince Edward Road West',
    phone: '4614 4561',
    color: 'bg-[#4F46E5]',
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.0371302835154!2d114.1866324760592!3d22.32483864169542!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x340406d4e287a26f%3A0x6b772276587d6091!2s348-352%20Prince%20Edward%20Rd%20W%2C%20Kowloon%20City!5e0!3m2!1sen!2shk!4v1710000000000!5m2!1sen!2shk",
    directions: "https://www.google.com/maps/dir/?api=1&destination=348+Prince+Edward+Road+West+Kowloon+City"
  },
  yuenlong: {
    name: 'Yuen Long',
    branchNum: 'Branch 02',
    address: 'Room 218, Yuen Long Centre, Sau Fu Street',
    phone: '5406 6800',
    color: 'bg-slate-900',
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3689.176461933068!2d114.02758257606085!3d22.44118944111354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3403f0724f2b18a3%3A0x2f6b8973949f2571!2sYuen%20Long%20Centre%2C%2055%20Sau%20Fu%20St%2C%20Yuen%20Long!5e0!3m2!1sen!2shk!4v1710000000000!5m2!1sen!2shk",
    directions: "https://www.google.com/maps/dir/?api=1&destination=Yuen+Long+Centre+Sau+Fu+Street"
  }
};

const VisitCampusCTA: React.FC = () => {
  const [selected, setSelected] = useState<'kowloon' | 'yuenlong' | null>(null);

  return (
    <section className="relative py-20 bg-white min-h-[600px] flex items-center overflow-hidden">
      
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        
        {/* HEADER */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
            <ShieldCheck size={12} /> Academy Locations
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-zinc-900 tracking-tight">
            Visit Our <span className="italic font-serif text-zinc-500">HK Centers</span>
          </h2>
        </div>

        <AnimatePresence mode="wait">
          {!selected ? (
            /* STEP 1: INITIAL SELECTION BUTTONS */
            <motion.div 
              key="selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
            >
              <button 
                onClick={() => setSelected('kowloon')}
                className="group relative p-10 rounded-[2.5rem] bg-indigo-600 text-white text-left overflow-hidden transition-all hover:scale-[1.02] hover:shadow-2xl shadow-indigo-200"
              >
                <div className="relative z-10 flex justify-between items-center">
                   <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-2">Branch 01</p>
                      <h3 className="text-3xl font-light tracking-tight">Kowloon City</h3>
                   </div>
                   <ChevronRight className="group-hover:translate-x-2 transition-transform" />
                </div>
                <div className="absolute -right-8 -bottom-8 opacity-10 rotate-12 group-hover:rotate-0 transition-transform">
                   <Trophy size={160} />
                </div>
              </button>

              <button 
                onClick={() => setSelected('yuenlong')}
                className="group relative p-10 rounded-[2.5rem] bg-zinc-900 text-white text-left overflow-hidden transition-all hover:scale-[1.02] hover:shadow-2xl shadow-zinc-200"
              >
                <div className="relative z-10 flex justify-between items-center">
                   <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-2">Branch 02</p>
                      <h3 className="text-3xl font-light tracking-tight">Yuen Long</h3>
                   </div>
                   <ChevronRight className="group-hover:translate-x-2 transition-transform" />
                </div>
                <div className="absolute -right-8 -bottom-8 opacity-10 rotate-12 group-hover:rotate-0 transition-transform">
                   <MapPin size={160} />
                </div>
              </button>
            </motion.div>
          ) : (
            /* STEP 2: SHOW CARD AND MAP FOR SELECTED BRANCH */
            <motion.div 
              key="details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Back Button */}
              <button 
                onClick={() => setSelected(null)}
                className="flex items-center gap-2 text-zinc-400 hover:text-zinc-900 transition-colors mb-6 group"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Switch Location</span>
              </button>

              <div className="grid lg:grid-cols-12 gap-6 items-stretch">
                {/* BRANCH CARD */}
                <div className={`lg:col-span-4 p-10 rounded-[3rem] text-white flex flex-col justify-between ${branchData[selected].color} shadow-2xl`}>
                   <div>
                      <div className="bg-white/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-md border border-white/10">
                         <MapPin size={24} />
                      </div>
                      <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-2">{branchData[selected].branchNum}</p>
                      <h3 className="text-3xl font-light tracking-tight mb-4">{branchData[selected].name}</h3>
                      <p className="text-sm font-light text-zinc-300 leading-relaxed mb-8">
                         {branchData[selected].address}
                      </p>
                   </div>

                   <div className="space-y-4">
                      <div className="flex items-center gap-3">
                         <Phone size={16} className="opacity-60" />
                         <span className="text-sm font-bold tracking-widest">{branchData[selected].phone}</span>
                      </div>
                      <a 
                         href={branchData[selected].directions}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="flex items-center justify-between bg-white/10 hover:bg-white/20 p-5 rounded-2xl border border-white/10 transition-all group/btn"
                      >
                         <span className="text-[10px] font-bold uppercase tracking-widest">Get Directions</span>
                         <Navigation size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                      </a>
                   </div>
                </div>

                {/* MAP */}
                <div className="lg:col-span-8 h-[450px] lg:h-auto bg-zinc-100 rounded-[3rem] overflow-hidden border-8 border-white shadow-xl relative">
                   <iframe 
                      src={branchData[selected].mapUrl}
                      className="w-full h-full border-0 grayscale-[0.2] contrast-[1.1]"
                      allowFullScreen
                      loading="lazy"
                      title="Academy Location"
                   />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default VisitCampusCTA;