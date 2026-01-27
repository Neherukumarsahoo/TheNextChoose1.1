import { Navbar } from "./Navbar"
import { HeroSection } from "./HeroSection"
import { ServicesGrid } from "./ServicesGrid"
import { StatsSection } from "./StatsSection"
import { Footer } from "./Footer"
import { TestimonialsSection } from "./TestimonialsSection"
import { FAQSection } from "./FAQSection"

export function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ServicesGrid />
      <StatsSection />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
    </div>
  )
}
