"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  School, 
  Building2, 
  Presentation, 
  Trophy, 
  Target, 
  BookOpen, 
  Sparkles,
  ChevronRight,
  Handshake,
  HeartPulse,
  LayoutGrid
} from 'lucide-react';

const OutreachSection = () => {
  // CATEGORIZED SERVICES
  const serviceCategories = [
    {
      title: "School & Academic Programs",
      icon: <School className="w-6 h-6" />,
      items: [
        "After-School Interest Classes",
        "Inter-School & In-School Competitions",
        "School Team Training",
        "Life-wide Learning Days",
        "Chinese Culture Day Workshops",
        "Strategic Life Planning"
      ]
    },
    {
      title: "Professional & Corporate",
      icon: <Building2 className="w-6 h-6" />,
      items: [
        "Corporate Team Building",
        "Teacher Development Days",
        "Professional Tutor Training",
        "Educational Seminars",
        "Adult Strategic Chess Courses"
      ]
    },
    {
      title: "Events & Community",
      icon: <Sparkles className="w-6 h-6" />,
      items: [
        "Event & Experience Days",
        "Chess Equipment & Sales",
        "Parent-Child Workshops",
        "Bespoke Collaborations"
      ]
    }
  ];

  // PARTNERSHIP DATA
  const partnerGroups = [
    {
      category: "Primary Education",
      schools: [
        "Wing Kwong Primary School (Tai Po)",
        "CNEC Ta Tung School",
        "Yuen Yuen Institute Shek Wai Kok Primary",
        "S.K.H. Yautong Kei Hin Primary School",
        "L.S.T. Yeung Chung Ming School",
        "Bloom KKCA Academy"
      ]
    },
    {
      category: "Secondary Education",
      schools: [
        "Newman Catholic College",
        "S.K.H. Lam Woo Memorial Secondary",
        "Fanling Government Secondary School"
      ]
    },
    {
      category: "NGOs & Community",
      schools: [
        "St. James' Settlement",
        "Aberdeen Kai-fong Welfare Association (AKA)",
        "YWCA Ho Man Tin",
        "Club Bel-Air",
        "Hok Sik Education Center"
      ]
    }
  ];

  return (
    <section className="relative py-24 bg-white overflow-hidden font-sans">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
        <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] bg-indigo-50 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 left-[-10%] w-[500px] h-[500px] bg-amber-50 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* SECTION 1: INTRODUCTION */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-600 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-6 shadow-lg">
              <Handshake size={14} /> Outreach Services
            </div>
            <h2 className="text-3xl md:text-5xl font-[1000] text-slate-900 tracking-tighter uppercase leading-[0.9] mb-8">
              Strategic Minds <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 italic font-serif">Beyond The Academy</span>
            </h2>
            <p className="text-lg text-slate-600 font-medium leading-relaxed mb-6">
              Beyond our standard curriculum, EC Chess Education is dedicated to bringing the benefits of chess to the wider community. We have organized over <span className="text-indigo-600 font-black">1,000 specialized programs</span> to date for schools, universities, and corporate partners.
            </p>
            <div className="grid grid-cols-2 gap-6 py-8 border-t border-slate-100">
               <div>
                  <h4 className="flex items-center gap-2 text-slate-900 font-black uppercase text-xs tracking-widest mb-2">
                    <Target className="text-indigo-600" size={16} /> Holistic Dev
                  </h4>
                  <p className="text-xs text-slate-500 font-bold leading-relaxed">Building patience, focus, and resilience through logic.</p>
               </div>
               <div>
                  <h4 className="flex items-center gap-2 text-slate-900 font-black uppercase text-xs tracking-widest mb-2">
                    <Trophy className="text-amber-500" size={16} /> Elite Training
                  </h4>
                  <p className="text-xs text-slate-500 font-bold leading-relaxed">Preparing students to navigate life’s challenges with confidence.</p>
               </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-[500px] rounded-[60px] overflow-hidden shadow-2xl"
          >
            <img 
              src="/1.webp" 
              className="absolute inset-0 w-full h-full object-cover"
              alt="Chess Outreach"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/40 to-transparent" />
            <div className="absolute bottom-10 left-10 right-10 p-8 bg-white/90 backdrop-blur-xl rounded-[30px] shadow-xl border border-white/20">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-xl">1k+</div>
                  <p className="text-xs font-black text-slate-900 uppercase tracking-widest">Successfully Organized <br />Specialized Programs</p>
               </div>
            </div>
          </motion.div>
        </div>

        {/* SECTION 2: SERVICES GRID */}
        <div className="mb-32">
          <div className="text-center mb-16">
             <h3 className="text-3xl md:text-4xl font-[1000] text-slate-900 uppercase tracking-tighter">Available Services</h3>
             <div className="w-20 h-1.5 bg-indigo-600 mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {serviceCategories.map((cat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-slate-50 p-10 rounded-[45px] border border-slate-100 hover:bg-white hover:shadow-2xl hover:border-transparent transition-all group"
              >
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  {cat.icon}
                </div>
                <h4 className="text-xl font-[1000] text-slate-900 uppercase tracking-tight mb-6">{cat.title}</h4>
                <ul className="space-y-4">
                  {cat.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm font-bold text-slate-500">
                      <ChevronRight size={16} className="text-indigo-400 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <p className="mt-12 text-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 max-w-2xl mx-auto">
            *Service fees are adjusted based on location, date, time, and scale. Contact our Outreach Officer for a customized proposal.
          </p>
        </div>

        {/* SECTION 3: PARTNERSHIP TRACK RECORD */}
        <div className="bg-slate-900 rounded-[60px] p-12 md:p-20 overflow-hidden relative">
           <div className="absolute top-0 right-0 p-20 opacity-5 text-white">
              <LayoutGrid size={300} />
           </div>

           <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                 <div>
                    <h3 className="text-3xl md:text-5xl font-[1000] text-white uppercase tracking-tighter mb-4">Past & Current <br /><span className="text-indigo-400">Partnerships</span></h3>
                    <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em]">Join the leading network of schools and organizations</p>
                 </div>
                 <div className="h-px flex-grow bg-slate-800 mx-8 hidden md:block" />
              </div>

              <div className="grid md:grid-cols-3 gap-12">
                 {partnerGroups.map((group, idx) => (
                    <div key={idx}>
                       <h5 className="text-indigo-400 font-black uppercase text-[10px] tracking-[0.2em] mb-6 flex items-center gap-2">
                          <BookOpen size={14} /> {group.category}
                       </h5>
                       <div className="flex flex-wrap gap-2">
                          {group.schools.map((school, i) => (
                             <span key={i} className="px-4 py-2 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-full text-[11px] font-bold text-slate-300 transition-colors cursor-default">
                                {school}
                             </span>
                          ))}
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>

      </div>
    </section>
  );
};

export default OutreachSection;