"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import {
  Trophy, Calendar, MapPin, Users, DollarSign,
  ChevronLeft, FileText, ExternalLink, Loader2,
  User, Mail, Phone, Cake, Baby, BarChart,
  ShieldCheck, CreditCard, Ticket, X,
  CheckCircle2, AlertCircle
} from "lucide-react";
import { getTournamentById, validateCouponAction } from "@/app/actions/adminActions";
import { registerForTournament } from "@/app/actions/tournamentActions";
import { useLocale } from "next-intl";

const formatDateTime = (date: any) => {
  if (!date) return "—";
  try {
    const iso = typeof date === "string" ? date : date.toISOString();
    const [d, t] = iso.split("T");
    const [year, month, day] = d.split("-");
    let [hour, minute] = t.split(":");
    let h = parseInt(hour);
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return `${day} ${monthNames[parseInt(month) - 1]} ${year}, ${h}:${minute} ${ampm}`;
  } catch {
    return "—";
  }
};

export default function TournamentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const locale = useLocale();
  const isZh = locale === "zh";

  const [tournament, setTournament] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Registration modal
  const [showRegModal, setShowRegModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<"asiapay" | null>(null);

  // Coupon
  const [couponInput, setCouponInput] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<{ type: string; value: number } | null>(null);
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponMsg, setCouponMsg] = useState({ text: "", isError: false });

  // PDF viewer
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);
  const [pdfLoading, setPdfLoading] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const id = parseInt(params.id as string);
        if (isNaN(id)) { setNotFound(true); return; }
        const data = await getTournamentById(id);
        if (!data) { setNotFound(true); return; }
        setTournament(data);
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [params.id]);

  // Load PDF as blob to force correct Content-Type in the iframe
  useEffect(() => {
    if (!tournament?.regulations) return;
    setPdfLoading(true);
    // Clean up previous blob URL
    setPdfBlobUrl(null);

    fetch(tournament.regulations)
      .then(async (res) => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const buffer = await res.arrayBuffer();
        const blob = new Blob([buffer], { type: "application/pdf" });
        setPdfBlobUrl(URL.createObjectURL(blob));
      })
      .catch((err) => {
        console.warn("[PDF] Direct fetch failed, falling back to proxy:", err.message);
        // Fallback: use server proxy
        setPdfBlobUrl(`/api/pdf-proxy?url=${encodeURIComponent(tournament.regulations)}`);
      })
      .finally(() => setPdfLoading(false));
  }, [tournament?.regulations]);

  const isPdfUrl = (url: string) =>
    !!(url && url.length > 0);

  // Always proxy through our API so the browser gets correct Content-Type: application/pdf
  // The direct Cloudinary raw URL serves as octet-stream which Chrome's PDF viewer rejects
  const getProxiedPdfUrl = (url: string) =>
    `/api/pdf-proxy?url=${encodeURIComponent(url)}`;

  const originalPrice = tournament ? tournament.entryFee / 100 : 0;
  let finalPrice = originalPrice;
  if (appliedDiscount) {
    if (appliedDiscount.type === "PERCENT") {
      finalPrice = originalPrice * (1 - appliedDiscount.value / 100);
    } else {
      finalPrice = Math.max(0, originalPrice - appliedDiscount.value);
    }
  }

  const handleApplyCoupon = async () => {
    if (!couponInput || !tournament) return;
    setCouponLoading(true);
    setCouponMsg({ text: "", isError: false });
    try {
      const res = await validateCouponAction(couponInput, tournament.id);
      if (res.valid) {
        setAppliedDiscount({ type: res.discountType!, value: res.discountValue! });
        setCouponMsg({ text: isZh ? "優惠碼已成功使用！" : "Coupon applied!", isError: false });
      } else {
        setAppliedDiscount(null);
        setCouponMsg({ text: res.message || (isZh ? "優惠碼無效" : "Invalid coupon"), isError: true });
      }
    } catch {
      setCouponMsg({ text: isZh ? "驗證失敗" : "Error validating coupon", isError: true });
    } finally {
      setCouponLoading(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedMethod) {
      alert(isZh ? "請選擇支付方式" : "Please select a payment method");
      return;
    }
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    formData.append("method", selectedMethod);
    if (appliedDiscount) formData.append("couponCode", couponInput);
    try {
      const result = await registerForTournament(formData);
      if (result?.url) {
        window.location.href = result.url;
      } else if (result?.error) {
        alert(result.error);
      }
    } catch {
      alert(isZh ? "發生錯誤，請重試。" : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeRegModal = () => {
    setShowRegModal(false);
    setSelectedMethod(null);
    setAppliedDiscount(null);
    setCouponInput("");
    setCouponMsg({ text: "", isError: false });
  };

  // ── Loading ──
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
          <p className="font-black uppercase tracking-widest text-xs text-slate-400">
            {isZh ? "正在載入..." : "Loading..."}
          </p>
        </div>
      </div>
    );
  }

  // ── Not found ──
  if (notFound || !tournament) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Trophy className="w-16 h-16 text-slate-200 mx-auto mb-4" />
          <h1 className="text-2xl font-black uppercase">{isZh ? "賽事不存在" : "Tournament Not Found"}</h1>
          <button
            onClick={() => router.push("/tournaments")}
            className="mt-6 px-8 py-3 bg-indigo-600 text-white font-black rounded-2xl uppercase text-xs"
          >
            {isZh ? "← 返回賽事列表" : "← Back to Tournaments"}
          </button>
        </div>
      </div>
    );
  }

  const levels = tournament.levels ? (() => { try { return JSON.parse(tournament.levels); } catch { return []; } })() : [];
  const categories = tournament.categories ? (() => { try { return JSON.parse(tournament.categories); } catch { return []; } })() : [];

  return (
    <div className="bg-white font-sans text-slate-900 pb-32 overflow-x-hidden">

      {/* ── HERO BANNER ── */}
      <div className="relative w-full h-[55vh] min-h-[340px] bg-slate-900 overflow-hidden">
        {tournament.bannerImage && (
          <Image
            src={tournament.bannerImage}
            alt={tournament.title}
            fill
            className="object-cover opacity-50"
          />
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />

        {/* Back button */}
        <div className="absolute top-6 left-6 z-10">
          <motion.button
            whileHover={{ x: -4 }}
            onClick={() => router.back()}
            className="flex items-center gap-2 px-5 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white font-black text-[10px] uppercase tracking-widest hover:bg-white/20 transition-all"
          >
            <ChevronLeft size={16} />
            {isZh ? "返回" : "Back"}
          </motion.button>
        </div>

        {/* Status badge */}
        <div className="absolute top-6 right-6 z-10">
          <span className={`px-4 py-2 text-[10px] font-black uppercase border-2 border-slate-900 shadow-[3px_3px_0px_#000] rounded-lg ${
            tournament.status === "OPEN" ? "bg-emerald-400 text-slate-900" : "bg-slate-300 text-slate-700"
          }`}>
            {tournament.status === "OPEN" ? (isZh ? "接受報名" : "OPEN") : (isZh ? "報名已關閉" : tournament.status)}
          </span>
        </div>

        {/* Title block */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map((cat: string) => (
                <span key={cat} className="px-3 py-1 bg-indigo-600 text-white text-[9px] font-black uppercase rounded-lg border border-indigo-400">
                  {cat}
                </span>
              ))}
            </div>
            <h1 className="text-3xl md:text-5xl font-[1000] uppercase tracking-tighter text-white leading-tight mb-2">
              {tournament.title}
            </h1>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ─── LEFT: Details + PDF ─── */}
          <div className="lg:col-span-2 space-y-8">

            {/* Key Info Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: <Calendar size={20} className="text-orange-500" />, label: isZh ? "開始日期" : "Start Date", value: formatDateTime(tournament.startDate) },
                { icon: <MapPin size={20} className="text-indigo-600" />, label: isZh ? "地點" : "Location", value: tournament.location },
                { icon: <Users size={20} className="text-emerald-500" />, label: isZh ? "名額" : "Max Players", value: tournament.maxPlayers },
                { icon: <DollarSign size={20} className="text-amber-500" />, label: isZh ? "報名費" : "Entry Fee", value: `HK$${(tournament.entryFee / 100).toFixed(0)}` },
              ].map((item, i) => (
                <div key={i} className="relative group">
                  <div className="absolute inset-0 bg-slate-900 rounded-[20px] translate-x-1 translate-y-1" />
                  <div className="relative bg-white border-4 border-slate-900 rounded-[20px] p-4">
                    <div className="mb-2">{item.icon}</div>
                    <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">{item.label}</p>
                    <p className="font-black text-sm text-slate-900 mt-0.5 leading-tight">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Skill Levels */}
            {levels.length > 0 && (
              <div className="relative group">
                <div className="absolute inset-0 bg-slate-900 rounded-[24px] translate-x-1.5 translate-y-1.5" />
                <div className="relative bg-white border-4 border-slate-900 rounded-[24px] p-6">
                  <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">
                    {isZh ? "參賽組別" : "Skill Levels / Categories"}
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {levels.map((lvl: string) => (
                      <span key={lvl} className="px-4 py-2 bg-indigo-50 border-2 border-indigo-200 text-indigo-700 font-black text-xs uppercase rounded-xl">
                        {lvl}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── REGULATIONS PDF SECTION ── */}
            <div className="relative group">
              <div className="absolute inset-0 bg-slate-900 rounded-[24px] translate-x-1.5 translate-y-1.5" />
              <div className="relative bg-white border-4 border-slate-900 rounded-[24px] overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b-4 border-slate-900 bg-indigo-50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-600 rounded-xl">
                      <FileText size={18} className="text-white" />
                    </div>
                    <div>
                      <h2 className="font-[1000] uppercase tracking-tight text-slate-900">
                        {isZh ? "賽事章程" : "Tournament Regulations"}
                      </h2>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                        {isZh ? "點擊全螢幕查看 PDF" : "Full regulations document"}
                      </p>
                    </div>
                  </div>
                  {tournament.regulations && isPdfUrl(tournament.regulations) && (
                    <a
                      href={tournament.regulations}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-black text-[9px] uppercase rounded-xl hover:bg-slate-900 transition-all"
                    >
                      <ExternalLink size={12} />
                      {isZh ? "下載" : "Download"}
                    </a>
                  )}
                </div>

                {tournament.regulations && isPdfUrl(tournament.regulations) ? (
                  pdfLoading ? (
                    <div className="flex items-center justify-center gap-3 py-16 text-slate-400">
                      <Loader2 size={24} className="animate-spin text-indigo-500" />
                      <span className="font-black uppercase text-xs tracking-widest">
                        {isZh ? "正在載入章程..." : "Loading regulations..."}
                      </span>
                    </div>
                  ) : pdfBlobUrl ? (
                    <iframe
                      src={pdfBlobUrl}
                      className="w-full border-0"
                      style={{ height: "520px" }}
                      title="Tournament Regulations PDF"
                      allowFullScreen
                    />
                  ) : (
                    <div className="p-8 text-center">
                      <p className="font-black text-slate-400 uppercase text-sm">
                        {isZh ? "無法載入章程" : "Could not load PDF"}
                      </p>
                      <a
                        href={tournament.regulations}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-indigo-600 text-white font-black text-xs uppercase rounded-xl hover:bg-slate-900 transition-all"
                      >
                        <ExternalLink size={14} />
                        {isZh ? "直接開啟 PDF" : "Open PDF Directly"}
                      </a>
                    </div>
                  )
                ) : (
                  <div className="p-12 flex flex-col items-center justify-center text-center gap-4">
                    <div className="p-4 bg-slate-100 rounded-2xl">
                      <AlertCircle size={32} className="text-slate-300" />
                    </div>
                    <div>
                      <p className="font-black text-slate-400 uppercase text-sm">
                        {isZh ? "章程尚未上傳" : "Regulations Not Yet Available"}
                      </p>
                      <p className="text-[10px] text-slate-300 font-bold uppercase mt-1">
                        {isZh ? "請稍後再試" : "Please check back later"}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ─── RIGHT: Sticky Register Panel ─── */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="relative">
                <div className="absolute inset-0 bg-slate-900 rounded-[28px] translate-x-2 translate-y-2" />
                <div className="relative bg-white border-4 border-slate-900 rounded-[28px] p-6 space-y-6">
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                      {isZh ? "報名費" : "Entry Fee"}
                    </p>
                    <p className="text-4xl font-[1000] text-indigo-600">
                      HK${(tournament.entryFee / 100).toFixed(0)}
                    </p>
                  </div>

                  <div className="space-y-2 text-xs font-bold text-slate-500">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-orange-500 shrink-0" />
                      <span>{formatDateTime(tournament.startDate)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-indigo-600 shrink-0" />
                      <span>{tournament.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={14} className="text-emerald-500 shrink-0" />
                      <span>
                        {tournament.registrations?.filter((r: any) => r.status === "COMPLETED").length || 0}
                        {" "}/{" "}{tournament.maxPlayers} {isZh ? "名額" : "spots"}
                      </span>
                    </div>
                  </div>

                  <div className="border-t-2 border-slate-100 pt-4">
                    {tournament.isActive ? (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowRegModal(true)}
                        className="w-full py-4 bg-indigo-600 hover:bg-slate-900 text-white font-black uppercase rounded-2xl transition-all shadow-lg text-sm tracking-widest"
                      >
                        {isZh ? "立即報名" : "Register Now"}
                      </motion.button>
                    ) : (
                      <button
                        disabled
                        className="w-full py-4 bg-slate-200 text-slate-400 font-black uppercase rounded-2xl cursor-not-allowed text-sm tracking-widest"
                      >
                        {isZh ? "報名已關閉" : "Registration Closed"}
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase justify-center">
                    <ShieldCheck size={10} className="text-emerald-500" />
                    {isZh ? "安全支付 · 加密保護" : "Secure & Encrypted Payment"}
                  </div>
                </div>
              </div>

              {/* Categories */}
              {categories.length > 0 && (
                <div className="mt-6 p-5 bg-slate-50 border-4 border-slate-900 rounded-[24px]">
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-3">
                    {isZh ? "比賽項目" : "Game Discipline"}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat: string) => (
                      <span key={cat} className="px-3 py-1.5 bg-white border-2 border-slate-900 text-slate-700 font-black text-[9px] uppercase rounded-lg shadow-[2px_2px_0px_#000]">
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── REGISTRATION MODAL ── */}
      <AnimatePresence>
        {showRegModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white border-4 border-slate-900 rounded-[40px] w-full max-w-2xl my-auto relative shadow-[20px_20px_0px_#000]"
            >
              <button
                onClick={closeRegModal}
                className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full z-10 text-slate-900"
              >
                <X size={24} />
              </button>

              <form onSubmit={handleFormSubmit} className="p-6 md:p-10 max-h-[85vh] overflow-y-auto no-scrollbar text-slate-900">
                <div className="mb-8">
                  <h3 className="text-3xl font-[1000] uppercase tracking-tighter">
                    {isZh ? "賽事報名" : "Tournament Entry"}
                  </h3>
                  <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mt-1">
                    {isZh ? "賽事名稱：" : "Event:"} {tournament.title}
                  </p>
                </div>

                <input type="hidden" name="tournamentId" value={tournament.id} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="relative md:col-span-2">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input required name="playerName" placeholder={isZh ? "學生姓名" : "Student Full Name"} className="w-full pl-12 pr-4 py-4 border-4 border-slate-900 rounded-2xl font-black uppercase text-xs outline-none focus:border-indigo-600 text-slate-900" />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input required name="email" type="email" placeholder={isZh ? "家長電郵" : "Guardian Email"} className="w-full pl-12 pr-4 py-4 border-4 border-slate-900 rounded-2xl font-black uppercase text-xs outline-none focus:border-indigo-600 text-slate-900" />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input required name="phone" placeholder={isZh ? "聯絡電話" : "Phone Number"} className="w-full pl-12 pr-4 py-4 border-4 border-slate-900 rounded-2xl font-black uppercase text-xs outline-none focus:border-indigo-600 text-slate-900" />
                  </div>
                  <div className="relative">
                    <Cake className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input required name="dob" type="date" className="w-full pl-12 pr-4 py-4 border-4 border-slate-900 rounded-2xl font-black text-xs outline-none focus:border-indigo-600 text-slate-900" />
                  </div>
                  <div className="relative">
                    <select required name="gender" className="w-full px-4 py-4 border-4 border-slate-900 rounded-2xl font-black uppercase text-xs outline-none appearance-none bg-white focus:border-indigo-600 text-slate-900">
                      <option value="male">{isZh ? "男" : "Male"}</option>
                      <option value="female">{isZh ? "女" : "Female"}</option>
                    </select>
                  </div>
                  <div className="relative md:col-span-2">
                    <Baby className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <select required name="studentCategory" className="w-full pl-12 pr-4 py-4 border-4 border-slate-900 rounded-2xl font-black uppercase text-xs outline-none appearance-none bg-white focus:border-indigo-600 text-slate-900">
                      <option value="">{isZh ? "-- 選擇組別 --" : "-- Choose Category --"}</option>
                      {levels.map((lvl: string) => (
                        <option key={lvl} value={lvl}>{lvl}</option>
                      ))}
                    </select>
                  </div>
                  <div className="relative md:col-span-2">
                    <BarChart className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input name="rating" placeholder={isZh ? "現時級位 / 等級分" : "Current Level / Rating"} className="w-full pl-12 pr-4 py-4 border-4 border-slate-900 rounded-2xl font-black uppercase text-xs outline-none focus:border-indigo-600 text-slate-900" />
                  </div>
                </div>

                {/* Coupon */}
                <div className="mt-8">
                  <p className="font-black uppercase text-[10px] text-slate-400 tracking-widest mb-2 flex items-center gap-2">
                    <Ticket size={14} className="text-amber-500" /> {isZh ? "優惠碼" : "Coupon Code"}
                  </p>
                  <div className="flex gap-3">
                    <input
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      placeholder={isZh ? "輸入優惠碼" : "ENTER CODE"}
                      className="flex-1 px-4 py-3 border-4 border-slate-900 rounded-xl font-black uppercase text-xs outline-none focus:border-indigo-600 text-slate-900"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      disabled={couponLoading || !couponInput}
                      className="px-6 py-3 bg-slate-900 text-white font-black rounded-xl text-[10px] uppercase hover:bg-indigo-600 transition-all flex items-center justify-center min-w-[80px]"
                    >
                      {couponLoading ? <Loader2 size={16} className="animate-spin" /> : (isZh ? "套用" : "Apply")}
                    </button>
                  </div>
                  {couponMsg.text && (
                    <p className={`text-[9px] font-black uppercase mt-2 ${couponMsg.isError ? "text-red-500" : "text-emerald-500"}`}>
                      {couponMsg.text}
                    </p>
                  )}
                </div>

                {/* Price Display */}
                <div className="mt-6 p-6 bg-indigo-50 border-4 border-indigo-100 rounded-[24px] flex justify-between items-center">
                  <div>
                    <p className="font-black text-indigo-900 uppercase text-[10px] tracking-widest">
                      {appliedDiscount ? (isZh ? "折後總額" : "Discounted Total") : (isZh ? "報名費總額" : "Entry Fee")}
                    </p>
                    <div className="flex items-baseline gap-3">
                      <p className="font-[1000] text-3xl text-indigo-600">HK${finalPrice.toFixed(2)}</p>
                      {appliedDiscount && (
                        <p className="text-sm text-slate-400 line-through font-bold">HK${originalPrice.toFixed(2)}</p>
                      )}
                    </div>
                  </div>
                  <DollarSign className="text-indigo-200" size={48} strokeWidth={3} />
                </div>

                {/* Payment */}
                <div className="mt-8 space-y-4">
                  <div className="flex items-center justify-between px-2">
                    <p className="font-black uppercase text-[10px] text-slate-400 tracking-[0.2em]">
                      {isZh ? "安全支付方式" : "Secure Checkout"}
                    </p>
                    <div className="flex items-center gap-1 bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-md border border-emerald-200">
                      <ShieldCheck size={10} />
                      <span className="text-[8px] font-black uppercase">{isZh ? "已加密" : "Encrypted"}</span>
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    onClick={() => setSelectedMethod("asiapay")}
                    className={`w-full relative flex flex-col items-center justify-center p-6 border-4 border-slate-900 rounded-[32px] transition-all group overflow-hidden
                      ${selectedMethod === "asiapay"
                        ? "bg-indigo-600 text-white -translate-y-1 shadow-[8px_8px_0px_#000]"
                        : "bg-slate-100 text-slate-900 hover:bg-slate-200 shadow-[4px_4px_0px_#000] active:shadow-none active:translate-y-1"}`}
                  >
                    <div className="relative z-10 flex flex-col items-center">
                      <div className={`p-3 rounded-2xl mb-3 transition-colors ${selectedMethod === "asiapay" ? "bg-white/20" : "bg-white border-2 border-slate-900"}`}>
                        <CreditCard size={28} className={selectedMethod === "asiapay" ? "text-white" : "text-indigo-600"} />
                      </div>
                      <span className="font-[1000] uppercase text-sm tracking-tighter mb-1">
                        {isZh ? "透過 AsiaPay (PayDollar) 支付" : "Pay via AsiaPay (PayDollar)"}
                      </span>
                      <p className={`text-[9px] font-bold uppercase tracking-widest mb-4 ${selectedMethod === "asiapay" ? "text-indigo-100" : "text-slate-500"}`}>
                        {isZh ? "香港官方支付網關" : "Official HK Payment Gateway"}
                      </p>
                      <div className="flex flex-wrap justify-center gap-2">
                        {[
                          { name: "PayMe", color: "bg-[#FF0000]" },
                          { name: "WeChat Pay", color: "bg-[#07C160]" },
                          { name: "Octopus", color: "bg-[#F58220]" },
                          { name: "Visa/MC", color: "bg-[#1A1F71]" },
                        ].map((tag) => (
                          <span key={tag.name} className={`text-[8px] font-black px-2 py-1 rounded-lg border-2 border-slate-900 shadow-[2px_2px_0px_#000] text-white ${tag.color}`}>
                            {tag.name}
                          </span>
                        ))}
                      </div>
                    </div>
                    {selectedMethod === "asiapay" && (
                      <motion.div layoutId="activeMethod" className="absolute top-4 right-6 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-900 animate-pulse" />
                    )}
                  </button>
                  <p className="text-center text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                    {isZh ? "您的交易數據將由 AsiaPay Limited (香港) 安全處理" : "Processed by AsiaPay Limited (HK)"}
                  </p>
                </div>

                {isSubmitting && (
                  <div className="mt-6 flex items-center justify-center gap-2">
                    <Loader2 className="animate-spin text-indigo-600" size={20} />
                    <span className="font-black uppercase text-[10px] tracking-widest text-slate-400">
                      {isZh ? "正在處理安全支付..." : "Processing Secure Payment..."}
                    </span>
                  </div>
                )}
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
