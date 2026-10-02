"use client";
import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { 
  Phone, 
  Mail, 
  MessageCircle,
  Rocket,
  Facebook,
  Instagram,
  ChevronUp,
  MapPin,
  ExternalLink
} from "lucide-react";

export default function Footer() {
  const t = useTranslations("footer");
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const footerLinks = [
    { name: t("home"), href: "/" },
    { name: t("curriculum"), href: "/courses" },
    { name: t("gallery"), href: "/gallery" },
    { name: t("blog"), href: "/blog" },
  ];

  const links = [
    { name: t("contactUs"), href: "/contact" },
    { name: t("achievements"), href: "/achievements" },
    { name: t("aboutUs"), href: "/about" },
    { name: t("registration"), href: "/tournaments" },
    { name: t("policies"), href: "/policies" }
  ];

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
          
          {/* LOGO & CONTACT COLUMN */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-auto h-20 p-2 shadow-xl">
                 <img 
                   src="/icon.png" 
                   alt="EC Chess Academy HK" 
                   width={80} 
                   height={80} 
                   className="w-full h-full object-contain" 
                 />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-3xl tracking-tighter uppercase leading-none">
                  EC <span className="text-orange-500">CHESS</span>
                </span>
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-60 mt-1">{t("tagline")}</span>
              </div>
            </Link>
            
            <div className="space-y-4 pt-2">
              <a 
                href="mailto:enquiry.ecchess@gmail.com" 
                className="flex items-center gap-3 group text-slate-300 hover:text-white transition-colors"
                aria-label="Email EC Chess Academy"
              >
                <div className="p-2 rounded-lg bg-white/10 group-hover:bg-indigo-500 transition-all">
                  <Mail size={18} />
                </div>
                <span className="text-sm font-medium">enquiry.ecchess@gmail.com</span>
              </a>
              <div className="flex items-center gap-3 text-slate-300">
                <div className="p-2 rounded-lg bg-white/10">
                  <Phone size={18} />
                </div>
                <span className="text-sm font-medium">+852 4614 4561 / +852 5406 6800</span>
              </div>
              <div className="flex gap-3 pt-2">
                <Link href="https://www.facebook.com/ecchess" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="p-2.5 bg-white/10 rounded-full hover:bg-white hover:text-indigo-900 transition-all">
                  <Facebook size={18} />
                </Link>
                <Link href="https://www.instagram.com/ec_chess/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-2.5 bg-white/10 rounded-full hover:bg-white hover:text-indigo-900 transition-all">
                  <Instagram size={18} />
                </Link>
                <Link href="https://twitter.com/ecchess" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="p-2.5 bg-white/10 rounded-full hover:bg-white hover:text-indigo-900 transition-all">
                  <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </Link>
                <Link href="https://www.linkedin.com/company/ecchess" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-2.5 bg-white/10 rounded-full hover:bg-white hover:text-indigo-900 transition-all">
                  <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.78c-.9 0-1.63.73-1.63 1.63s.73 1.63 1.63 1.63 1.63-.73 1.63-1.63-.73-1.63-1.63-1.63z"/></svg>
                </Link>
                <Link href="https://www.youtube.com/@ecchess" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="p-2.5 bg-white/10 rounded-full hover:bg-white hover:text-indigo-900 transition-all">
                  <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </Link>
              </div>
            </div>
          </div>

          {/* LINKS COLUMN */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-black uppercase tracking-widest mb-4">{t("usefulLinks")}</h3>
            <div className="w-10 h-1.5 bg-indigo-500 rounded-full mb-6" />
            <ul className="space-y-4 text-slate-300">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-white hover:translate-x-1 inline-block transition-all font-bold"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COMPANY COLUMN */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-black uppercase tracking-widest mb-4">{t("ourCompany")}</h3>
            <div className="w-10 h-1.5 bg-purple-500 rounded-full mb-6" />
            <ul className="space-y-4 text-slate-300">
              {links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-white hover:translate-x-1 inline-block transition-all font-bold"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* BRANCHES COLUMN */}
          <div className="lg:col-span-4 space-y-6">
            <h3 className="text-lg font-black uppercase tracking-widest mb-4">{t("hkBranches")}</h3>
            <div className="w-10 h-1.5 bg-orange-500 rounded-full mb-6" />
            
            <div className="space-y-6">
              {/* Kowloon City Branch */}
              <div itemScope itemType="https://schema.org/LocalBusiness" className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/50 transition-all">
                <meta itemProp="name" content="EC Chess Academy HK - Kowloon City Branch" />
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-orange-400 font-black text-xs uppercase tracking-widest">
                    <MapPin size={14} />
                    <span>{t("kowloonCity")}</span>
                  </div>
                  <Link href="https://form.wa.link/ecchess" target="_blank" className="text-[9px] font-black bg-orange-500 text-white px-2 py-0.5 rounded hover:bg-orange-600 transition-colors">
                    {t("enquireNow")}
                  </Link>
                </div>
                <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress" className="text-xs text-slate-300 leading-relaxed mb-2">
                  <span className="font-semibold text-white">Address: </span>
                  <span itemProp="streetAddress">Room B, 3/F, 352 Prince Edward Road West</span>,{" "}
                  <span itemProp="addressLocality">Kowloon City</span>,{" "}
                  <span itemProp="addressRegion">Kowloon</span>,{" "}
                  <span itemProp="addressCountry">Hong Kong</span> (352號薈學坊3樓B室)
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <Phone size={12} className="text-orange-400" />
                  <span>Phone: <span itemProp="telephone">+852 4614 4561</span></span>
                </div>
              </div>

              {/* Yuen Long Branch */}
              <div itemScope itemType="https://schema.org/LocalBusiness" className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/50 transition-all">
                <meta itemProp="name" content="EC Chess Academy HK - Yuen Long Branch" />
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-indigo-400 font-black text-xs uppercase tracking-widest">
                    <MapPin size={14} />
                    <span>{t("yuenLong")}</span>
                  </div>
                  <Link href="https://form.wa.link/ecchessylc" target="_blank" className="text-[9px] font-black bg-indigo-500 text-white px-2 py-0.5 rounded hover:bg-indigo-600 transition-colors">
                    {t("enquireNow")}
                  </Link>
                </div>
                <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress" className="text-xs text-slate-300 leading-relaxed mb-2">
                  <span className="font-semibold text-white">Address: </span>
                  <span itemProp="streetAddress">Room 218, Yuen Long Centre, 55 Sau Fu Street</span>,{" "}
                  <span itemProp="addressLocality">Yuen Long</span>, <span itemProp="addressCountry">Hong Kong</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <Phone size={12} className="text-indigo-400" />
                  <span>Phone: <span itemProp="telephone">+852 5406 6800</span></span>
                </div>
              </div>

              {/* Shek Mun Teaching Point */}
              <div itemScope itemType="https://schema.org/LocalBusiness" className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/50 transition-all">
                <meta itemProp="name" content="EC Chess Academy HK - Shek Mun Teaching Point (Phonics Lab)" />
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-black text-xs uppercase tracking-widest">
                    <MapPin size={14} />
                    <span>{t("shekMun")}</span>
                  </div>
                  <Link href="/courses/shek-mun-phonics-lab" className="text-[9px] font-black bg-emerald-600 text-white px-2 py-0.5 rounded hover:bg-emerald-500 transition-colors">
                    {t("enquireNow")}
                  </Link>
                </div>
                <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress" className="text-xs text-slate-300 leading-relaxed mb-2">
                  <span className="font-semibold text-white">Address: </span>
                  <span itemProp="streetAddress">Flat B, 7/F, Kings Wing Plaza 2, 1 On Kwan St</span>,{" "}
                  <span itemProp="addressLocality">Shek Mun, Shatin</span>, <span itemProp="addressCountry">Hong Kong</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <Phone size={12} className="text-emerald-400" />
                  <span>Phone: <span itemProp="telephone">+852 4614 4561 / 6224 2973</span></span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* --- 4. BOTTOM BAR --- */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
          
          <motion.a 
            whileHover={{ scale: 1.05 }}
            href="https://wa.me/852546144561" 
            target="_blank"
            className="flex items-center gap-3 bg-[#25D366] px-6 py-3 rounded-2xl shadow-xl border-b-4 border-green-700"
          >
            <MessageCircle size={20} fill="white" />
            <span className="text-sm font-black uppercase tracking-wider">{t("whatsapp")}</span>
          </motion.a>

          <div className="flex flex-col items-center">
            <p className="text-[10px] font-bold opacity-40 uppercase tracking-[0.2em] text-center">
              © 2010 - {new Date().getFullYear()} {t("copyright")}
            </p>
            <a 
              href="https://wa.me/919772187400" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[10px] font-bold opacity-40 uppercase tracking-[0.2em] mt-2 hover:opacity-100 transition-opacity underline decoration-indigo-500/30"
            >
              {t("designedBy")}
            </a>
          </div>

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
