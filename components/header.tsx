"use client";

import React, { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useParams } from "next/navigation";


/* -------------------------------------------------------------------------- */
/*                               INTERNAL ICONS                               */
/* -------------------------------------------------------------------------- */

const MenuIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

/* -------------------------------------------------------------------------- */
/*                                MAIN COMPONENT                              */
/* -------------------------------------------------------------------------- */

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const t = useTranslations("header");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => {
    const nextLocale = locale === "en" ? "zh" : "en";
   router.replace(pathname, { locale: nextLocale });
    setIsMobileMenuOpen(false);
  };

  /* -------------------------------------------------------------------------- */
  /*                                  NAV ITEMS                                 */
  /* -------------------------------------------------------------------------- */

  const navItems = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.about"), href: "/about" },
    { name: t("nav.courses"), href: "/courses" },
    { name: t("nav.tournaments"), href: "/tournaments" },
    { name: t("nav.achievements"), href: "/achievements" },
    { name: t("nav.gallery"), href: "/gallery" },
    { name: t("nav.blog"), href: "/blog" },
  ];

  return (
    <div className="w-full relative z-50 font-sans">
      {/* Main Navbar */}

      <header
        className={`w-full transition-all duration-300 ${
          scrolled
            ? "fixed top-0 bg-white/80 backdrop-blur-md shadow-sm py-3 border-b border-gray-100"
            : "relative bg-white py-6 border-b border-gray-50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Logo */}

          <Link href="/" className="flex items-center group">
            <div>
              <img
                src="/eclogo.png"
                alt="EC Chess"
                className="w-auto h-14 object-contain"
              />
            </div>
          </Link>

          {/* Desktop Nav */}

          <nav className="hidden lg:flex items-center gap-1 xl:gap-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-[13px] font-extrabold uppercase tracking-widest px-4 py-2 rounded-full transition-all duration-200 ${
                  pathname === item.href
                    ? "text-purple-600 bg-purple-50"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Section */}

          <div className="flex items-center gap-4">
            {/* Language Switch */}

            <button
              onClick={toggleLanguage}
              className="hidden md:inline-flex items-center justify-center whitespace-nowrap px-5 py-3 text-[12px] font-black tracking-widest text-slate-700 border border-gray-200 rounded-full hover:bg-slate-100 transition-all duration-300"
            >
              {t("switchLanguage")}
            </button>

            {/* Contact Button */}

            <Link
              href="/contact"
              className="hidden md:inline-flex items-center justify-center whitespace-nowrap px-7 py-3 text-[13px] font-black uppercase tracking-widest text-white transition-all duration-300 bg-slate-900 rounded-full hover:bg-purple-600 hover:shadow-[0_10px_20px_rgba(147,51,234,0.3)] active:scale-95"
            >
              {t("contactUs")}
            </Link>

            {/* Mobile Menu Button */}

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <MenuIcon className="w-7 h-7" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}

      <div
        className={`fixed inset-0 z-[60] lg:hidden transition-all duration-500 ${
          isMobileMenuOpen ? "visible" : "invisible pointer-events-none"
        }`}
      >
        {/* Backdrop */}

        <div
          className={`absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity duration-500 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Drawer */}

        <div
          className={`absolute top-0 right-0 h-full w-[80%] bg-white transition-transform duration-500 ease-out shadow-2xl flex flex-col ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Mobile Header */}

          <div className="p-6 flex items-center justify-between border-b border-gray-50">
            <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
              <img
                src="/ecchess.jpeg"
                alt="EC Chess"
                className="w-6 h-6 object-contain brightness-0 invert"
              />
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-slate-400 hover:text-slate-900 transition-colors"
            >
              <XIcon className="w-7 h-7" />
            </button>
          </div>

          {/* Mobile Language Button */}

          <div className="px-6 pt-6">
            <button
              onClick={toggleLanguage}
              className="w-full py-4 text-sm font-black tracking-widest text-slate-700 border border-gray-200 rounded-2xl"
            >
              {t("switchLanguage")}
            </button>
          </div>

          {/* Mobile Links */}

          <div className="flex-1 overflow-y-auto p-6 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block w-full p-4 text-lg font-bold rounded-2xl transition-all ${
                  pathname === item.href
                    ? "bg-purple-50 text-purple-600"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile CTA */}

          <div className="p-6 border-t border-gray-50">
            <Link
              href="/contact"
              className="flex items-center justify-center w-full py-4 text-white bg-slate-900 font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-slate-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("bookFreeDemo")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
