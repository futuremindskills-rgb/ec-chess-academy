"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { 
  Trophy, Calendar, Clock, MapPin, ChevronRight, Zap, Target, 
  ShieldCheck, Star, Users, Loader2, DollarSign, X, User, 
  Mail, Phone, Baby, Cake, BarChart, Hash, Globe, FileText,
  Sword, Filter, LayoutGrid, Medal, CreditCard, Ticket
} from "lucide-react";
import TournamentBanner from "@/components/ui/tournamentBanner";
import { getTournaments, validateCouponAction } from "@/app/actions/adminActions";
import { registerForTournament } from "@/app/actions/tournamentActions";
import { useLocale } from "next-intl";

type GameType = "Weiqi" | "Xiangqi" | "International Chess";

const formatDateTime = (date: any) => {
  if (!date) return "日期無效";
  try {
    const iso = typeof date === "string" ? date : date.toISOString();
    const [d, t] = iso.split("T");
    const [year, month, day] = d.split("-");
    let [hour, minute] = t.split(":");
    let h = parseInt(hour);
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;

    const monthNames = ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"];
    return `${year}年${monthNames[parseInt(month) - 1]}${day}日, ${h}:${minute} ${ampm}`;
  } catch (e) {
    return "日期無效";
  }
};

export default function TournamentsPage() {
  const locale = useLocale();
  const isZh = locale === "zh";
  const [tournaments, setTournaments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedGame, setSelectedGame] = useState<GameType | null>(null);

  // Modal States
  const [selectedTournament, setSelectedTournament] = useState<any>(null);
  const [viewingRegs, setViewingRegs] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<"stripe" | "asiapay" | null>(null);

  // Coupon States
  const [couponInput, setCouponInput] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<{type: string, value: number} | null>(null);
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponMsg, setCouponMsg] = useState({ text: "", isError: false });

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getTournaments();
        setTournaments(data);
      } catch (error) {
        console.error("Failed to fetch tournaments:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

 const filteredTournaments = tournaments.filter(t => {
  // Hide deactivated tournaments
  if (!t.isActive) return false;

  // Hide cancelled tournaments
  if (t.status === "CANCELLED") return false;

  if (!selectedGame) return false;

  try {
    const cats = t.categories ? JSON.parse(t.categories) : [];
    return cats.includes(selectedGame);
  } catch {
    return false;
  }
});

  const handleApplyCoupon = async () => {
    if (!couponInput || !selectedTournament) return;
    setCouponLoading(true);
    setCouponMsg({ text: "", isError: false });

    try {
      const res = await validateCouponAction(couponInput, selectedTournament.id);
      if (res.valid) {
        setAppliedDiscount({ type: res.discountType!, value: res.discountValue! });
        setCouponMsg({ text: isZh ? "優惠碼已成功使用！" : "Coupon applied successfully!", isError: false });
      } else {
        setAppliedDiscount(null);
        setCouponMsg({ text: res.message || (isZh ? "優惠碼無效" : "Invalid coupon"), isError: true });
      }
    } catch (error) {
      setCouponMsg({ text: isZh ? "優惠碼驗證失敗" : "Error validating coupon", isError: true });
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
    } catch (error) {
        alert(isZh ? "發生錯誤，請重試。" : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const originalPrice = selectedTournament ? selectedTournament.entryFee / 100 : 0;
  let finalPrice = originalPrice;
  if (appliedDiscount) {
    if (appliedDiscount.type === "PERCENT") {
      finalPrice = originalPrice * (1 - appliedDiscount.value / 100);
    } else {
      finalPrice = Math.max(0, originalPrice - appliedDiscount.value);
    }
  }

  return (
    <div className="bg-white font-sans overflow-x-hidden text-slate-900 pb-20">
      <TournamentBanner />

      {/* ==================== GAME SELECTION STEP ==================== */}
      {!selectedGame && (
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-[1000] uppercase tracking-tighter mb-6">
              {isZh ? "選擇比賽項目" : "Choose Your Game"}
            </h1>
            <p className="text-slate-500 font-bold text-lg mb-12">
              {isZh ? "請選擇您要參加的項目" : "Select the discipline you want to compete in"}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: "Weiqi", zhName: "圍棋", icon: "⚫", color: "from-black to-slate-800" },
                { name: "Xiangqi", zhName: "中國象棋", icon: "♞", color: "from-red-600 to-orange-600" },
                { name: "International Chess", zhName: "國際象棋", icon: "♟️", color: "from-amber-600 to-yellow-600" },
              ].map((game) => (
                <motion.button
                  key={game.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedGame(game.name as GameType)}
                  className={`group h-80 rounded-[32px] border-4 border-slate-900 overflow-hidden relative flex flex-col items-center justify-center shadow-[8px_8px_0px_#000] hover:shadow-[12px_12px_0px_#000] transition-all bg-gradient-to-br ${game.color}`}
                >
                  <div className="text-8xl mb-6 transition-transform group-hover:scale-110">{game.icon}</div>
                  <h3 className="text-white text-3xl font-black uppercase tracking-tighter">
                    {isZh ? game.zhName : game.name}
                  </h3>
                  <div className="absolute bottom-6 text-white/70 text-sm font-bold tracking-widest uppercase">{isZh ? "點擊查看賽事" : "Click to explore tournaments"}</div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ==================== TOURNAMENT LIST ==================== */}
      {selectedGame && (
        <>
          <div className="container mx-auto px-4 mt-12">
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
              <div>
                <h2 className="text-4xl font-[1000] uppercase tracking-tighter">
                  {isZh ? (selectedGame === "Weiqi" ? "圍棋" : selectedGame === "Xiangqi" ? "中國象棋" : "國際象棋") : selectedGame} {isZh ? "賽事" : "Tournaments"}
                </h2>
                <p className="text-slate-500 font-bold">{isZh ? "選擇賽事並在線報名" : "Select a tournament to register"}</p>
              </div>
              <button 
                onClick={() => setSelectedGame(null)}
                className="px-6 py-3 border-4 border-slate-900 rounded-2xl font-black text-sm hover:bg-slate-100 transition-all"
              >
                {isZh ? "← 返回更換項目" : "← Change Game"}
              </button>
            </div>
          </div>

          <section className="py-12 container mx-auto px-4 md:px-6">
            {loading ? (
              <div className="flex flex-col justify-center items-center py-20 gap-4">
                <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
                <p className="font-bold text-slate-400 uppercase tracking-widest text-xs">{isZh ? "正在載入賽事..." : "Loading Tournaments..."}</p>
              </div>
            ) : filteredTournaments.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-2xl font-black">{isZh ? `現時暫無相關賽事` : `No tournaments available for ${selectedGame}`}</p>
                <p className="text-slate-500 mt-2">{isZh ? "請稍後再試或選擇其他項目。" : "Please check back later or choose another game."}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-12">
                {filteredTournaments.map((t) => (
                  <motion.div key={t.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} whileHover={{ y: -10 }} className="relative group h-full">
                    <div className="absolute inset-0 bg-slate-900 rounded-[32px] md:rounded-[40px] translate-x-2 translate-y-2 md:translate-x-3 md:translate-y-3" />
                    <div className="relative bg-white border-4 border-slate-900 rounded-[32px] md:rounded-[40px] flex flex-col h-full overflow-hidden">
                      <div className="relative w-full aspect-[16/9] bg-slate-200 overflow-hidden border-b-4 border-slate-900">
                        {t.bannerImage && (
                          <Image src={t.bannerImage} alt={t.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                        )}
                        <div className="absolute top-4 right-4">
                          <span className="px-4 py-1.5 text-[10px] font-black uppercase bg-emerald-400 border-2 border-slate-900 shadow-[3px_3px_0px_#000]">
                            {t.status === "OPEN" ? (isZh ? "接受報名" : "OPEN") : (isZh ? "名額已滿" : t.status)}
                          </span>
                        </div>
                      </div>
                      <div className="p-6 md:p-8 pt-6 flex flex-col flex-1">
                        <h3 className="text-xl md:text-2xl font-[1000] uppercase tracking-tight mb-4 text-slate-900 leading-tight">{t.title}</h3>
                        <div className="space-y-3 mb-8 flex-1 text-slate-500 font-bold text-[11px] uppercase tracking-wide">
                          <div className="flex items-center gap-3">
                            <Calendar size={18} className="text-orange-500" />
                            <span>{formatDateTime(t.startDate)}</span>
                          </div>
                          <div className="flex items-center gap-3"><MapPin size={18} className="text-indigo-600" /> {t.location}</div>
                        </div>
                        <div className="flex flex-col gap-3">
                          <button onClick={() => setViewingRegs(t)} className="w-full py-3 border-4 border-slate-900 rounded-2xl font-black uppercase text-[10px] hover:bg-slate-50 transition-all flex items-center justify-center gap-2 text-slate-900">
                            <FileText size={16} /> {isZh ? "詳情及章程" : "Regulations"}
                          </button>
                          <button onClick={() => setSelectedTournament(t)} className="w-full py-4 bg-indigo-600 hover:bg-slate-900 text-white font-black uppercase rounded-2xl transition-all shadow-xl text-xs tracking-widest">
                            {isZh ? "立即報名" : "Register Now"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </section>
        </>
      )}

      {/* --- REGISTRATION MODAL --- */}
      <AnimatePresence>
        {selectedTournament && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md overflow-y-auto">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white border-4 border-slate-900 rounded-[40px] w-full max-w-2xl my-auto relative shadow-[20px_20px_0px_#000]"
            >
              <button onClick={() => { 
                setSelectedTournament(null); 
                setSelectedMethod(null); 
                setAppliedDiscount(null);
                setCouponInput("");
                setCouponMsg({ text: "", isError: false });
              }} className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full z-10 text-slate-900"><X size={24} /></button>

              <form onSubmit={handleFormSubmit} className="p-6 md:p-10 max-h-[85vh] overflow-y-auto no-scrollbar text-slate-900">
                <div className="mb-8">
                  <h3 className="text-3xl font-[1000] uppercase tracking-tighter">{isZh ? "賽事報名" : "Tournament Entry"}</h3>
                  <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mt-1">{isZh ? "賽事名稱：" : "Event:"} {selectedTournament.title}</p>
                </div>

                <input type="hidden" name="tournamentId" value={selectedTournament.id} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="relative md:col-span-2">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input required name="playerName" placeholder={isZh ? "學生姓名 (中文/英文)" : "Student Full Name"} className="w-full pl-12 pr-4 py-4 border-4 border-slate-900 rounded-2xl font-black uppercase text-xs outline-none focus:border-indigo-600 text-slate-900" />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input required name="email" type="email" placeholder={isZh ? "家長/監護人電郵" : "Guardian Email"} className="w-full pl-12 pr-4 py-4 border-4 border-slate-900 rounded-2xl font-black uppercase text-xs outline-none focus:border-indigo-600 text-slate-900" />
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
                      {selectedTournament.levels && JSON.parse(selectedTournament.levels).map((lvl: string) => (
                        <option key={lvl} value={lvl}>{lvl}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="relative md:col-span-2">
                    <BarChart className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input name="rating" placeholder={isZh ? "現時級位 / 等級分" : "Current Level / Rating"} className="w-full pl-12 pr-4 py-4 border-4 border-slate-900 rounded-2xl font-black uppercase text-xs outline-none focus:border-indigo-600 text-slate-900" />
                  </div>
                </div>

                {/* --- COUPON SECTION --- */}
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

                {/* --- PRICE DISPLAY --- */}
                <div className="mt-6 p-6 bg-indigo-50 border-4 border-indigo-100 rounded-[24px] flex justify-between items-center">
                   <div>
                      <p className="font-black text-indigo-900 uppercase text-[10px] tracking-widest">
                        {appliedDiscount ? (isZh ? "折後總額" : "Discounted Total") : (isZh ? "報名費總額" : "Entry Fee")}
                      </p>
                      <div className="flex items-baseline gap-3">
                        <p className="font-[1000] text-3xl text-indigo-600">
                          HK${finalPrice.toFixed(2)}
                        </p>
                        {appliedDiscount && (
                          <p className="text-sm text-slate-400 line-through font-bold">
                            HK${originalPrice.toFixed(2)}
                          </p>
                        )}
                      </div>
                   </div>
                   <DollarSign className="text-indigo-200" size={48} strokeWidth={3} />
                </div>

                {/* --- PAYMENT METHOD SELECTOR --- */}
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
                      <div className={`p-3 rounded-2xl mb-3 transition-colors ${selectedMethod === 'asiapay' ? 'bg-white/20' : 'bg-white border-2 border-slate-900'}`}>
                        <CreditCard size={28} className={selectedMethod === 'asiapay' ? 'text-white' : 'text-indigo-600'} />
                      </div>
                      
                      <span className="font-[1000] uppercase text-sm tracking-tighter mb-1">
                        {isZh ? "透過 AsiaPay (PayDollar) 支付" : "Pay via AsiaPay (PayDollar)"}
                      </span>
                      
                      <p className={`text-[9px] font-bold uppercase tracking-widest mb-4 ${selectedMethod === 'asiapay' ? 'text-indigo-100' : 'text-slate-500'}`}>
                        {isZh ? "香港官方支付網關 (支援 PayMe / 微信支付等)" : "Official HK Payment Gateway"}
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
                    {isZh ? "您的交易數據將由 AsiaPay Limited (香港) 安全處理" : "Your data is processed by AsiaPay Limited (HK)"}
                  </p>
                </div>

                {isSubmitting && (
                  <div className="mt-6 flex items-center justify-center gap-2">
                    <Loader2 className="animate-spin text-indigo-600" size={20} />
                    <span className="font-black uppercase text-[10px] tracking-widest text-slate-400">{isZh ? "正在處理安全支付..." : "Processing Secure Payment..."}</span>
                  </div>
                )}
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- REGULATIONS MODAL --- */}
      <AnimatePresence>
        {viewingRegs && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-md">
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}
              className="bg-white border-4 border-slate-900 rounded-[32px] w-full max-w-3xl max-h-[85vh] overflow-hidden flex flex-col shadow-[20px_20px_0px_#4f46e5]"
            >
              <div className="p-6 border-b-4 border-slate-900 bg-slate-50 flex justify-between items-center">
                <h3 className="font-[1000] uppercase text-xl tracking-tighter">{isZh ? "賽事詳情及章程" : "Regulations"}</h3>
                <button onClick={() => setViewingRegs(null)} className="p-2 border-2 border-slate-900 rounded-xl hover:bg-red-500 hover:text-white transition-all"><X size={20}/></button>
              </div>
              <div className="p-8 overflow-y-auto bg-white whitespace-pre-wrap font-medium text-slate-700 leading-relaxed text-sm">
                {viewingRegs.regulations || (isZh ? "該賽事章程暫未上傳，請稍後再試。" : "Detailed regulations for this event are not yet uploaded.")}
              </div>
              <div className="p-6 bg-slate-50 border-t-4 border-slate-900 text-center">
                 <button onClick={() => { setSelectedTournament(viewingRegs); setViewingRegs(null); }} className="px-12 py-4 bg-indigo-600 text-white font-black uppercase rounded-2xl text-xs hover:bg-slate-900 transition-colors shadow-lg">{isZh ? "立即前往報名" : "Start Registration"}</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- CONTENT SECTIONS --- */}
      <section className="py-16 md:py-24 bg-slate-900 relative overflow-hidden">
         <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0h30v30H30V0zM0 30h30v30H0V30z' fill='%23ffffff' /%3E%3C/svg%3E")` }} />
         <div className="container mx-auto px-6 relative z-10 text-center mb-12 text-white">
            <h2 className="text-3xl md:text-6xl font-[1000] uppercase tracking-tighter mb-4 leading-none">{isZh ? "賽事" : "Competition"} <span className="text-orange-400 italic">{isZh ? "制式" : "Formats"}</span></h2>
         </div>
         <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Bullet", time: "1 分鐘", icon: <Zap /> },
              { title: "Blitz", time: "3 - 5 分鐘", icon: <Target /> },
              { title: "Rapid", time: "10 - 25 分鐘", icon: <Clock /> },
              { title: "Classical", time: "60+ 分鐘", icon: <Trophy /> },
            ].map((f, i) => (
              <div key={i} className="p-8 bg-white/5 border border-white/10 rounded-[32px] group hover:bg-white transition-all">
                 <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mb-6 group-hover:bg-orange-500">{f.icon}</div>
                 <h4 className="text-xl font-black text-white group-hover:text-slate-900 uppercase tracking-tighter">{f.title}</h4>
                 <p className="text-orange-400 font-black text-[10px] uppercase tracking-widest mb-3">{f.time}</p>
              </div>
            ))}
         </div>
      </section>
    </div>
  );
}