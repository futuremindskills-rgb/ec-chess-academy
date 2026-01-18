import  {HeroSection}  from "@/components/hero-section"
import  DemoBookingCTA  from "@/components/demo-booking-cta"
import  TestimonialsSection  from "@/components/testimonials-section"
import  FaqSection  from "@/components/stats-section"
import AchievementsSection from "@/components/ui/AchievementsSection"
import WhyChooseUsSection from "@/components/why-choose"
import LearningEnvironment from "@/components/ui/learning"
import LeadInstructorSection from "@/components/lead"
import GallerySection from "@/components/gallery"
import ProgramsSection from "@/components/programs"
import AboutSection from "@/components/about-section"
import CurriculumSection from "@/components/courses-section"
import SuccessStoriesSlider from "@/components/ui/stories"


export default function HomePage() {
  return (
    <div className="min-h-screen">
      <main>
        <HeroSection />
        <ProgramsSection/>
        <WhyChooseUsSection/>
        <AboutSection/>
        <CurriculumSection/>
        <SuccessStoriesSlider/>
        <TestimonialsSection />
        <FaqSection />
        <DemoBookingCTA />
      </main>
    </div>
  )
}
