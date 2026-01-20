"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Search, 
  ArrowRight, 
  BookOpen,
  Atom,
  Crown,
  Briefcase,
  CheckCircle2,
  GraduationCap,
  Clock,
  Users,
  Loader2
} from "lucide-react";
import CurriculumBanner from "@/components/ui/curriculamBanner";
import CurriculumSection from "@/components/courses-section";
import ECTeachingProcess from "@/components/ui/methodology";
import ECAdvantage from "@/components/ui/features";


export default function CoursesPage() {
  

  return (
    <main className="bg-slate-50 min-h-screen font-sans">
      
      {/* --- Page Banner --- */}
      <CurriculumBanner/>
      <CurriculumSection/>
      <ECTeachingProcess/>
      <ECAdvantage/>

      
    </main>
  );
}