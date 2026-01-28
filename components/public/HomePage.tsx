import { Navbar } from "./Navbar"
import { HeroSection } from "./HeroSection"
import { MobileHeroSection } from "./MobileHeroSection"
import { ServicesGrid } from "./ServicesGrid"
import { Interactive3DSection } from "./Interactive3DSection"
import { StatsSection } from "./StatsSection"
import { Footer } from "./Footer"
import { TestimonialsSection } from "./TestimonialsSection"
import { FAQSection } from "./FAQSection"

export function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <MobileHeroSection />
      <HeroSection />
      <Interactive3DSection />
      <ServicesGrid />
      <StatsSection />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
    </div>
  )
}
