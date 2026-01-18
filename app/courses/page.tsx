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
import CoursesBanner from "@/components/ui/chessBanner"; // Ensure this path is correct
import { getCourses } from "@/app/actions/adminActions";
import CurriculumBanner from "@/components/ui/curriculamBanner";
import CurriculumSection from "@/components/courses-section";
import ECTeachingProcess from "@/components/ui/methodology";
import ECAdvantage from "@/components/ui/features";

const categories = ["All", "Physics", "Chess", "Skills"];

export default function CoursesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // --- Fetch Data on Mount ---
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // --- Filter Logic ---
  const filteredCourses = courses.filter(course => {
    const matchesCategory = activeCategory === "All" || course.category === activeCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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