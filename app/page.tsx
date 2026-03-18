import { PrismaClient } from '@prisma/client'
const globalForPrisma = global as unknown as { prisma: PrismaClient }
const prisma = globalForPrisma.prisma || new PrismaClient()
import { HeroSection } from "@/components/hero-section";
import DemoBookingCTA from "@/components/demo-booking-cta";
import TestimonialsSection from "@/components/testimonials-section";
import FaqSection from "@/components/stats-section";
import AchievementsSection from "@/components/ui/AchievementsSection";
import WhyChooseUsSection from "@/components/why-choose";
import LearningEnvironment from "@/components/ui/learning";
import LeadInstructorSection from "@/components/lead";
import GallerySection from "@/components/gallery";
import ProgramsSection from "@/components/programs";
import AboutSection from "@/components/about-section";
import CurriculumSection from "@/components/courses-section";
import SuccessStoriesSlider from "@/components/ui/stories";

export default async function HomePage() {
  // Fetch the banner data from the database
  // We use findUnique with ID 1 based on the singleton pattern in the schema
  const banner = await prisma.siteBanner.findUnique({
    where: { id: 1 },
  });

  return (
    <div className="min-h-screen">
      <main>
        {/* Pass the fetched banner data to the HeroSection */}
        <HeroSection bannerData={banner || undefined} />
        
        <ProgramsSection />
        <WhyChooseUsSection />
        <AboutSection />
        <CurriculumSection />
        <SuccessStoriesSlider />
        <TestimonialsSection />
        <FaqSection />
        <DemoBookingCTA />
      </main>
    </div>
  );
}