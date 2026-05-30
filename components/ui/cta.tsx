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
} from 'lucide-react';
import { useLocale } from 'next-intl';

const branchData = {
  kowloon: {
    nameEn: 'Kowloon City',
    nameZh: '九龍城分校',
    branchNumEn: 'Branch 01',
    branchNumZh: '第一分校',
    addressEn: 'Smart-A Unit 3/B, 348-352 Prince Edward Road West',
    addressZh: '太子道西 348-352 號 Smart-A 3/B 室',
    phone: '4614 4561',
    color: 'bg-[#4F46E5]',
    image: '/kow.jpeg',
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.0371302835154!2d114.1866324760592!3d22.32483864169542!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x340406d4e287a26f%3A0x6b772276587d6091!2s348-352%20Prince%20Edward%20Rd%20W%2C%20Kowloon%20City!5e0!3m2!1sen!2shk!4v1710000000000!5m2!1sen!2shk",
    directions: "https://www.google.com/maps/dir/?api=1&destination=348+Prince+Edward+Road+West+Kowloon+City"
  },
  yuenlong: {
    nameEn: 'Yuen Long',
    nameZh: '元朗分校',
    branchNumEn: 'Branch 02',
    branchNumZh: '第二分校',
    addressEn: 'Room 218, Yuen Long Centre, Sau Fu Street',
    addressZh: '元朗壽富街元朗中心 218 室',
    phone: '5406 6800',
    color: 'bg-slate-900',
    image: '/yew.jpeg',
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3689.176461933068!2d114.02758257606085!3d22.44118944111354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3403f0724f2b18a3%3A0x2f6b8973949f2571!2sYuen%20Long%20Centre%2C%2055%20Sau%20Fu%20St%2C%20Yuen%20Long!5e0!3m2!1sen!2shk!4v1710000000000!5m2!1sen!2shk",
    directions: "https://www.google.com/maps/dir/?api=1&destination=Yuen+Long+Centre+Sau+Fu+Street"
  }
};

const VisitCampusCTA: React.FC = () => {
  const locale = useLocale();
  const isZh = locale === "zh";
  const [selected, setSelected] = useState<'kowloon' | 'yuenlong' | null>(null);

  return (
    <section className="relative py-20 bg-white min-h-[700px] flex items-center overflow-hidden font-sans">
      
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        
        {/* HEADER */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-4 shadow-lg"
          >
            <ShieldCheck size={12} className="text-amber-400" /> {isZh ? "棋院校區" : "Academy Locations"}
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-[1000] text-slate-900 tracking-tighter uppercase">
            {isZh ? "親臨我們的" : "Visit Our"} <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 italic font-serif">{isZh ? "香港分校" : "HK Centers"}</span>
          </h2>
        </div>

        <AnimatePresence mode="wait">
          {!selected ? (
            /* STEP 1: INITIAL SELECTION CARDS */
            <motion.div 
              key="selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
            >
              {(['kowloon', 'yuenlong'] as const).map((key) => (
                <button 
                  key={key}
                  onClick={() => setSelected(key)}
                  className="group relative h-64 md:h-80 rounded-[45px] overflow-hidden text-left transition-all hover:-translate-y-2 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] shadow-xl"
                >
                  <img 
                    src={branchData[key].image} 
                    alt={isZh ? branchData[key].nameZh : branchData[key].nameEn}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  <div className={`absolute inset-0 ${branchData[key].color} opacity-40 group-hover:opacity-20 transition-opacity duration-500`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                  <div className="relative z-10 h-full p-10 flex flex-col justify-end">
                    <div className="flex justify-between items-end">
                       <div>
                          <p className="text-[11px] font-black uppercase tracking-[0.3em] text-white/70 mb-2">
                            {isZh ? branchData[key].branchNumZh : branchData[key].branchNumEn}
                          </p>
                          <h3 className="text-3xl md:text-4xl font-[1000] text-white tracking-tight uppercase leading-none">
                            {isZh ? branchData[key].nameZh : branchData[key].nameEn}
                          </h3>
                       </div>
                       
                       <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 group-hover:bg-white group-hover:text-slate-900 transition-all duration-300">
                          <ChevronRight size={28} className="group-hover:translate-x-1 transition-transform" />
                       </div>
                    </div>
                  </div>
                </button>
              ))}
            </motion.div>
          ) : (
            /* STEP 2: SHOW CARD AND MAP */
            <motion.div 
              key="details"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="space-y-6"
            >
              <button 
                onClick={() => setSelected(null)}
                className="flex items-center gap-3 text-slate-400 hover:text-indigo-600 transition-colors mb-6 group"
              >
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-indigo-50">
                  <ArrowLeft size={16} />
                </div>
                <span className="text-[11px] font-black uppercase tracking-widest">{isZh ? "返回校區列表" : "Return to branches"}</span>
              </button>

              <div className="grid lg:grid-cols-12 gap-6 items-stretch">
                {/* BRANCH CARD */}
                <div className={`lg:col-span-4 p-10 rounded-[3rem] text-white flex flex-col justify-between ${branchData[selected].color} shadow-2xl relative overflow-hidden group`}>
                   <img 
                      src={branchData[selected].image} 
                      className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:scale-110 transition-transform duration-[10s]" 
                      alt=""
                   />

                   <div className="relative z-10">
                      <div className="bg-white/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-10 backdrop-blur-md border border-white/10">
                         <MapPin size={28} />
                      </div>
                      <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white/50 mb-2">
                        {isZh ? branchData[selected].branchNumZh : branchData[selected].branchNumEn}
                      </p>
                      <h3 className="text-4xl font-[1000] tracking-tighter uppercase mb-6 leading-none">
                        {isZh ? branchData[selected].nameZh : branchData[selected].nameEn}
                      </h3>
                      <p className="text-sm font-bold text-white/80 leading-relaxed mb-8 max-w-[250px]">
                         {isZh ? branchData[selected].addressZh : branchData[selected].addressEn}
                      </p>
                   </div>

                   <div className="relative z-10 space-y-4">
                      <div className="flex items-center gap-4 py-4 border-t border-white/10">
                         <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                            <Phone size={18} />
                         </div>
                         <span className="text-lg font-black tracking-tight">{branchData[selected].phone}</span>
                      </div>
                      <a 
                         href={branchData[selected].directions}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="flex items-center justify-between bg-white text-slate-900 p-6 rounded-[2rem] font-black transition-all hover:bg-slate-100 group/btn"
                      >
                         <span className="text-[11px] font-black uppercase tracking-[0.2em]">{isZh ? "獲取路線" : "Get Directions"}</span>
                         <Navigation size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                      </a>
                   </div>
                </div>

                {/* MAP CONTAINER */}
                <div className="lg:col-span-8 h-[500px] lg:h-auto bg-slate-100 rounded-[3.5rem] overflow-hidden border-[12px] border-white shadow-2xl relative">
                   <iframe 
                      src={branchData[selected].mapUrl}
                      className="w-full h-full border-0 grayscale-[0.1] contrast-[1.05]"
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