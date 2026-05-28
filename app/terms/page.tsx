"use client"

import { motion } from "framer-motion"
import { FileText, Shield, Users, CreditCard, AlertTriangle, CheckCircle, BookOpen, Scale, Lock, Eye, Camera, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLocale } from "next-intl"
 
  // {
  //   id: "conduct",
  //   title: "Code of Conduct",
  //   icon: Users,
  //   color: "from-amber-500 to-orange-500",
  //   bgColor: "bg-gradient-to-br from-amber-50 to-orange-50",
  //   content: [
  //     "Students must maintain respectful behavior towards coaches and peers.",
  //     "Any form of cheating during tournaments will result in immediate disqualification.",
  //     "Regular practice and homework completion are mandatory for optimal progress.",
  //     "Damaging academy property will result in liability for replacement costs.",
  //   ],
  // },
  // {
  //   id: "attendance",
  //   title: "Attendance & Scheduling",
  //   icon: Calendar,
  //   color: "from-red-500 to-rose-500",
  //   bgColor: "bg-gradient-to-br from-red-50 to-rose-50",
  //   content: [
  //     "Regular attendance is crucial for consistent learning progress.",
  //     "Make-up classes may be provided with prior notice of absence.",
  //     "Schedule changes require 24 hours advance notice for consideration.",
  //     "Long breaks in training may require assessment before rejoining classes.",
  //   ],
  // },
  // {
  //   id: "media",
  //   title: "Media & Promotional Policy",
  //   icon: Camera,
  //   color: "from-indigo-500 to-purple-500",
  //   bgColor: "bg-gradient-to-br from-indigo-50 to-purple-50",
  //   content: [
  //     "By default, we may use student photos/videos for promotional materials.",
  //     "Parents can opt-out of media usage by submitting a written request.",
  //     "Media content may be used across website, social media, and brochures.",
  //     "Student achievements may be featured with name and photo unless opted out.",
  //   ],
  // }
]

export default function TermsPage() {
  const locale = useLocale();
  const isZh = locale === "zh";
  const termsSection = [
    {
      id: "general",
      title: isZh ? "一般条款与条件" : "General Terms & Conditions",
      icon: Scale,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
      content: isZh
        ? [
            "本院保留调整、拒绝或改期线上/线下课程的权利。",
            "本协议受香港特别行政区法律管辖并据其解释。",
            "在服务协议结束后，课程可经双方同意终止。",
            "本院重视并保护教练及员工的知识产权权益。"
          ]
        : [
            "Bharat chess academy reserves all right to change, deny or reschedule any class, both online and offline.",
            "Governing law (jurisdiction): This Agreement shall be governed by and construed in accordance with the laws and the company is based in Telangana (Hyderabad).",
            "Termination: Classes may be terminated mutually once service agreement has ended.",
            "Intellectual Property: Bharat chess academy defends its coaches and employees from intellectual property infringement liabilities."
          ],
    },
    {
      id: "refunds",
      title: isZh ? "退款与取消政策" : "Refunds & Cancellation Policy",
      icon: CreditCard,
      color: "from-emerald-500 to-green-500",
      bgColor: "bg-gradient-to-br from-emerald-50 to-green-50",
      content: isZh
        ? [
            "费用支付并完成课程/赛事预约后，不设退款或取消。",
            "已预约课程须按时出席。"
          ]
        : [
            "No refunds or cancellations once fees are paid and classes/tournaments booked.",
            "Attendance is mandatory for booked sessions."
          ],
    },
    {
      id: "privacy",
      title: isZh ? "私隐政策" : "Privacy Policy",
      icon: Shield,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
      content: isZh
        ? [
            "我们将根据适用法律及私隐政策收集并使用个人资料。",
            "资料仅用于提供及优化服务与沟通。",
            "学员资料将被保密，用户可申请查阅或更正。",
            "除非明确拒绝，本院可将照片/影片用于宣传。",
            "我们采取安全措施保护资料，但无法保证绝对安全。"
          ]
        : [
            "We collect and use personal data per applicable laws and our Privacy Policy.",
            "Data is used to provide/improve service and communications.",
            "Student data is confidential and can be accessed or modified by users.",
            "We may use photos/videos for promotional purposes unless opted out.",
            "We ensure data security but cannot guarantee absolute security."
          ],
    }
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Badge className="mb-6 bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 px-6 py-2 text-lg shadow-lg">
            <BookOpen className="w-4 h-4 mr-2" />
            {isZh ? "法律政策" : "Legal Policies"}
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
            {isZh ? "条款与政策" : "Terms & Policies"}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {isZh ? "了解相关政策有助于为每位学员提供更优质、透明的学习体验。" : "Understanding our policies ensures the best learning experience for everyone at Bharat Chess Academy"}
          </p>
        </div>
      </section>


      {/* Terms Sections */}
      <section className="relative py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {termsSection.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="h-full"
              >
                <Card className={`${section.bgColor} border-2 border-gray-200/50 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 h-full`}>
                  {/* Gradient Header */}
                  <div className={`h-2 bg-gradient-to-r ${section.color}`}></div>
                  
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-4 text-gray-800">
                      <div className={`w-14 h-14 bg-gradient-to-r ${section.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                        <section.icon className="text-white w-7 h-7" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">{section.title}</h2>
                        <div className="w-12 h-1 bg-gradient-to-r from-gray-400 to-gray-300 rounded-full mt-2"></div>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="space-y-4">
                      {section.content.map((point, pointIndex) => (
                        <motion.li
                          key={pointIndex}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 + pointIndex * 0.1 }}
                          className="flex items-start gap-3 p-3 bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 hover:bg-white/70 transition-colors duration-300"
                        >
                          <CheckCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 text-transparent bg-gradient-to-r ${section.color} bg-clip-text`} />
                          <span className="text-gray-700 leading-relaxed text-sm md:text-base">{point}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Acceptance Section */}
      {/* <section className="relative py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
          >
            <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-0 rounded-3xl shadow-2xl overflow-hidden">
              <CardContent className="p-12 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  Policy Acceptance
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-6 max-w-2xl mx-auto">
                  By enrolling in our programs or using our services, you acknowledge that you have read, 
                  understood, and agree to be bound by all the terms and policies outlined above.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Badge className="bg-green-500/20 text-green-300 border border-green-500/30 px-4 py-2 text-sm">
                    Last Updated: January 2024
                  </Badge>
                  <Badge className="bg-blue-500/20 text-blue-300 border border-blue-500/30 px-4 py-2 text-sm">
                    Version 2.1
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section> */}

      {/* Contact Support */}
      <section className="relative py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border-2 border-gray-200/50 shadow-lg">
              <Lock className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {isZh ? "对我们的政策有疑问？" : "Questions About Our Policies?"}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {isZh ? "我们的支持团队可协助解释任何条款与政策细节，我们坚持透明沟通。" : "Our support team is here to help clarify any aspect of our terms and policies. We believe in transparent communication."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Badge className="bg-blue-500/10 text-blue-700 border border-blue-500/20 px-4 py-2">
                  Email: checkmatesensei@gmail.com
                </Badge>
                <Badge className="bg-green-500/10 text-green-700 border border-green-500/20 px-4 py-2">
                  Phone: +91 8130627389
                </Badge>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}