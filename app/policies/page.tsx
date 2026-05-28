"use client";

import React from "react";
import { ShieldCheck, RefreshCcw, FileText, AlertTriangle, Scale, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";

export default function PolicyPage() {
  const locale = useLocale();
  const isZh = locale === "zh";
  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      {/* Header Area */}
      <section className="bg-slate-900 text-white py-20 px-6 border-b-8 border-indigo-600">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-5xl md:text-7xl font-[1000] uppercase tracking-tighter mb-4">
            {isZh ? "法律" : "Legal"} <span className="text-indigo-400">&</span> {isZh ? "政策" : "Policies"}
          </h1>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs md:text-sm">
            {isZh ? "EC 卓思棋院香港 • 2024年3月生效" : "EC Chess Academy Hong Kong • Effective from March 2024"}
          </p>
        </div>
      </section>

      <div className="container mx-auto max-w-5xl px-6 -mt-10">
        <div className="grid grid-cols-1 gap-12">
          
          {/* 1. REFUND & CANCELLATION POLICY */}
          <PolicySection 
            icon={<RefreshCcw className="text-orange-500" />}
            title={isZh ? "退款及取消政策" : "Refund & Cancellation Policy"}
            subtitle={isZh ? "报名与退款条款" : "退款及取消政策"}
          >
            <div className="space-y-4 text-slate-700">
              <p className="font-bold text-slate-900 underline">{isZh ? "比赛项目（如 Joyous Cup）：" : "Tournaments (e.g., Joyous Cup):"}</p>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>{isZh ? "报名费支付后，若学员退出或缺席，恕不退款。" : "Once the registration fee is paid, no refunds will be issued for student withdrawals or \"no-shows\" under any circumstances."}</li>
                <li>{isZh ? "仅当 EC 卓思棋院取消赛事或政府宣布极端情况时，才可改期或退款。" : "Refunds or rescheduling will only occur if the tournament is cancelled by EC Chess Academy or due to Government \"Extreme Conditions.\""} </li>
                <li>{isZh ? "天气安排：若开赛前2小时悬挂八号或以上台风信号，或黑色暴雨警告生效，赛事将延期；费用不退但可用于改期场次。" : "Weather Policy: If Typhoon Signal No. 8 or above, or a Black Rainstorm Warning is in effect 2 hours before the start, the event will be postponed. Fees are non-refundable but valid for the rescheduled date."}</li>
                <li>{isZh ? "如悬挂三号风球或红/黄暴雨，比赛照常进行。" : "If Typhoon Signal No. 3 or Red/Yellow Rainstorm is in effect, competitions proceed as scheduled."}</li>
              </ul>
              
              <p className="font-bold text-slate-900 underline mt-6">{isZh ? "常规课程：" : "Regular Courses:"}</p>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>{isZh ? "学费须于首课前全额支付。" : "Tuition fees must be paid in full before the first lesson."}</li>
                <li>{isZh ? "病假须提交医生证明方可安排补课，缺课不提供现金退款。" : "Requests for sick leave must be accompanied by a medical certificate to qualify for a make-up class. No cash refunds are provided for missed classes."}</li>
              </ul>
            </div>
          </PolicySection>

          {/* 2. PRIVACY POLICY */}
          <PolicySection 
            icon={<ShieldCheck className="text-emerald-500" />}
            title={isZh ? "私隐政策" : "Privacy Policy"}
            subtitle={isZh ? "个人资料收集声明" : "個人資料收集聲明"}
          >
            <p className="text-sm text-slate-600 mb-4 italic">
              {isZh ? "依据《香港个人资料（私隐）条例》（第486章）执行。" : "In accordance with the Personal Data (Privacy) Ordinance (Chapter 486) of Hong Kong."}
            </p>
            <div className="space-y-4 text-slate-700 text-sm">
              <p><strong>{isZh ? "资料收集：" : "Data Collection:"}</strong> {isZh ? "我们收集学员姓名、出生日期、学校资料及家长联络方式（电话/电邮），仅用于报名、评级证书申请及沟通联络。" : "We collect student names, dates of birth, school info, and parent contact details (phone/email) solely for enrollment, grading certificates (China Chess Association), and communication."}</p>
              <p><strong>{isZh ? "WhatsApp 群组：" : "WhatsApp Groups:"}</strong> {isZh ? "报名即表示同意将电话号码加入赛事群组，以便实时公布配对及通知。" : "By registering, you agree to your phone number being added to competition-specific WhatsApp groups for real-time pairings and announcements."}</p>
              <p><strong>{isZh ? "摄影与媒体：" : "Photography/Media:"}</strong> {isZh ? "本院可于课程及赛事期间拍摄照片/影片用于官网及社交媒体宣传；如需退出请书面通知。" : "EC Chess Academy reserves the right to take photographs or videos during classes and tournaments for promotional purposes on our website and social media. If you wish to opt-out, please notify us in writing."}</p>
              <p><strong>{isZh ? "资料查阅：" : "Data Access:"}</strong> {isZh ? "你有权查阅及更正个人资料，请联络资料保护主任（2838-6698）。" : "You have the right to request access to and correction of your personal data by contacting our Data Protection Officer at 2838-6698."}</p>
            </div>
          </PolicySection>

          {/* 3. TERMS & CONDITIONS */}
          <PolicySection 
            icon={<Scale className="text-indigo-600" />}
            title={isZh ? "服务条款" : "Terms & Conditions"}
            subtitle={isZh ? "服务条款细则" : "服務條款"}
          >
            <div className="space-y-6 text-sm text-slate-700">
              <div>
                <h4 className="font-black text-slate-900 uppercase mb-1">{isZh ? "1. 级别诚信申报" : "1. Integrity of Skill Level"}</h4>
                <p>{isZh ? "参赛者须按真实年龄与棋力级别报名。若虚报实力参加较低组别，将立即取消资格且不退款。" : "Players must register for their correct age group and skill level (Dan/Grade). Misrepresentation of skill to compete in lower divisions (\"Sandbagging\") will result in immediate disqualification without refund."}</p>
              </div>
              <div>
                <h4 className="font-black text-slate-900 uppercase mb-1">{isZh ? "2. 行为与纪律" : "2. Conduct & Discipline"}</h4>
                <p>{isZh ? "对作弊、对局中使用电子设备、家长干预比赛等行为实行零容忍。裁判长决定为最终决定。" : "We maintain a zero-tolerance policy for cheating, use of electronic devices during games, or parental interference. The Chief Arbiter’s decision is final and binding."}</p>
              </div>
              <div>
                <h4 className="font-black text-slate-900 uppercase mb-1">{isZh ? "3. 责任声明" : "3. Liability"}</h4>
                <p>{isZh ? "本院及场地方对场地内发生的人身伤害或财物损失不承担责任。" : "EC Chess Academy and the venue providers (e.g., Pentecostal Holiness Church Wing Kwong Primary School) are not responsible for any personal injury or loss of property occurring on the premises."}</p>
              </div>
              <div>
                <h4 className="font-black text-slate-900 uppercase mb-1">{isZh ? "4. 证书申请" : "4. Certificate Application"}</h4>
                <p>{isZh ? "中国象棋协会证书申请属自愿项目，需另付费用；申请人须持有效香港身份证或护照。" : "Applications for China Chess Association (CUA) certificates are optional and require additional fees. Applicants must hold a valid HKID or Passport."}</p>
              </div>
            </div>
          </PolicySection>

        </div>

        {/* Contact Footer */}
        <div className="mt-16 p-10 bg-white border-4 border-slate-900 rounded-[40px] shadow-[10px_10px_0px_#000] text-center">
            <h3 className="text-2xl font-black uppercase mb-4">{isZh ? "对政策有疑问？" : "Questions regarding our policies?"}</h3>
            <p className="text-slate-500 font-bold uppercase text-xs tracking-widest mb-6">{isZh ? "欢迎联络香港办公室" : "Contact our Hong Kong Office"}</p>
            <div className="flex flex-col md:flex-row justify-center gap-8">
                <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase">{isZh ? "电话 / WhatsApp" : "Phone / WhatsApp"}</p>
                    <p className="font-black text-indigo-600">2838-6698 / 6850-5091</p>
                </div>
                <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase">{isZh ? "地址" : "Address"}</p>
                    <p className="font-black">薈學坊 3 樓 B 室, Prince Edward Road West</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

function PolicySection({ icon, title, subtitle, children }: { icon: any, title: string, subtitle: string, children: any }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white border-4 border-slate-900 rounded-[40px] p-8 md:p-12 shadow-[12px_12px_0px_#cbd5e1]"
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center border-2 border-slate-200">
          {React.cloneElement(icon, { size: 28 })}
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-[1000] uppercase tracking-tighter leading-none">{title}</h2>
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-1">{subtitle}</p>
        </div>
      </div>
      <div className="border-t-2 border-slate-100 pt-8">
        {children}
      </div>
    </motion.div>
  );
}