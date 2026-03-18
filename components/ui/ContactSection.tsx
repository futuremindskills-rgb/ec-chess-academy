"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Smartphone, 
  Mail, 
  MapPin, 
  Send, 
  Loader2, 
  CheckCircle2, 
  ShieldCheck, 
  Star, 
  Zap, 
  ChevronDown,
  ExternalLink
} from 'lucide-react';
import { submitEnquiry } from '@/app/actions/adminActions';

const ContactSection: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    try {
      if (!formData.get("subject")) {
        formData.set("subject", "General Enquiry");
      }
      await submitEnquiry(formData);
      setIsSuccess(true);
    } catch (error) {
      alert("Something went wrong. Please reach out via WhatsApp directly.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const contactMethods = [
    {
      title: "Kowloon City Support",
      value: "4614 4561",
      icon: <Smartphone className="w-5 h-5 text-slate-900" />,
      cardBg: "bg-[#FFD700]", // YELLOW
      textColor: "text-slate-900",
      link: "https://form.wa.link/ecchess"
    },
    {
      title: "Yuen Long Support",
      value: "5406 6800",
      icon: <Smartphone className="w-5 h-5 text-white" />,
      cardBg: "bg-[#4F46E5]", // INDIGO
      textColor: "text-white",
      link: "https://form.wa.link/ecchessylc"
    },
    {
      title: "Official Email",
      value: "enquiry.ecchess@gmail.com",
      icon: <Mail className="w-5 h-5 text-slate-900" />,
      cardBg: "bg-slate-100", 
      textColor: "text-slate-900",
      link: "mailto:enquiry.ecchess@gmail.com"
    }
  ];

  return (
    <section className="relative py-16 lg:py-24 bg-white overflow-hidden font-sans" id="contact">
      
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-indigo-50 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-amber-50 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* HEADER */}
        <div className="text-center mb-12 lg:mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest mb-3 shadow-lg"
          >
            <ShieldCheck size={12} className="text-amber-400" />
            Admissions Open
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-[1000] text-slate-900 tracking-tighter leading-none uppercase">
            Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-amber-500">Chess Journey</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Contact Cards */}
          <div className="lg:col-span-4 space-y-4">
            {contactMethods.map((method, idx) => (
              <motion.a
                key={idx}
                href={method.link}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`${method.cardBg} block p-6 rounded-[30px] shadow-lg relative group overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl`}
              >
                <div className="absolute -right-2 -bottom-2 opacity-10 group-hover:scale-110 transition-transform">
                   <Zap size={60} fill="currentColor" />
                </div>
                <div className="bg-white/20 w-10 h-10 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm">
                   {method.icon}
                </div>
                <h3 className={`text-[9px] font-black uppercase tracking-widest ${method.textColor} opacity-60 mb-1`}>
                  {method.title}
                </h3>
                <p className={`text-lg font-[1000] ${method.textColor} truncate`}>
                  {method.value}
                </p>
              </motion.a>
            ))}

            {/* ADDRESS CARD */}
            <div className="bg-slate-900 p-8 rounded-[35px] text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10 space-y-6">
                    <div>
                        <div className="flex items-center gap-2 text-amber-400 mb-2">
                            <MapPin size={18} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Kowloon City</span>
                        </div>
                        <p className="text-xs font-bold leading-relaxed text-slate-300">
                            Smart-A Unit 3/B, 348-352 Prince Edward Road West
                        </p>
                    </div>
                    <div className="h-px bg-slate-800 w-full" />
                    <div>
                        <div className="flex items-center gap-2 text-indigo-400 mb-2">
                            <MapPin size={18} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Yuen Long</span>
                        </div>
                        <p className="text-xs font-bold leading-relaxed text-slate-300">
                            Room 218, Yuen Long Centre, Sau Fu Street
                        </p>
                    </div>
                </div>
                <div className="absolute top-0 right-0 p-4 opacity-10 text-white">
                    <Star size={40} fill="currentColor" />
                </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Form */}
          <div className="lg:col-span-8">
            <div className="bg-slate-50 rounded-[40px] p-6 lg:p-12 border border-slate-100 shadow-sm relative overflow-hidden">
               <AnimatePresence mode="wait">
               {isSuccess ? (
                 <motion.div 
                   key="success"
                   initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                   className="py-12 flex flex-col items-center text-center"
                 >
                    <div className="w-20 h-20 bg-emerald-500 text-white rounded-3xl flex items-center justify-center mb-6 shadow-2xl rotate-3">
                       <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-3xl font-[1000] text-slate-900 mb-2 uppercase tracking-tighter">Transmission Sent</h3>
                    <p className="text-slate-500 font-bold mb-8 uppercase text-xs tracking-widest">We will verify your enquiry and respond within 24 hours.</p>
                    <button onClick={() => setIsSuccess(false)} className="text-indigo-600 font-black text-xs uppercase tracking-widest hover:underline">Send another enquiry</button>
                 </motion.div>
               ) : (
                 <form action={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                    <div className="space-y-1.5">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Parent Name</label>
                       <input name="parentName" type="text" required placeholder="Enter Full Name" 
                         className="w-full px-6 py-4 bg-white border-2 border-slate-100 rounded-[20px] focus:border-indigo-500 outline-none transition-all font-bold text-slate-900" />
                    </div>

                    <div className="space-y-1.5">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Student Name</label>
                       <input name="studentName" type="text" placeholder="Enter Student Name" 
                         className="w-full px-6 py-4 bg-white border-2 border-slate-100 rounded-[20px] focus:border-indigo-500 outline-none transition-all font-bold text-slate-900" />
                    </div>

                    <div className="space-y-1.5">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Email</label>
                       <input name="email" type="email" required placeholder="example@email.com" 
                         className="w-full px-6 py-4 bg-white border-2 border-slate-100 rounded-[20px] focus:border-indigo-500 outline-none transition-all font-bold text-slate-900" />
                    </div>

                    <div className="space-y-1.5">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">WhatsApp / Phone</label>
                       <input name="phone" type="tel" required placeholder="+852" 
                         className="w-full px-6 py-4 bg-white border-2 border-slate-100 rounded-[20px] focus:border-indigo-500 outline-none transition-all font-bold text-slate-900" />
                    </div>

                    <div className="md:col-span-2 space-y-1.5">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Preferred Location</label>
                       <div className="relative">
                          <select 
                            name="location" 
                            required 
                            className="w-full px-6 py-4 bg-white border-2 border-slate-100 rounded-[20px] focus:border-indigo-500 outline-none transition-all font-bold text-slate-900 appearance-none cursor-pointer"
                          >
                             <option value="Kowloon City">Kowloon City Branch</option>
                             <option value="Yuen Long">Yuen Long Branch</option>
                             <option value="Online">Online Sessions</option>
                          </select>
                          <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                       </div>
                    </div>

                    <div className="md:col-span-2 space-y-1.5">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Enquiry Message</label>
                       <textarea name="message" rows={4} required placeholder="Ask about trial classes, schedules, or fees..." 
                          className="w-full px-6 py-4 bg-white border-2 border-slate-100 rounded-[25px] focus:border-indigo-500 outline-none transition-all font-bold text-slate-900 resize-none" />
                    </div>

                    <div className="md:col-span-2 pt-2">
                       <button 
                         type="submit" 
                         disabled={isSubmitting}
                         className="w-full bg-[#4F46E5] hover:bg-slate-900 text-white font-[1000] py-5 px-10 rounded-[25px] flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-50 shadow-xl shadow-indigo-100 uppercase tracking-[0.2em] text-xs"
                       >
                          {isSubmitting ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            <>Submit Application <Send size={16} /></>
                          )}
                       </button>
                    </div>
                 </form>
               )}
               </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;