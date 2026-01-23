import { Navbar } from "./Navbar"
import { HeroSection } from "./HeroSection"
import { ServicesGrid } from "./ServicesGrid"
import { TestimonialsCarousel } from "./TestimonialsCarousel"
import { SocialProofWidget } from "./SocialProofWidget"
import { StatsSection } from "./StatsSection"
import { Footer } from "./Footer"

export function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ServicesGrid />
      <TestimonialsCarousel />
      <SocialProofWidget />
      <StatsSection />
      <Footer />
    </div>
  )
}
